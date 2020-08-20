import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { OxContext } from '../../contexts/OxContext';

class FindPlaylist extends Component {
    static contextType = OxContext;
    constructor(props) {
        super(props);
        this.state = {
            playlistName: '',
        }
    }

    formUpdate(text) {
        this.setState({ playlistName: text });
    }

    displayAlert(title, subTitle) {
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

    async searchForPlaylist() {
        if (this.state.playlistName.length > 0) {
            const findPlaylistStatus = await this.context.findPlaylistOnDB(this.state.playlistName);
            if (findPlaylistStatus) {
                return Actions.playlistHome();
            } else {
                return this.displayAlert('Playlist Not Found', 'Please try again');
            }
        } else {
            return this.displayAlert('Please Enter Text');
        }
    }

    render() {
        const { container, headerText, formText, formFillText, formButton, formCircle,
            joinButton } = styles;
        return (
            <View style={container}>
                <Text style={headerText}>Find a Playlist</Text>
                <View style={formButton}>
                    <TextInput style={formFillText} placeholder="Playlist Name"
                        onChangeText={(text) => this.formUpdate(text)} />
                </View>
                <TouchableOpacity style={joinButton} onPress={() => this.searchForPlaylist()}>
                    <Text style={formText}>Join Playlist</Text>
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
    joinButton: {
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