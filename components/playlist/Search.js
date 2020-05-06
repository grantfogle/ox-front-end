import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

class CreatePlaylist extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: ''
        }
    }
    render() {
        const { searchBox, searchInput } = styles;
        return (
            <View style={searchBox}>
                <TextInput placeholder="Search artist or song name" style={searchInput} />
            </View>
        );
    }
}

export default CreatePlaylist;

const styles = StyleSheet.create({
    searchBox: {
        width: '100%',
        height: 60,
        backgroundColor: '#2c3e50',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchInput: {
        height: 35,
        width: '90%',
        backgroundColor: '#fff',
        paddingLeft: 10,
        fontSize: 25,
        borderRadius: 5,
    }
});