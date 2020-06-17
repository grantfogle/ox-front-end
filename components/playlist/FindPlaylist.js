import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { OxContext } from '../../contexts/OxContext';

class FindPlaylist extends Component {
    static contextType = OxContext;
    constructor(props) {
        super(props);
        this.state = {
            playlistCode: '',
            playlistPassword: ''
        }
    }
    render() {
        const { container, headerText, formText, formButton, formCircle } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>Find a Playlist</Text>
                <View style={formButton}>
                    <TextInput style={formText} placeholder="Playlist Code" />
                </View>
                <View style={formButton}>
                    <TextInput style={formText} placeholder="Playlist Password" />
                </View>
                <TouchableOpacity style={formButton} onPress={() => {
                    this.context.getPlaylistTracks();
                    Actions.playlistHome();
                }}>
                    <Text style={formText}>Join  ----></Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default FindPlaylist;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#9b59b6',
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