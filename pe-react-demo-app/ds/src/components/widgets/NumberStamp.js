import React, { Component } from 'react';
import {
    View,
    Text,
    Alert,
    StyleSheet
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { getFilledObject, buildDataRequest } from '../../utilities/Utilities';
import { connect } from 'react-redux';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import {
    getFormattedNumber
} from '../assets/scrollview/ScrollViewAssets';

class NumberStamp extends Component<{}> {
    
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

    createCard = (config, data) => {
        let key = config.keyField;
        let layout = config.layout;
        let label = '';

        if(layout.label.enabled) {
            label = config.labelField;
        }

        return (
            <View style={styles.keyStats}> 
                <Text style={styles.keyHeading}>{getFormattedNumber(data[0][key], layout.key.numberFormat, layout.key.decimalPrecision)}</Text>
                <Text style={styles.keySubHeading}>{data[0][label]}</Text>
            </View>
        );
        
       
    }

    render() {
        return (
            (this.state.data.length > 0?
                <View style={styles.container}>
                    {this.createCard(this.props.wConfig.config, this.state.data)}
                </View>
            : !this.state.isDataFetched ?
                    <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>

                    </ActivityIndicator> :  <>{Alert.alert(
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

const styles = StyleSheet.create({
    container: {
      flex: 1
    },
    keyStats: {
      padding: 20,
      alignItems: 'flex-start'
    },
    keyHeading: {
      fontSize: 52,
      color: '#05ad6a',
      fontWeight: 'bold'
    },
    keySubHeading: {
      fontSize: 15,
      color: '#999999',
      fontWeight: 'bold',
      marginTop: -6
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

export default connect(mapStateToProps, dispatchStateToProps)(NumberStamp);