import React, { Component, createContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import { clientId, clientSecret } from '../secret';
import base64 from 'react-native-base64';
import SpotifyWebAPI from 'spotify-web-api-js';

export const OxContext = createContext();

class OxContextProvider extends Component {
    state = {
        username: '',
        spotifyUsername: '',
        spotifyUserId: '125956319',
        authorizationCode: '',
        spotifyToken: '',
        refreshToken: '',
        expirationTime: '',
        playlist: [],
        playlistSongs: [],
        playlistId: '',
        songs: [],
        currentPlaylist: [
            { id: 1, name: 'Flashing Lights', artist: 'Kanye West' },
            { id: 2, name: 'Fly Me to The Moon', artist: 'Frank Sinatra' },
            { id: 3, name: 'Apparently', artist: 'J. Cole' },
            { id: 4, name: 'Underwater', artist: 'Rufus Du Sol' },
            { id: 5, name: 'Heartache on the Dancefloor', artist: 'Jon Pardi' },
            { id: 6, name: '22', artist: 'Taylor Swift' }
        ],
        searchedSongs: [],
        showSearchResults: true,
    };

    spotifyApi = new SpotifyWebAPI();

    async getAuthorizationCode() {
        const scopesArr = [
            'user-read-email',
            'user-read-currently-playing',
            'app-remote-control',
            'playlist-modify-public',
            'playlist-modify-private'
        ];
        const scopes = scopesArr.join(' ');
        const redirectUrl = AuthSession.getRedirectUrl();
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                clientId +
                '&scope=' + encodeURIComponent(scopes) +
                '&redirect_uri=' + encodeURIComponent(redirectUrl)
        });
        this.setState({ authorizationCode: result.params.code });
        return result.params.code;
    };

    async getAccessToken(authorizationCode) {
        const redirectUri = AuthSession.getRedirectUrl();
        const credentialsToBase64 = base64.encode(`${clientId}:${clientSecret}`);
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentialsToBase64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                redirectUri}`,
        })
            .then(response => response.json())
            .then(data => {
                const retreivedData = data;
                this.setState({ spotifyToken: data.access_token })
                this.spotifyApi.setAccessToken(data.access_token);
            });
        // const {
        //     access_token: accessToken,
        //     refresh_token: refreshToken,
        //     expires_in: expiresIn,
        // } = responseJson;
        // const expirationTime = new Date().getTime() + expiresIn * 1000;
        // await setUserData('accessToken', accessToken);
        // await setUserData('refreshToken', refreshToken);
        // await setUserData('expirationTime', expirationTime);
    };
    // Reruns auth if it expired
    // async getValidSPObj() {
    //     const accessToken = await getUserData('accessToken');
    //     var sp = new SpotifyWebAPI();
    //     await sp.setAccessToken(accessToken);
    //     return sp;
    // }
    async getUserInfo() {
        const userInfo = await this.spotifyApi.getMe();
        this.setState({ spotifyUserId: userInfo.id });
    }

    async createPlaylist(playlistName) {
        let playlistCreated = false;
        const body = {
            name: playlistName,
            public: false,
            collaborative: true
        }
        // { name: playlistName, public: true, collaborative: true }
        // this.spotifyApi.createPlaylist(this.state.spotifyUserId)
        const createdPlaylist = await this.spotifyApi.createPlaylist(this.state.spotifyUserId, body);
        console.log('createdPlaylist bruv', createdPlaylist);
        if (createdPlaylist.collaborative === true) {
            playlistCreated = true;
            // fetch playlist or set 
        }
        return playlistCreated;
        // await this.spotifyApi.createPlaylist(this.state.spotifyUserId, body)
        // .then(response => {
        //     console.log('response brother', response.json());
        //     playlistCreated = true;
        // })
        // console.log(createdPlaylist);
    }

    async findAPlaylist() {
        this.spotifyApi.getPlaylist(this.state.playlistId);
    }

    async getPlaylistTracks(playlistId) {
        this.spotifyApi.getPlaylist(playlistId);
    }

    async addTracksToPlaylist(song) {
        this.spotifyApi.addTracksToPlaylist(this.state.playlistId, [...song]);
        this.getPlaylistTracks();
    }

    async searchSongs(query) {
        this.spotifyApi.search(query, ['track'])
            .then(response => {
                // this.setState({ searchedSongs: response.tracks.items })
                console.log('CATAZZZZZ', response.tracks.items);
                const mappedSongResponse = response.tracks.items.map(song => {
                    console.log("SONG NAME", song.name)
                    let name = song.name;
                    let artist = song.artists.map(artist => artist.name);
                    let album = song.album.artists.map(album => album.name);
                    let id = song.id;
                    // this.state.searchedSongs.push([{ name: name, artist, album, id }])
                    return { name, artist, album, id };
                })
                // set state this.state.searchedSongs
                console.log('mappedSongResponse', mappedSongResponse)
                this.state.searchedSongs.setState({ searchedSongs: mappedSongResponse });
            })
        // if (this.state.searchedSongs.length > 0) {
        //     this.setState({ searchedSongs: true });
        // }
        // how to format songs bro??
        return true;
    }

    async removeSongsFromPlaylist(song) {
        this.spotifyApi.removeTracksFromPlaylist(this.state.playlistId);
        this.getPlaylistTracks();
    }

    /*
    FUTURE IMPLEMENTATION 
    - get playback info (what's played, current tracks, skip, repeat, pause)
    - allow for control of song
    - allow users to control what songs people add
    */

    render() {
        return (
            <OxContext.Provider value={{
                ...this.state, getAccessToken: this.getAccessToken.bind(this),
                getAuthorizationCode: this.getAuthorizationCode.bind(this),
                getUserInfo: this.getUserInfo.bind(this),
                searchSongs: this.searchSongs.bind(this),
                createPlaylist: this.createPlaylist.bind(this)
            }}>
                {this.props.children}
            </OxContext.Provider>
        );
    }
}

export default OxContextProvider;