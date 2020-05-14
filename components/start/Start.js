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
                    <TouchableOpacity style={button} onPress={async () => {
                        const authCode = await getAuthorizationCode();
                        await getAccessToken(authCode);
                        await getUserInfo();
                        Actions.createPlaylist();
                    }}>
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
        backgroundColor: '#9b59b6',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-between',
    },
    button: {
        height: 80,
        width: '50%',
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center',
        // borderRadius: 25,
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 25
    }
};