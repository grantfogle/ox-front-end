import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native'

class Login extends Component {

    showText() {
        console.log('cats')
    }

    render() {

        const { background, formRow, text, loginToggle, loginButtonText } = styles;
        return (
            <View style={background}>
                {this.showText()}
                <Text style={text}>Welcome to Ox</Text>
                <View style={formRow}>
                    <TextInput />
                </View>
                <View style={loginToggle}>
                    <TouchableOpacity><Text style={loginButtonText}>Login</Text></TouchableOpacity>
                    <TouchableOpacity><Text style={loginButtonText}>Sign Up</Text></TouchableOpacity>
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
        backgroundColor: '#27ae60',
    },
    text: {
        height: 40,
        width: 200,
        fontSize: 40,
        color: '#fff'
    },
    formRow: {
        width: 200,
        height: 40,
        backgroundColor: '#fff',
    },
    loginToggle: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 200,
    },
    loginButtonText: {
        fontSize: 20,
        color: '#fff',
    }
})