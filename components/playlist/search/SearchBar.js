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
    render() {
        const { searchBox, searchInput, searchButton, searchButtonText } = styles;
        const { searchSongs } = this.context;
        return (
            <View style={searchBox}>
                <TextInput placeholder="Search artist or song name"
                    style={searchInput}
                    onChangeText={(text) => this.formUpdate(text)}
                />
                <TouchableOpacity style={searchButton} onPress={() => {
                    searchSongs(this.state.query);
                    Actions.searchResults();
                }}>
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
        height: 60,
        backgroundColor: '#2c3e50',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchButton: {
        width: '20%',
        height: 35,
        borderWidth: 1,
        borderColor: '#fff',
        color: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 3,
    },
    searchButtonText: {
        fontSize: 25,
        color: '#fff',
    },
    searchInput: {
        height: 35,
        width: '75%',
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 25,
        borderRadius: 3,
    }
});