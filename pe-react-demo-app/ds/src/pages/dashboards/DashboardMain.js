import React, { Component } from 'react';
import { connect } from 'react-redux';
import Demo from '../../components/dashboards/Demo';
import Drawer from 'react-native-drawer'
import {
    View,
    Text,
} from 'react-native';
import Filter from '../../components/assets/sidebar/Filter'

class DashboardMain extends Component<{}> {
    render() {        
        return ( 
            <Drawer
                open={this.props.isDrawerOpen}
                openDrawerOffset={117}
                tweenHandler={Drawer.tweenPresets.parallax}
                styles={drawerStyles}
                content={<Filter />}
            >
                <Demo />

            </Drawer>
        );
    }
};

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}

const mapStateToProps = (state) => {
    return {
        isDrawerOpen: state.navigationDetails.isDrawerOpen,
    }
}
export default connect(mapStateToProps, null)(DashboardMain);