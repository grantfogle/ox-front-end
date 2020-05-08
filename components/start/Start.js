import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { clientId, clientSecret } from '../../secret';

function showCurrentParty() {
    console.log('dog city');
};

function getAccessToken() {
    // const credentialsConvertedToBase64 = Basic + btoa(clientId + ":" + clientSecret);
    // const url = 'https://accounts.spotify.com/api/token';
    // fetch(url, {
    //     method: 'POST',
    //     headers: {
    //         Authorization: credentialsConvertedToBase64
    //     },
    //     body: {
    //         grant_type: 'client_credentials'
    //     }
    // })
    //     .then(response => response.json())
    //     .then(data => {
    //         console.log(data)
    //         this.searchSongs = data;
    //     })
}
// get auth token
// create playlist
// find a playlist
// find a song
// add items to to playlist
// remove items from a playlist
// get playback info (what's played, current tracks, skip, repeat, pause)

const Start = () => {
    const { container, button, buttonText } = styles;
    return (
        <View style={container}>
            <TouchableOpacity style={button} onPress={() => Actions.createPlaylist()}>
                <Text style={buttonText}>Start a Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button} onPress={() => Actions.findPlaylist()}>
                <Text style={buttonText}>Find a Playlist</Text>
            </TouchableOpacity>
            {getAccessToken()}
            {/* View Playlist
            Add song to playlist */}
        </View>
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