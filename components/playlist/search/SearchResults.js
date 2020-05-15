import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { OxContext } from '../../../contexts/OxContext';

const SearchResults = () => {
    const { searchResults, songRow, songName, songText } = styles;
    // Allow add, un add, star unstar allow un do of moves
    return (
        <OxContext.Consumer>{({ searchedSongs }) => {
            function displaySearchedSongs() {
                const songArr = Object.keys(searchedSongs["artists"]);
                console.log(songArr);
                return songArr.map(song => {
                    return (
                        <View style={songRow}>
                            <Text style={songName}>Song Name</Text>
                            <Text style={songText}>Song Artist</Text>
                            <Text style={songText}>Favorite</Text>
                            <Text style={songText}>Remove</Text>
                        </View>
                    )
                })
            }
            return (
                <ScrollView>
                    {displaySearchedSongs()}
                </ScrollView>
            );
        }}
        </OxContext.Consumer>
    )
}

export default SearchResults;

const styles = {
    container: {
        width: '100%',
        height: 200,
        backgroundColor: 'black',
    },
    searchResults: {
        minHeight: '100%',
        width: '100%',
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