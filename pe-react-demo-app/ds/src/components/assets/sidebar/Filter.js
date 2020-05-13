import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Background, NormalText } from '../../../themes/styling';

class Filter extends Component {
    render() {
        console.log(JSON.stringify(this.props));

        return (
            <ThemeProvider theme={this.props.theme}>
                <Background style={{ flex: 1, shadowColor: '#000000', shadowOffset: { width: 100 } }}>
                    <NormalText>{this.props.sidebar.filters && this.props.sidebar.filters.config.title}</NormalText>
                </Background>
            </ThemeProvider>
        );
    }

}

const mapStateToProps = (state) => {
    return {
        sidebar: state.navigationDetails.appConfig,
        theme: state.themeDetails
    }
}
const styles = StyleSheet.create({

});
export default connect(mapStateToProps, null)(Filter);