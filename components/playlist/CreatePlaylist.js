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
            allowRadio: false,
            allowVeto: false,
            allowRepost: false,
        }
    }

    formUpdate(text) {
        this.setState({ playlistName: text });
    }

    async submitNewPlaylist() {
        if (this.state.playlistName.length > 0) {
            const playlistStatus = await this.context.createPlaylist(this.state.playlistName);
            if (playlistStatus) {
                Actions.playlistHome();
            }
            console.log('create playlist ran in createPlaylist component');
            console.log('playlistStatus', playlistStatus);
            // check to make sure playlist was created and we have a new playlist ready to view
        } else {
            console.log('There was an error');
        }
    }

    render() {
        const { container, headerText, formText, formButton, formButtonSelected, formCircle } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>Create Your Playlist</Text>
                <View style={formButton}>
                    <TextInput style={formText} placeholder="Playlist Name"
                        onChangeText={(text) => this.formUpdate(text)} />
                </View>
                <TouchableOpacity style={formButton}>
                    <View style={formCircle} />
                    <Text style={formText}>Allow Radio</Text>
                </TouchableOpacity>
                <TouchableOpacity style={formButton}>
                    <View style={formCircle} />
                    <Text style={formText}>Allow Veto</Text>
                </TouchableOpacity>
                <TouchableOpacity style={formButtonSelected}>
                    <View style={formCircle} />
                    <Text style={formText}>Allow Replays</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.submitNewPlaylist()}>
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
        backgroundColor: '#fff',
    },
    formButtonSelected: {
        width: '90%',
        height: 80,
        paddingLeft: 20,
        marginBottom: 20,
        borderWidth: 2,
        borderColor: '#9b59b6',
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#9b59b6',
    }
});