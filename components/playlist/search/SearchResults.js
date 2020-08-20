import React from 'react';
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { OxContext } from '../../../contexts/OxContext';
import { Actions } from 'react-native-router-flux';

const SearchResults = () => {
    const { searchResults, songDetails, songRow, songName, songText, addSongButton } = styles;
    // Allow add, un add, star unstar allow un do of moves
    return (
        <OxContext.Consumer>{({ searchedSongs, addSongToPlaylist, getPlaylistTracks }) => {
            function displaySearchedSongs() {
                return searchedSongs.map(song => {
                    // REUSE SONG COMPONENT DUDEEEEE
                    return (
                        <View style={songRow} key={song.id}>
                            <Image source={{ uri: song.art }} style={{ width: 54, height: 54 }} />
                            <View style={songDetails}>
                                <Text style={songName}>{song.name}</Text>
                                <Text style={songText}>{song.artist.map(name => name)}</Text>
                            </View>
                            <TouchableOpacity style={addSongButton} onPress={async () => {
                                await addSongToPlaylist(song.uri);
                                // await getPlaylistTracks();
                                Actions.playlistHome();
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
    // searchResults: {
    //     minHeight: '100%',
    //     width: '100%',
    // },
    songRow: {
        width: '100%',
        padding: 5,
        minHeight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        backgroundColor: '#9b59b6',
        borderBottomColor: '#8e44ad',
        paddingLeft: 20,
        paddingRight: 20,
    },
    songDetails: {
        width: 220,
        flexDirection: 'column',
    },
    songName: {
        fontSize: 20,
        color: '#fff',
    },
    songText: {
        fontSize: 16,
        color: '#fff',
    },
    addSongButton: {
        height: 45,
        width: 70,
        backgroundColor: '#27ae60',
        borderRadius: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',

    },

};