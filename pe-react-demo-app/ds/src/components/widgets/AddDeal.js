import React, { Component } from 'react';
import {
    View,
} from 'react-native';
import { connect } from 'react-redux';
import { List, Divider } from 'react-native-paper';
import { NormalText } from '../../themes/styling';
import * as Animitable from 'react-native-animatable';

class AddDeal extends Component<{}> {

    createList = () => {

        const { data } = this.props;
        const { attributes } = data;

        let listView = [];
        let index = 0;
        for (item in attributes) {
            item = attributes[item];
            listView.push(
                <>
                <Animitable.View
                 animation="fadeIn"
                 delay={200 + index*30}
                 style={{ flexDirection: 'row', paddingVertical: 10, backgroundColor: index++%2 === 1? '#fcfcfc': this.props.theme.theme.BACKGROUND_COLOR, marginHorizontal: 10 }}>
                    <View style={{ alignItems: 'flex-start', flex: 1,  borderRightColor: 'lightgray' }}>
                        <NormalText>{item['Display Name']}</NormalText>
                    </View>
                    <View style={{ alignItems: 'flex-end', flex: 1}}>
                        <NormalText>{item['type']}</NormalText>
                    </View>
                </Animitable.View>
                    <Divider style={{ marginHorizontal: 10 }} /></>

            )
        }
        console.log(listView);
        return (<List.Section>{listView}</List.Section>)
    }
    render() {
        return (
            <>
                {this.createList()}
            </>
        );
    }
}

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