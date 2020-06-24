import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { OxContext } from '../../../contexts/OxContext';

class SearchBar extends Component {
    static contextType = OxContext;
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }

    formUpdate(text) {
        this.setState({ query: text })
    }
    async searchForTrack() {
        const searchStatus = await this.context.searchSongs(this.state.query);

        if (searchStatus) {
            Actions.searchResults();
        }
    }
    render() {
        const { searchBox, searchInput, searchButton, searchButtonText } = styles;
        const { searchSongs } = this.context;
        return (
            <View style={searchBox}>
                <TextInput placeholder="Search artist or song name"
                    style={searchInput}
                    onChangeText={(text) => this.formUpdate(text)}
                />
                <TouchableOpacity style={searchButton} onPress={() => this.searchForTrack()}>
                    <Text style={searchButtonText}>Search</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

export default SearchBar;

const styles = StyleSheet.create({
    searchBox: {
        width: '100%',
        height: 80,
        // backgroundColor: '#9b59b6',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#8e44ad',
    },
    searchButton: {
        marginLeft: 10,
        width: 100,
        height: 40,
        backgroundColor: '#8e44ad',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    searchButtonText: {
        fontSize: 24,
        color: '#fff',
    },
    searchInput: {
        height: 40,
        width: 250,
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 20,
        borderRadius: 3,
    }
});