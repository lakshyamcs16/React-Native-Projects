import React, { Component } from 'react';
import { Router, Stack, Scene } from 'react-native-router-flux';
import Login from '../pages/authentication/Login';
import SignUp from '../pages/authentication/SignUp';
import Demo from '../components/dashboards/Demo';

export default class Routes extends Component<{}> {
    render() {
        return (
            <Router>
                <Stack key="root" hideNavBar={true}>
                        <Scene key="login" component={Login} initial={true} />
                        <Scene key="signup" component={SignUp} />
                        <Scene key="home" type="reset" component={Demo} />
                </Stack>
            </Router>
        );
    }
}