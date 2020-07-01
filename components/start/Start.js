import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { clientId, clientSecret, token } from '../../secret';
import * as AuthSession from 'expo-auth-session';
import { OxContext } from '../../contexts/OxContext';

const Start = () => {
    const { container, button, buttonText } = styles;
    return (
        <OxContext.Consumer>{({ getAccessToken, getAuthorizationCode, getUserInfo }) => {
            return (
                <View style={container}>
                    <TouchableOpacity style={button} onPress={() => Actions.createPlaylist()}>
                        <Text style={buttonText}>Start a Playlist</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={button} onPress={() => Actions.findPlaylist()}>
                        <Text style={buttonText}>Find a Playlist</Text>
                    </TouchableOpacity>
                </View>
            )
        }}
        </OxContext.Consumer>
    )
}

export default Start;

const styles = {
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9b59b6',
    },
    button: {
        marginTop: 40,
        width: '90%',
        height: 80,
        backgroundColor: '#8e44ad',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontSize: 32,
        color: '#fff',
    },
};