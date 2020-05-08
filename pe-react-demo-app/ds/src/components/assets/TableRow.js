import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  FlatList
} from 'react-native'
import RowBar from './RowBar'
import { YellowBox } from 'react-native'



YellowBox.ignoreWarnings([
  'VirtualizedLists should never be nested', 
  'Failed child context type'// TODO: Remove when fixed
])

class TableRow extends Component {

    getRows = (rowVals) => {
        var idx = 0;
        var rows = [];
                for(var i in rowVals) {
                    let item = rowVals[i];
                    let color = item.color || 'black';
                    if(item.hasBar) {
                        rows.push(<View key={i} style={{padding: 5}}><RowBar barWidths={item.barWidths} /></View>);
                        idx++;
                        continue;
                    }
                    if(idx === 0) {
                        rows.push(<Text key={i} style={{textAlign: 'left', color: color}}>{item.value}</Text>);
                        idx++;
                    }else{
                        rows.push(<Text key={i} style={[styles.textContainer, {color: color}]}>{item.value}</Text>)
                    }

                }

                return rows;
    }
    render() {
        return (
            <View style={styles.rowContainer}>
                {
                    this.getRows(this.props.rowValues)
                }
            </View>
            
        );
    }
}

const styles = StyleSheet.create({
  rowContainer: {
      flex: 1,
      flexDirection: 'row'
  },
  textContainer: {
      flex: 1,
      justifyContent: 'space-around',
      textAlign: 'right'
  }
})

export default TableRow;
