import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    render() {

        const { background, formRow, formFill, loginHeader, loginHeaderText,
            loginToggle, loginButtonText } = styles;
        return (
            <View style={background}>
                <View style={loginHeader}>
                    <Text style={loginHeaderText}>Welcome to Ox</Text>
                </View>
                <View style={formRow}>
                    <TextInput style={formFill} placeholder="Username" />
                </View>
                <View style={formRow}>
                    <TextInput style={formFill} placeholder="Password" />
                </View>
                <View style={loginToggle}>
                    <TouchableOpacity>
                        <Text style={loginButtonText} onPress={() => Actions.start()}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Text style={loginButtonText}>Sign Up</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9b59b6',
    },
    loginHeader: {
        height: 40,
        width: '100%',
        marginBottom: 20,
        flexDirection: 'row',
        justifyContent: 'center',
    },
    loginHeaderText: {
        fontSize: 40,
        color: '#fff',
    },
    formRow: {
        width: 200,
        height: 40,
        borderRadius: 10,
        marginBottom: 20,
        alignContent: 'center',
        backgroundColor: '#fff',
    },
    formFill: {
        fontSize: 25,
        padding: 8,
    },
    loginToggle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
    },
    loginButtonText: {
        fontSize: 25,
        color: '#fff',
    }
});