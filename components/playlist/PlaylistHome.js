import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';
import clientId from '../../secret';

class PlaylistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            showResults: true,
            searchSongs: [],
            userSearch: 'FKJ'
        }
    }

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
        return this.state.showResults ? <SearchResults /> : <Text>''</Text>;
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SearchBar />
                {this.displaySearchResults()}
                {/* {this.getSpotifyResults()} */}
                {/* <Playlist /> */}
            </View>
        );
    }
}

export default PlaylistHome;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        height: '100%',
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