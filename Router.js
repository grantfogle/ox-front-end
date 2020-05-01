import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import Login from './components/login/Login';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene key="login" component={Login} title="Login/Signup" initial />
            </Stack>
        </Router>
    )
}