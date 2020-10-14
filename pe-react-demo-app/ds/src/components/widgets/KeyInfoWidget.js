import React, { Component } from 'react';
import {
    View,
    Alert,
    StyleSheet
} from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { getFilledObject, buildDataRequest, createCard, filterDataOnId, getTitle } from '../../utilities/Utilities';
import { getFontSize } from '../../components/assets/scrollview/ScrollViewAssets';
import {WIDGET_TYPE_KEY_INFO} from '../../utilities/Constants';
import { connect } from 'react-redux';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import {Placeholders} from '../../utilities/Placeholders';

let keyStyles;

class KeyInfoWidget extends Component<{}> {
    
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            isDataFetched: false
        }
        keyStyles = StyleSheet.create({
            keyStats: {
                flex: 1,
                padding: 15,
                alignItems: "flex-start"
              },
              keyHeading: {
                color: this.props.theme.theme.PRIMARY_TEXT_COLOR,
                fontWeight: 'bold',
                paddingVertical: 5
              },
              keySubHeading: {
                color: this.props.theme.theme.PRIMARY_TEXT_COLOR,
                fontWeight: 'bold',
                marginTop: -6
              }
        });
    }

    async componentDidMount() {
        const dataConfig = this.props.wConfig.dataConfig;
        dataConfig.params.body = getFilledObject(this.props.id, this.props.data, dataConfig.params.body);
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

    createKeyInfoCard = (config, data) => {
        let rows = config.rows;
        
        return (
            
                rows.map((row, key) => {
                    let columns = row.columns;
                    return (<View key={key} style={{flex: 3, flexDirection: 'row'}}>{
                                columns.map((column, key) => {
                                    keyStyles = this.createStyleSheet(column);
                                    return createCard(column, data, keyStyles, key)
                                })
                            }
                            </View>)
                })
            );        
    }

    createStyleSheet = (config) => {
        keyStyles = StyleSheet.create({
            keyStats: {
                flex: 1,
                padding: 5,
                alignItems: config.layout.label.position || "flex-start"
              },
              keyHeading: {
                fontSize: getFontSize(null, config.layout.key.size),
                color: config.layout.key.color || this.props.theme.theme.PRIMARY_TEXT_COLOR,
                fontWeight: config.layout.key.weight || '500',
                paddingVertical: 5
              },
              keySubHeading: {
                fontSize: getFontSize(null, config.layout.label.size),
                color: config.layout.label.color || this.props.theme.theme.PRIMARY_TEXT_COLOR,
                fontWeight: config.layout.label.weight || '400',
                marginTop: -6,
                textAlign: 'left'
              }
        });

        return keyStyles;
    }

    render() {
        return (
            (this.state.data.length > 0?
                    <Card
                        elevation={5}
                        style={[styles.container, {backgroundColor: this.props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT}]} 
                    >
                    {getTitle(this.props.wConfig, this.props.theme.theme)}
                        <Card.Content>
                            {this.createKeyInfoCard(this.props.wConfig.config, filterDataOnId(this.state.data, this.props.id))}
                        </Card.Content>
                    </Card>
            : !this.state.isDataFetched ?
                    // <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>

                    // </ActivityIndicator> 

                    <Card style={[styles.container, {backgroundColor: this.props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT}]}  elevation={10}>{Placeholders({type: WIDGET_TYPE_KEY_INFO, keyStyles})}</Card>

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



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginHorizontal: 10
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

export default connect(mapStateToProps, dispatchStateToProps)(KeyInfoWidget);