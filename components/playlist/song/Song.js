import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Song = ({ song }) => {
    const { songRow, songInfo, songName, songArtist, vetoSong, vetoText, songDetails } = styles;
    const showArtists = () => {
        const artistString = '';
        return artistString;

    }
    // Allow add, un add, star unstar allow un do of moves
    return (
        <View style={songRow}>
            <View style={songDetails}>
                <Image source={{ uri: song.art }} style={{ width: 54, height: 54 }} />
                <View style={songInfo}>
                    <Text style={songName}>{song.name}</Text>
                    <Text style={songArtist}>{song.artists[0]}</Text>
                </View>
            </View>
            <TouchableOpacity style={vetoSong}>
                <Text style={vetoText}>VETO</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Song;

const styles = {
    songRow: {
        width: '100%',
        padding: 5,
        minheight: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomWidth: 1,
        borderBottomColor: '#8e44ad',
    },
    songDetails: {
        width: 200,
        flexDirection: 'row',
    },
    songInfo: {
        height: '100%',
        flexDirection: 'column',
        marginLeft: 10,
    },
    songName: {
        fontSize: 20,
        color: '#fff'
    },
    songArtist: {
        fontSize: 14,
        color: '#fff',
    },
    vetoSong: {
        height: 36,
        width: 60,
        backgroundColor: '#8e44ad',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vetoText: {
        fontSize: 16,
        color: '#fff',
    }
};