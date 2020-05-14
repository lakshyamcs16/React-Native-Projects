import React, { Component } from 'react'
import {
    StyleSheet,
    View,
    Text
} from 'react-native'
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import { Background, NormalText } from '../../../themes/styling';

class Notification extends Component {
    render() {
        return (
            <ThemeProvider theme={this.props.theme}>
                <Background style={{ flex: 1, shadowColor: '#000000', shadowOffset: { width: 100 } }}>
                    <NormalText>Notifications!</NormalText>
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
export default connect(mapStateToProps, null)(Notification);