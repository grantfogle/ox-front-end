import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

function showCurrentParty() {
    console.log('dog city');
};

const Start = () => {
    const { container, button, buttonText } = styles;
    return (
        <View style={container}>
            <TouchableOpacity style={button} onPress={() => console.log('dogs')}>
                <Text style={buttonText}>Start a Playlist</Text>
            </TouchableOpacity>
            <TouchableOpacity style={button}>
                <Text style={buttonText}>Find a Playlist</Text>
            </TouchableOpacity>
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