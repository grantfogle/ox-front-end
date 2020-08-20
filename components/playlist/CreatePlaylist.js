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

    updateSpotifyName(text) {
        this.setState({ spotifyName: text });
    }

    updatePlaylistName(text) {
        this.setState({ playlistName: text });
    }

    createTwoButtonAlert(title, subTitle) {
        Alert.alert(
            title,
            subTitle,
            [
                {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "OK", onPress: () => console.log("OK Pressed") }
            ],
            { cancelable: false }
        );
    }

    displayError(errorMessage) {
        // enable alert message
        console.log(errorMessage);
    }

    async submitNewPlaylist() {
        const isPlaylistNameUnique = await this.context.doesPlaylistExist(this.state.playlistName);

        if (isPlaylistNameUnique) {
            if (this.state.playlistName.length > 0) {
                const playlistStatus = await this.context.createPlaylist(this.state.spotifyName, this.state.playlistName);
                if (playlistStatus) {
                    Actions.playlistHome();
                }
            } else {
                console.log('There was an error');
            }
        } else {
            this.displayError('Playlist has already been created, please change playlist name');
        }
    }

    // check for errors on submit

    render() {
        const { container, headerText, formText, formFillText, formButton,
            getStartedButton } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>Create Your Playlist</Text>
                <View style={formButton}>
                    <TextInput style={formFillText} placeholder="Spotify Name"
                        onChangeText={(text) => this.updateSpotifyName(text)} />
                </View>
                <View style={formButton}>
                    <TextInput style={formFillText} placeholder="Playlist Name"
                        onChangeText={(text) => this.updatePlaylistName(text)} />
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
    formFillText: {
        fontSize: 25,
        color: '#2c3e50'
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