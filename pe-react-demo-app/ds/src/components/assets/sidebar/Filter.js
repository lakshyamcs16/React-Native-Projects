import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'
import { connect } from 'react-redux';

class Filter extends Component{
    render() {
        console.log(JSON.stringify(this.props));
        
        return (
            <View>
                <Text>{this.props.sidebar.filters && this.props.sidebar.filters.config.title}</Text>
            </View>
        );
    }
    
}

const mapStateToProps = (state) => {
    return {
        sidebar: state.navigationDetails.appConfig,
    }
}
const styles = StyleSheet.create({

});
export default connect(mapStateToProps, null)(Filter);