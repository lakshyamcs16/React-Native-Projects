import React, { Component } from 'react';
import {
    Alert,
    StyleSheet
} from 'react-native';
import { Card } from 'react-native-paper';
import { getFilledObject, buildDataRequest, filterDataOnId, createCard } from '../../utilities/Utilities';
import { connect } from 'react-redux';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import {
    Placeholder,
    PlaceholderLine,
    Fade
} from "rn-placeholder";

class NumberStampWidget extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isDataFetched: false
        }
    }

    async componentDidMount() {
        const dataConfig = this.props.wConfig.dataConfig;
        dataConfig.params.body = getFilledObject(this.props.id, this.props.prevData, dataConfig.params.body);
        var params = buildDataRequest(dataConfig);
        const response = await this.props.fetchWidgetData(params);

        try {
            if (!response.success) {
                throw response;
            } else {
                this.setState({
                    data: response.body,
                    isDataFetched: true
                });
            }
        } catch (error) {
            Alert.alert(
                'Data Error',
                GENERIC_DATA_ERROR,
                [
                    {
                        text: 'Okay',
                        onPress: () => console.log('Okay Pressed'),
                        style: 'cancel',
                    },
                ]
            );
        }
    }


    render() {
        return (
            (this.state.data.length > 0?
                <Card style={[styles.container]} elevation={10}>
                    {createCard(this.props.wConfig.config, filterDataOnId(this.state.data, this.props.id), stampStyles, 0)}
                </Card>
            : !this.state.isDataFetched ?
                    // <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>

                    // </ActivityIndicator> 
                    <Card style={[styles.container]} elevation={10}>
                        <Placeholder
                        Animation={Fade}
                        style={stampStyles.keyStats}>
                            <PlaceholderLine width={15} height={25} styles={stampStyles.keyHeading}/>
                            <PlaceholderLine width={40} style={stampStyles.keySubHeading}/>
                        </Placeholder>
                    </Card>
                    :  <>{Alert.alert(
                        'No Data',
                        'There is no data present',
                        [
                            {
                                text: 'Okay',
                                onPress: () => console.log('Okay Pressed'),
                                style: 'cancel',
                            },
                        ]
                    )}</>)
        );
    }
}
const stampStyles = StyleSheet.create({
    keyStats: {
        flex: 1,
        padding: 20,
        paddingBottom: 0,
        alignItems: 'flex-start'
      },
      keyHeading: {
        fontSize: 40,
        color: '#05ad6a',
        fontWeight: 'bold',
        paddingBottom: 10
      },
      keySubHeading: {
        fontSize: 15,
        color: '#999999',
        fontWeight: 'bold',
        marginTop: -6
      }
});

const styles = StyleSheet.create({
    container: {
      flex: 1,
      margin:10,
      paddingBottom: 20
    },
    statsContainer: {
      padding: 20,
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: -45,
      borderBottomColor: '#f2f2f2',
      borderBottomWidth: 5
    },
    statDetails: {
      flexDirection: 'column'
    },
    statHeading: {
      paddingTop: 20,
      color: '#999999',
      fontSize: 16,
      fontWeight: "bold",
      letterSpacing: -1
    },
    statSubHeading: {
      color: '#555555',
      fontSize: 20,
      fontWeight: "bold"
    },
    statHeadingLast: {
      paddingTop: 20,
      color: '#999999',
      fontSize: 16,
      fontWeight: "bold",
      textAlign: 'right',
      letterSpacing: -1
    },
    statSubHeadingLast: {
      color: '#555555',
      fontSize: 20,
      fontWeight: "bold",
      textAlign: 'right'
    },
    navBar: {
      flexDirection: 'row',
      height: 50,
      paddingTop: 10,
      justifyContent: 'space-around',
      borderTopColor: '#999999',
      borderTopWidth: 0.5
    },
    navBarItem: {
      fontSize: 15
    },
    chartConfig: {
      marginLeft: -4
    }
  
  });

const mapStateToProps = (state) => {
    return {
        data: state.dataDetails.data,
        token: state.authenticationDetails.user_details.token
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        fetchWidgetData: (params) => dispatch(fetchWidgetData(params)),
        dataRequest: () => dispatch(dataRequest())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(NumberStampWidget);