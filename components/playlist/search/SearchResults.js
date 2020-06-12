import React from 'react';
import { ScrollView, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { OxContext } from '../../../contexts/OxContext';

const SearchResults = () => {
    const { searchResults, songRow, songName, songText, addSongButton } = styles;
    // Allow add, un add, star unstar allow un do of moves
    return (
        <OxContext.Consumer>{({ searchedSongs, addSongToPlaylist, getPlaylistTracks }) => {
            function displaySearchedSongs() {
                return searchedSongs.map(song => {
                    return (
                        <View style={songRow} key={song.id}>
                            <Text style={songName}>{song.name}</Text>
                            <Text style={songText}>{song.artist.map(name => name)}</Text>
                            <TouchableOpacity style={addSongButton} onPress={async () => {
                                await addSongToPlaylist(song.uri);
                                await getPlaylistTracks();
                            }}>
                                <Text style={songText}>Add</Text>
                            </TouchableOpacity>
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
    },
    addSongButton: {
        height: 20,
        width: 60,
        backgroundColor: '#27ae60',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    }
};