import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
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

export default RouterComponent;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#fff',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
// });