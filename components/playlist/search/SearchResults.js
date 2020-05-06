import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const SearchResults = () => {
    const { searchResults, songRow, songName, songText } = styles;
    return (
        <View style={searchResults}>
            <View style={songRow}>
                <Text style={songName}>I want it that way</Text>
                <Text style={songText}>Brittany Spears</Text>
            </View>
        </View>
    )
}

export default SearchResults;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'start',
        justifyContent: 'space-between',
    },
    songRow: {
        backgroundColor: '#000',
    },
    songName: {
        fontSize: 25,
    },
    songText: {
        fontSize: 16,
    }
};