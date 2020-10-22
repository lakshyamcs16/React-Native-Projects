import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Platform,
  Text
} from 'react-native';
import { ActivityIndicator, Button, Divider } from 'react-native-paper';
import NavigationBar from './NavigationBar';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { fetchAppConfig } from '../../redux/actions/dashboard/navigation.actions'
import { fetchWidgetConfig, widgetRequest } from '../../redux/actions/dashboard/main.actions'
import NavBar from '../assets/NavBar';
import { GetWidgets } from './GetWidgets';
import { BASE_URL, APP_CONFIG_ID } from 'react-native-dotenv'
import { APP_CONFIG_URL, DASHBOARD_CONFIG_URL } from '../../utilities/Constants';
import AddDeal from '../widgets/AddDeal';
import {ModalCtx} from '../../Contexts';
import {Modalize} from 'react-native-modalize';

const isAndroid = Platform.OS === 'android';

let uri = '';

class RootDashboard extends Component {
  state = {
    appConfig: {},
    widgetConfig: {},
    modalData: null
  }

  modal = React.createRef();

  async componentDidMount() {
    var params = {
      url: `${BASE_URL}/${APP_CONFIG_URL}/${APP_CONFIG_ID}`,
      method: 'GET'
    };

    const response = await this.props.fetchAppConfig(params);

    if (response.success) {
      this.setState({
        appConfig: response.body
      });
      this.props.widgetRequest();
      var params = {
        url: `${BASE_URL}/${DASHBOARD_CONFIG_URL}/${response.body.home.dashboardId}`,
        method: "GET"
      };

      const widgetConfigResponse = await this.props.fetchWidgetConfig(params)
      if (widgetConfigResponse.success) {
        this.setState({
          widgetConfig: widgetConfigResponse.body
        })
      }
    }

  }

  populate = (schemaData) => {
    this.setState({
      modalData: schemaData
    })
  }

  cancel = () => {
    this.modal.current?.close()
  }

  saveDeal = () => {
      this.modal.current?.close()
  }



  createButtons = () => (
    <>
        <Button
            compact={true}
            icon="cancel"
            style={styles.buttonStyles}
            onPress={this.cancel}>Cancel</Button>
        <Button
            compact={true}
            style={styles.buttonStyles}
            icon="content-save"
            onPress={this.saveDeal}>Save</Button>
    </>
)

  render() {
    if (isAndroid) {
      uri = 'file:///android_asset/html/index.html';
    }

    return (
      <>
        <ModalCtx.Provider value={{open: this.modal, populate: this.populate}}>
          <ThemeProvider theme={this.props.theme}>
            <NavBar theme={this.props.theme} subtitle={"Private Equity"} dropdown={true}/>
            <View style={{ flex: 1, backgroundColor: this.props.theme.theme.ROOT_BACKGROUND_COLOR }} >
              {
                Object.keys(this.state.widgetConfig).length > 0 ?
                  this.state.widgetConfig.widgets.map(config => {
                    return <GetWidgets key={config.id} wConfig={config} theme={this.props.theme} />
                  })
                  :
                  <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>

                  </ActivityIndicator>
              }
            </View>
            <NavigationBar config={this.state.appConfig.menubar} theme={this.props.theme} />
            <Modalize 
            ref={this.modal} 
            HeaderComponent={
              <><View style={styles.navBarContainerWithoutFilter} children={this.createButtons()}></View>
              <Divider /></>
            }
            modalHeight={800}><AddDeal data={this.state.modalData} theme={this.props.theme} modalMethods={this.modal}/></Modalize>
          </ThemeProvider>
        </ModalCtx.Provider>

      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

    navBarContainerWithoutFilter: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        backgroundColor: 'transparent',
        marginHorizontal: 10,
        paddingVertical: 10
    },
    buttonStyles: {
        marginHorizontal: 10
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
    theme: state.themeDetails,
    token: state.authenticationDetails.user_details.token
  }
}

const dispatchStateToProps = (dispatch) => {
  return {
    fetchAppConfig: (params) => dispatch(fetchAppConfig(params)),
    fetchWidgetConfig: (params) => dispatch(fetchWidgetConfig(params)),
    widgetRequest: () => dispatch(widgetRequest())
  }
}

export default connect(mapStateToProps, dispatchStateToProps)(RootDashboard);