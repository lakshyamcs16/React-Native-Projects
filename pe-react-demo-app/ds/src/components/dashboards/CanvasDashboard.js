import React, { Component } from 'react';
import {
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Platform,
    Alert
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchAppConfig } from '../../redux/actions/dashboard/navigation.actions'
import { fetchWidgetConfig, widgetRequest } from '../../redux/actions/dashboard/main.actions'
import InnerNavBar from '../assets/InnerNavBar';
import { GetWidgets } from './GetWidgets';
import { GENERIC_APP_CONFIG_ERROR, DASHBOARD_CONFIG_URL } from '../../utilities/Constants';
import { getFilledObject } from '../../utilities/Utilities';
import { BASE_URL } from 'react-native-dotenv'

let uri = '';

class CanvasDashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            config: {},
        }
    }

    async componentDidMount() {        
        var params = {
            url: `${BASE_URL}/${DASHBOARD_CONFIG_URL}/${this.props.dashboardId}?access_token=${this.props.token}`,
            method: 'GET'
        };

        const response = await this.props.fetchWidgetConfig(params);
        
        try {
            if (!response.success) {
                throw response;
            } else {
                this.setState({
                    config: response.body
                });
                
            }
        } catch (error) {
            Alert.alert(
                'Config Error',
                GENERIC_APP_CONFIG_ERROR,
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
            <>
                <ThemeProvider theme={this.props.theme}>
                    <InnerNavBar theme={this.props.theme} title={"Pipeline"} subtitle={"Private Equity"} />
                    <View style={{ flex: 1,  backgroundColor: this.props.theme.theme.ROOT_BACKGROUND_COLOR }} >
                        {
                            Object.keys(this.state.config).length > 0 ?
                                this.state.config.widgets.map(config => {
                                    return <GetWidgets key={config.id} wConfig={config} theme={this.props.theme} id={this.props.id} data={this.props.data}/>
                                })
                                :
                                <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>

                                </ActivityIndicator>
                        }
                    </View>
                </ThemeProvider>
            </>
        );
    }
};

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
        fontWeight: 'bold',
        color: '#009e5a'
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
    chartConfig: {
        marginLeft: -4
    }

});

const mapStateToProps = (state) => {
    return {
        theme: state.themeDetails
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        fetchAppConfig: () => dispatch(fetchAppConfig()),
        fetchWidgetConfig: (params) => dispatch(fetchWidgetConfig(params)),
        widgetRequest: () => dispatch(widgetRequest())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(CanvasDashboard);