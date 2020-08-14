import React, { Component } from 'react';
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { OxContext } from '../../contexts/OxContext';
// import Logo from '../../assets/small-ox-logo.png';

class Login extends Component {
    static contextType = OxContext;
    render() {

        const { background, logoStyle, formFill, loginHeader, loginHeaderText,
            loginToggle, loginButtonText, formButton, formText, formButtonRow,
            loginSubheaderText } = styles;
        return (
            <View style={background}>
                {/* <Image source={require('../../assets/ox-logo-copy.png')} style={{ width: 150, height: 150 }} /> */}
                {/* <Image style={logoStyle} source={Logo} /> */}
                <View style={loginHeader}>
                    <Text style={loginHeaderText}>Welcome to Ox</Text>
                    <Text style={loginSubheaderText}>Music is better with friends</Text>
                </View>
                <TouchableOpacity style={formButton}>
                    <Text style={formText} onPress={async () => {
                        const authCode = await this.context.getAuthorizationCode();
                        const getToken = await this.context.getAccessToken(authCode);
                        const getUser = await this.context.getUserInfo();
                        if (getUser) {
                            Actions.start();
                        }
                    }}>Login with Spotify</Text>
                </TouchableOpacity>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    logoStyle: {
        width: 120,
        height: 100,
        marginBottom: 40,
    },
    loginHeaderText: {
        fontSize: 40,
        color: '#fff',
    },
    loginSubheaderText: {
        marginTop: 10,
        fontSize: 20,
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
    },
    formButton: {
        marginTop: 40,
        width: '90%',
        height: 80,
        backgroundColor: '#1db954',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    // formButtonRow: {
    //     height: '100%',
    //     flexDirection: 'row',
    //     alignItems: 'center',
    // },
    formText: {
        fontSize: 25,
        color: '#fff',
    },
});