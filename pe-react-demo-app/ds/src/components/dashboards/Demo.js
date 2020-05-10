import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import TableView from '../assets/TableView'
import WebView from 'react-native-webview'

const leftDummyData = require('../../../data/leftTableDummyData.json')
const rightDummyData = require('../../../data/rightTableDummyData.json')

export default class Demo extends Component {
  state = {
    data: {
      items: leftDummyData,
      rightItem: rightDummyData
    }
  }

  render() {
    return (
      <>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.keyStats}> 
              <Text style={styles.keyHeading}>568.80</Text>
              <Text style={styles.keySubHeading}>Closed, 15:59 03/13 IST</Text>
            </View>
            <View style={styles.statsContainer}>
              <View style={styles.statDetails}>
                <TouchableOpacity>
                  <Text style={styles.statHeading}>OPEN</Text>
                  <Text style={styles.statSubHeading}>516.95</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.statHeading}>PREV CLOSE</Text>
                  <Text style={styles.statSubHeading}>543.25</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.statDetails}>
                <Text style={styles.statHeading}>DAY'S RANGE</Text>
                <Text style={styles.statSubHeading}>451.10-585.65</Text>

                <Text style={styles.statHeading}>MARKET CAP</Text>
                <Text style={styles.statSubHeading}>1.60T</Text>
              </View>
              <View style={styles.statDetails}>
                <Text style={styles.statHeadingLast}>VOLUME</Text>
                <Text style={styles.statSubHeadingLast}>25.60M</Text>


                <Text style={styles.statHeadingLast}>AVG VOL (3M)</Text>
                <Text style={styles.statSubHeadingLast}>9.27M</Text>
              </View>
            </View>
            <View style={styles.chartConfig}>
              <WebView
                source={{ uri: 'file:///android_asset/html/index.html' }}
                injectedJavaScript="Drawchart();"
                style={{ flex: null, height: 395 }}
              />
            </View>
            <View>
              <TableView data={this.state.data} />
            </View>
          </View>
        </ScrollView>
        <View style={styles.navBar}>
          <Text style={styles.navBarItem}>Analytics</Text>
          <Text style={styles.navBarItem} style={{ fontWeight: 'bold' }}>Blotter</Text>
          <Text style={styles.navBarItem}>Search</Text>
          <Text style={styles.navBarItem}>CRM</Text>
        </View>
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