import React, { Component } from 'react';
import {
  View,
  Alert,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { Card, Divider } from 'react-native-paper';
import { getFilledObject, buildDataRequest, createCard, filterDataOnId, getTitle } from '../../utilities/Utilities';
import { getFontSize } from '../../components/assets/scrollview/ScrollViewAssets';
import { WIDGET_TYPE_KEY_INFO } from '../../utilities/Constants';
import { connect } from 'react-redux';
import { fetchWidgetData, dataRequest } from '../../redux/actions/dashboard/main.actions';
import { GENERIC_DATA_ERROR } from '../../utilities/Constants';
import { Placeholders } from '../../utilities/Placeholders';
import TopWidgetConfiguration from '../assets/TopWidgetConfiguration';

let keyStyles;

class TopBottom extends Component<{}> {

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
      (this.state.data.length > 0 ?
        <Card
          elevation={5}
          style={[styles.container, { backgroundColor: this.props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT }]}
        >
          {getTitle(this.props.wConfig, this.props.theme.theme)}
          <TopWidgetConfiguration data={this.state.data} config={this.props.wConfig.params} style={styles.titleStyles}/>
          <Card.Content>
          </Card.Content>
        </Card>
        : !this.state.isDataFetched ?
          <Card style={[styles.container, {backgroundColor: this.props.theme.theme.PRIMARY_BORDER_COLOR_LIGHT}]}  elevation={10}>{Placeholders({type: "cir-media-col-text", keyStyles})}</Card>
          // <ActivityIndicator style={{ flex: 1, justifyContent: 'center', alignSelf: 'center', alignItems: 'center' }}>

          //</ActivityIndicator>
          : <>{Alert.alert(
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
    margin: 10,
    flexDirection: 'row'
  },
  titleStyles: {
    flex: 3,
    margin: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    alignContent: 'center'
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

export default connect(mapStateToProps, dispatchStateToProps)(TopBottom);