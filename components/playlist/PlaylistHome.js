import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';
import Song from './song/Song';
import clientId from '../../secret';
import { OxContext } from '../../contexts/OxContext';

class PlaylistHome extends Component {
    static contextType = OxContext;
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    displayPlaylist() {
        console.log('THIS IS THE CURRENT PLAYLIST', this.context.currentPlaylist);
        return this.context.currentPlaylist.map(song => <Song key={song.id} name={song.name} artist={song.artist} />);
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SearchBar />
                {this.displayPlaylist()}
                {/* {this.getSpotifyResults()} */}
            </View>
        );
    }
}

export default PlaylistHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#9b59b6',
    },
    headerText: {
        fontSize: 40,
        marginBottom: 40,
        width: 400,
        paddingLeft: 20,
        color: '#000',
    },
    searchResults: {
        height: 400,
        backgroundColor: 'red',
    }
});