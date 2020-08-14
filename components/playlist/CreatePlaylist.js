import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { OxContext } from '../../contexts/OxContext';

class CreatePlaylist extends Component {
    static contextType = OxContext;
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
            spotifyName: ''
        }
    }

    formUpdate(text) {
        this.setState({ playlistName: text });
    }

    async submitNewPlaylist() {
        // https://ox-db.herokuapp.com/
        if (this.state.playlistName.length > 0) {
            // const oxBackendPlaylistStatus = await this.context.createPlaylistOnDb();
            // if (oxBackendPlaylistStatus) {
            // }
            const playlistStatus = await this.context.createPlaylist(this.state.playlistName);
            if (playlistStatus) {
                Actions.playlistHome();
            }
            // check to make sure playlist was created and we have a new playlist ready to view
        } else {
            //     flagg banner to let user now playlist already exists
            console.log('There was an error');
        }
    }

    render() {
        const { container, headerText, formText, formButton,
            getStartedButton } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>Create Your Playlist</Text>
                <View style={formButton}>
                    <TextInput style={formText} placeholder="Spotify Name"
                        onChangeText={(text) => this.formUpdate(text)} />
                </View>
                <View style={formButton}>
                    <TextInput style={formText} placeholder="Playlist Name"
                        onChangeText={(text) => this.formUpdate(text)} />
                </View>
                <TouchableOpacity style={getStartedButton} onPress={() => this.submitNewPlaylist()}>
                    <Text style={formText}>Get Started</Text>
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
        backgroundColor: '#9b59b6',
    },
    headerText: {
        fontSize: 40,
        marginBottom: 40,
        color: '#fff',
    },
    formButton: {
        width: '90%',
        height: 80,
        paddingLeft: 20,
        marginBottom: 20,
        // borderWidth: 2,
        // borderColor: 'black',
        backgroundColor: '#fff',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        // backgroundColor: '#9b59b6',
    },
    formText: {
        fontSize: 25,
        color: '#fff',
    },
    formCircle: {
        height: 20,
        width: 20,
        marginRight: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#000',
        backgroundColor: '#fff',
    },
    getStartedButton: {
        width: '90%',
        height: 80,
        backgroundColor: '#8e44ad',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        // backgroundColor: '#9b59b6',
    },
});