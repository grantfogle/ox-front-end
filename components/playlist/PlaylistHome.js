import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';
import Song from './song/Song';
import clientId from '../../secret';

class PlaylistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            showResults: false,
            searchSongs: [],
            userSearch: 'FKJ'
        }
    }

    songArr = [
        { id: 1, name: 'Flashing Lights', artist: 'Kanye West' },
        { id: 2, name: 'Fly Me to The Moon', artist: 'Frank Sinatra' },
        { id: 3, name: 'Apparently', artist: 'J. Cole' },
        { id: 4, name: 'Underwater', artist: 'Rufus Du Sol' },
        { id: 5, name: 'Heartache on the Dancefloor', artist: 'Jon Pardi' },
    ]
    // async getSpotifyResults(userSearch) {
    //     const query = 'https://api.spotify.com/v1/search/q=' + fkj.replace(' ', '+');
    //     fetch(query, {
    //         method: 'GET',
    //         headers: {
    //             Authorization: clientId
    //         },
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             console.log(data)
    //             this.searchSongs = data;
    //         })
    // }

    displaySearchResults() {
        return this.state.showResults ? <SearchResults /> : <View></View>;
    }

    displayPlaylist() {
        return this.songArr.map(song => <Song key={song.id} name={song.name} artist={song.artist} />);
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SearchBar />
                {this.displaySearchResults()}
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
        // justifyContent: 'center',
        backgroundColor: '#9b59b6',
    },
    headerText: {
        fontSize: 40,
        marginBottom: 40,
        width: 400,
        paddingLeft: 20,
        color: '#000',
    },
});