import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native'
import TableRow from './TableRow'
import RowBar from './RowBar'

class TableView extends Component {
 render() {
    return (
      <View style={styles.container}>
        <View style={styles.leftContainer}>
            <Text style={styles.containerHeader}>Time and Sales</Text>
            
            <FlatList data={this.props.data.items}
                renderItem={(rows)=><TableRow rowValues={rows.item} />} 
                keyExtractor={(item, index) => 'key_'+index} />
        </View>
        <View style={styles.rightContainer}>
            <Text style={styles.containerHeader}>Volume Analysis</Text>
            <FlatList data={this.props.data.rightItem}
                renderItem={(rows)=><TableRow rowValues={rows.item} />} 
                keyExtractor={(item, index) => 'key'+index} />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
    borderWidth: 1,
    backgroundColor: 'rgba(245,245,245,1)',
    borderColor: 'rgba(230,230,230,1)',
    borderRadius: 5,
    margin: 4,
  },
  leftContainer:{
    flex: 1
  },
  containerHeader: {
      fontSize: 17,
      paddingBottom: 14
  },
  rightContainer:{
    flex: 1,
    marginLeft: 10
  }
})

export default TableView;
