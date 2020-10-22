import React, { Component } from 'react';
import { connect } from 'react-redux';
import RootDashboard from '../../components/dashboards/RootDashboard';
import Drawer from 'react-native-drawer'
import Login from '../../pages/authentication/Login';
import Filter from '../../components/assets/sidebar/Filter'
import Notification from '../../components/assets/sidebar/Notification'
import {
    openNavigationDrawer,
    closeNavigationDrawer,
    openNotificationDrawer,
    closeNotificationDrawer
} from '../../redux/actions/dashboard/navigation.actions';

const drawerStyles = {
    drawer: { shadowColor: '#000000', shadowOpacity: 0.8, shadowRadius: 3 },
    main: { paddingLeft: 3 },
}

class DashboardMain extends Component<{}> {
    
    render() {
        console.log("---------------------------------------");
        
        console.log(this.props.title);
        
        return (
            <>
                <Drawer
                    type="overlay"
                    open={this.props.isDrawerOpen}
                    openDrawerOffset={117}
                    onCloseStart={() => this.props.closeNavigationDrawer()}
                    tweenDuration={300}
                    acceptTap={this.props.isDrawerOpen}
                    tweenHandler={(ratio) => {
                        return {
                            mainOverlay: { opacity: ratio / 1.5, backgroundColor: '#000' }
                        }
                    }}
                    styles={{ shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 300}}
                    content={<Filter />}
                >
                    <Drawer
                        type="overlay"
                        open={this.props.isNotificationDrawerOpen}
                        openDrawerOffset={117}
                        onCloseStart={() => this.props.closeNotificationDrawer()}
                        tweenDuration={300}
                        side="right"
                        acceptTap={this.props.isNotificationDrawerOpen}
                        tweenHandler={(ratio) => {
                            return {
                                mainOverlay: { opacity: ratio / 1.5, backgroundColor: '#000' }
                            }
                        }}
                        styles={{ shadowColor: '#000000', shadowOpacity: 1, shadowRadius: 300 }}
                        content={<Notification />}
                    >
                        { this.props.title === "Open"? <Login /> : <RootDashboard />}
                    </Drawer>
                </Drawer>
            </>
        );
    }
};



const mapStateToProps = (state) => {
    return {
        isDrawerOpen: state.navigationDetails.isDrawerOpen,
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
export default connect(mapStateToProps, dispatchStateToProps)(DashboardMain);