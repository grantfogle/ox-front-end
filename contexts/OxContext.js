import React, { Component, createContext } from 'react';

export const OxContext = createContext();

class OxContextProvider extends Component {
    state = {
        username: '',
        spotifyUsername: '',
        spotifyId: '',
        spotifyToken: '',
        playlist: [],
        songSearch: [],
        currentPlaylist: '',
    }

    render() {
        return ( );
    }
}

export default OxContextProvider;