import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import SearchBar from './search/SearchBar';
import SearchResults from './search/SearchResults';

class PlaylistHome extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: [],
            showResults: true,
        }
    }

    displaySearchResults() {
        return this.state.showResults ? <SearchResults /> : <Text>''</Text>;
    }

    render() {
        const { container } = styles;
        return (
            <View style={container}>
                <SearchBar />
                {this.displaySearchResults()}
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