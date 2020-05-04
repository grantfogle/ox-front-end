import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            allowRadio: '',
            allowVeto: '',
            allowRepost: '',
        }
    }
    render() {
        const { container, headerText, formText, formButton, formCircle } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>Create Your Playlist</Text>
                <View style={formButton}>
                    <TextInput style={formText} placeholder="Playlist Name" />
                </View>
                <TouchableOpacity style={formButton}>
                    <View style={formCircle} />
                    <Text style={formText}>Allow Radio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={formButton}>
                    <View style={formCircle} />
                    <Text style={formText}>Allow Veto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={formButton}>
                    <View style={formCircle} />
                    <Text style={formText}>Allow Replays</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Text style={formText}>Get Started ----></Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default CreatePlaylist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    headerText: {
        fontSize: 40,
        marginBottom: 40,
        width: 400,
        paddingLeft: 20,
        color: '#000',
    },
    formButton: {
        width: '90%',
        height: 80,
        paddingLeft: 20,
        marginBottom: 20,
        backgroundColor: '#fff',
        borderWidth: 2,
        borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#9b59b6',
    },
    formText: {
        fontSize: 25,
        width: '100%',
    },
    formCircle: {
        height: 20,
        width: 20,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
    }
});