import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from '../pages/authentication/Login';
import SignUp from '../pages/authentication/SignUp';
import DashboardMain from '../pages/dashboards/DashboardMain';
import NavBar from '../components/assets/NavBar';

export default class Routes extends Component<{}> {
    render() {
        return (
            <Router>

                <Scene hideNavBar={true}>
                    <Scene key="root" hideNavBar={true} initial={!this.props.isLoggedIn}>
                        <Scene key="login" component={Login} initial={true} />
                        <Scene key="signup" component={SignUp} title="Register" />
                    </Scene>
                    <Scene key="app" initial={this.props.isLoggedIn} hideNavBar={true}>
                        <Scene key="home" component={DashboardMain} />
                    </Scene>
                </Scene>
            </Router>
        );
    }
}