import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
  Platform,
  
} from 'react-native';
import {ActivityIndicator} from 'react-native-paper';
import HTML_FILE from '../../../resources/html/index.html';
import TableView from '../assets/TableView'
import WebView from 'react-native-webview'
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchAppConfig } from '../../redux/actions/dashboard/navigation.actions'
import { fetchWidgetConfig, widgetRequest } from '../../redux/actions/dashboard/main.actions'
import NavBar from '../assets/NavBar';
import { Actions } from 'react-native-router-flux';
import { GetWidgets } from './GetWidgets';

const leftDummyData = require('../../../data/leftTableDummyData.json')
const rightDummyData = require('../../../data/rightTableDummyData.json')
const isAndroid = Platform.OS === 'android';

let uri = '';

class RootDashboard extends Component {
  state = {
    data: {
      items: leftDummyData,
      rightItem: rightDummyData
    },
    appConfig: {},
    widgetConfig: {}
  }

  async componentDidMount() {
    const response = await this.props.fetchAppConfig()

    if(response.success) {
      this.setState({
        appConfig: response.body
      });

      this.props.widgetRequest();
      var params = {
        id: response.body.home.dashboardId,
        url: "https://private-5268ee-parsers.apiary-mock.com/rester/widgetconfig",
        method: "GET",
        body: null, 
        header: null,
        isBaseUrlAbsent: false
      };

      const widgetConfigResponse = await this.props.fetchWidgetConfig(params)

      if(widgetConfigResponse.success) {
        this.setState({
          widgetConfig: widgetConfigResponse.body
        })        
      }
    }
    
  }

  render() {
    if (isAndroid) {
      uri = 'file:///android_asset/html/index.html';
    }

    return (
      <>
        <ThemeProvider theme={this.props.theme}>
          <NavBar theme={this.props.theme} title={"Pipeline"} subtitle={"Private Equity"}/>
          <View style={{flex:1, backgroundColor: this.props.theme.theme.ROOT_BACKGROUND_COLOR}} >
            {
              Object.keys(this.state.widgetConfig).length > 0 ?
                this.state.widgetConfig.widgets.map( config => {
                    return <GetWidgets key={config.id} wConfig={config} theme={this.props.theme} />
                })
              :
                <ActivityIndicator style={{flex:1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center'}}>

                </ActivityIndicator>
            }
          </View>
          <NavigationBar config={this.state.appConfig.menubar} theme={this.props.theme} />
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

export default connect(mapStateToProps, dispatchStateToProps)(RootDashboard);