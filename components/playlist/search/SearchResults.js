import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

// displaySongsReturned() {
//     for (let i = 0; i < 4; i++) {
//     }
// }


const SearchResults = () => {
    const { searchResults, songRow, songName, songText } = styles;
    // Allow add, un add, star unstar allow un do of moves
    return (
        <View style={searchResults}>
            <View style={songRow}>
                <Text style={songName}>I want it that way</Text>
                <Text style={songText}>Brittany Spears</Text>
                <Text style={songText}>Star</Text>
                <Text style={songText}>Add</Text>
            </View>
        </View>
    )
}

export default SearchResults;

const styles = {
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'black',
    },
    songRow: {
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 40,
        paddingLeft: 5,
        paddingRight: 5,
    },
    songName: {
        fontSize: 20,
    },
    songText: {
        fontSize: 16,
    }
};