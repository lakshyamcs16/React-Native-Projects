import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';
import { openNavigationDrawer, closeNavigationDrawer } from '../../redux/actions/dashboard/navigation.actions'
import { TopBar, NormalText, StyledMaterialIcon } from  '../../themes/styling';

class NavBar extends Component<{}> {

    toggleDrawer = () => {
        const isDrawerOpen = this.props.isDrawerOpen;
        if (isDrawerOpen) {
            this.props.closeNavigationDrawer();
        } else {
            this.props.openNavigationDrawer();
        }
    }

    render() {
        return (
            <TopBar style={this.props.isFilterEnabled ? styles.navBarContainer
                : styles.navBarContainerWithoutFilter}>
                {this.props.isFilterEnabled && 
                    <StyledMaterialIcon
                        name="menu"
                        size={30}
                        onPress={this.toggleDrawer}
                        style={styles.navBarLeftIcon} />}
                <NormalText style={this.props.isFilterEnabled ? styles.navBarTitle
                    : styles.navBarTitleWithoutFilter}>{this.props.title}</NormalText>
            </TopBar>

        );
    }
}

const styles = StyleSheet.create({
    navBarContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        paddingTop: 5
    },
    navBarContainerWithoutFilter: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    navBarLeftIcon: {
        flex: 1,
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        padding: 10
    },
    navBarTitle: {
        flex: 2,
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    },
    navBarTitleWithoutFilter: {
        fontSize: 30,
        fontWeight: 'bold',
        alignSelf: 'flex-start',
        justifyContent: 'flex-start',
    }
});

const mapStateToProps = (state) => {
    return {
        isDrawerOpen: state.navigationDetails.isDrawerOpen,
        title: state.navigationDetails.title,
        isFilterEnabled: state.navigationDetails.isFilterEnabled
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        openNavigationDrawer: () => dispatch(openNavigationDrawer()),
        closeNavigationDrawer: () => dispatch(closeNavigationDrawer())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(NavBar);

/*
NAV BAR


import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Actions } from 'react-native-router-flux';

const styles = StyleSheet.create({
    container: {
        height: Platform.OS === 'ios' ? 64 : 54,
        flexDirection: 'row',
        paddingTop: 20,
    },
    navBarItem: {
        flex: 1,
        justifyContent: 'center',
    },
});

export default class CustomNavBar extends React.Component {
    // constructor(props) {
    //   super(props)
    // }

    _renderLeft() {
        if (Actions.currentScene === 'customNavBar1') {
            return (
                <TouchableOpacity onPress={() => console.log('Hamburger button pressed')} style={[styles.navBarItem, { paddingLeft: 10 }]}>
                    <Image
                    style={{ width: 30, height: 50 }}
                    resizeMode="contain"
                    source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Hamburger_icon.svg/1200px-Hamburger_icon.svg.png' }}
                    />
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity onPress={Actions.pop} style={[styles.navBarItem, { paddingLeft: 10 }]}>
                <Image style={{ width: 30, height: 50 }} resizeMode="contain" source={{ uri: 'https://image.flaticon.com/icons/png/512/0/340.png' }} />
            </TouchableOpacity>
        );
    }

    _renderMiddle() {
        return (
            <View style={styles.navBarItem}>
                <Text>{this.props.title}</Text>
            </View>
        );
    }

    _renderRight() {
        return (
            <View style={[styles.navBarItem, { flexDirection: 'row', justifyContent: 'flex-end' }]}>
                <TouchableOpacity onPress={() => console.log('Share')} style={{ paddingRight: 10 }}>
                    <Image style={{ width: 30, height: 50 }} resizeMode="contain" source={{ uri: 'https://cdn3.iconfinder.com/data/icons/glypho-free/64/share-512.png' }} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('Search')} style={{ paddingRight: 10 }}>
                    <Image style={{ width: 30, height: 50 }} resizeMode="contain" source={{ uri: 'https://maxcdn.icons8.com/Share/icon/p1em/Very_Basic//search1600.png' }} />
                </TouchableOpacity>
            </View>
        );
    }

    render() {
        let dinamicStyle = {};
        if (Actions.currentScene === 'customNavBar1') {
            dinamicStyle = { backgroundColor: 'red' };
        } else {
            dinamicStyle = { backgroundColor: 'yellow' };
        }

        return (
            <View style={[styles.container, dinamicStyle]}>
                {this._renderLeft()}
                {this._renderMiddle()}
                {this._renderRight()}
          </View>
        );
    }
}




*/