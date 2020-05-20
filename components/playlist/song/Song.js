import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

const Song = ({ name, artist }) => {
    const { songRow, songInfo, songName, songText, songArt, vetoSong, vetoText } = styles;
    // Allow add, un add, star unstar allow un do of moves
    return (
        <View style={songRow}>
            <View style={songInfo}>
                <Text style={songName}>{name}</Text>
                <Text style={songText}>{artist}</Text>
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
        height: 60,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 5,
        paddingRight: 5,
        marginTop: 2,
    },
    songInfo: {
        height: '100%',
        justifyContent: 'center',
    },
    songArt: {
        height: 40,
        width: 40,
    },
    songName: {
        fontSize: 20,
        color: '#000',
    },
    songText: {
        fontSize: 14,
    },
    vetoSong: {
        height: 36,
        width: 60,
        backgroundColor: '#e74c3c',
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    vetoText: {
        fontSize: 16,
        color: '#fff',
    }
};