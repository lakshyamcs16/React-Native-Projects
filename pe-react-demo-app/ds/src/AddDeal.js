import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import { connect } from 'react-redux';

class AddDeal extends Component<{}> {

    render() {
        return (
            <Text>
                {this.props.data}
            </Text>
            );
    }
}

const styles = StyleSheet.create({
    navBarContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        borderBottomWidth: 1,
        paddingTop: 5,
        paddingBottom: 10
    },
    navBarContainerWithoutFilter: {
        flexDirection: 'row',
        justifyContent: 'center',
        borderBottomWidth: 1,
        paddingVertical: 5
    },
    navBarLeftIcon: {
        flex: 1,
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingLeft: 10,
    },
    navBarRightIcon: {
        alignSelf: 'flex-end',
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        paddingHorizontal: 5,
        paddingRight: 15,
        marginTop: -20
    },
    navBarTitle: {
        fontSize: 25,
        fontWeight: 'bold',
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'baseline',
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
        isFilterEnabled: state.navigationDetails.isFilterEnabled,
        isNotificationDrawerOpen: state.navigationDetails.isNotificationDrawerOpen
    }
}

const dispatchStateToProps = (dispatch) => {
    return {
        openNavigationDrawer: () => dispatch(openNavigationDrawer()),
        closeNavigationDrawer: () => dispatch(closeNavigationDrawer()),
        openNotificationDrawer: () => dispatch(openNotificationDrawer()),
        closeNotificationDrawer: () => dispatch(closeNotificationDrawer())
    }
}

export default connect(mapStateToProps, dispatchStateToProps)(AddDeal);