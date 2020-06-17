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
        playlistId: '4kcjIFRliZWc7bGe597Dmj',
        songs: [],
        currentPlaylist: [
            { id: 1, name: 'Flashing Lights', artist: 'Kanye West', art: '' },
            { id: 2, name: 'Fly Me to The Moon', artist: 'Frank Sinatra', art: '' },
            { id: 3, name: 'Apparently', artist: 'J. Cole', art: '' },
            { id: 4, name: 'Underwater', artist: 'Rufus Du Sol', art: '' },
            { id: 5, name: 'Heartache on the Dancefloor', artist: 'Jon Pardi', art: '' },
            { id: 6, name: '22', artist: 'Taylor Swift', art: '' }
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
            'playlist-modify-private',
            'playlist-read-collaborative',
            'playlist-modify-public',
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
        this.setState({ playlistId: createdPlaylist.id });
        if (createdPlaylist.collaborative) {
            playlistCreated = true;
            // fetch playlist or set 
        }
        return playlistCreated;
    }

    async findAPlaylist() {
        this.spotifyApi.getPlaylist(this.state.playlistId);
    }

    async getPlaylistTracks() {
        const playlistId = this.state.playlistId;
        const playlist = [];
        console.log('THIS IS THE PLAYLIST ID', playlistId);
        // this.spotifyApi.getPlaylist
        //this.spotifyApi.getPlaylistTracks(playlistId, track(name, href, album(name, href)))
        await this.spotifyApi.getPlaylistTracks(playlistId)
            .then(response => {
                console.log('response json', response.items)
                response.items.map(song => {
                    let name = song.track.name;
                    let artists = song.track.artists.map(artist => artist.name);
                    let album = song.track.album.name;
                    let id = song.track.id;
                    let uri = song.track.uri;
                    let art = song.track.album.images[2].url;
                    playlist.push({ id, uri, name, artists, album, art });
                    console.log('it workeddddd', { id, uri, name, artists, album, art });
                    // playlist.push({ id, uri, name, artist, album });
                });
            });
        console.log('THIS IS THE TRUNCATED PLAYLIST', playlist);
        this.setState({ currentPlaylist: playlist });
    }

    async addSongToPlaylist(songUri) {
        this.spotifyApi.addTracksToPlaylist(this.state.playlistId, [songUri]);
    }

    async searchSongs(query) {
        this.spotifyApi.search(query, ['track'])
            .then(response => {
                const mappedSongResponse = response.tracks.items.map(song => {
                    let name = song.name;
                    let artist = song.artists.map(artist => artist.name);
                    let album = song.album.artists.map(album => album.name);
                    let id = song.id;
                    let uri = song.uri;
                    return { name, artist, album, id, uri };
                })
                this.setState({ searchedSongs: mappedSongResponse });
            })
        return true;
    }

    async removeSongsFromPlaylist(song) {
        this.spotifyApi.removeTracksFromPlaylist(this.state.playlistId);
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
                createPlaylist: this.createPlaylist.bind(this),
                addSongToPlaylist: this.addSongToPlaylist.bind(this),
                getPlaylistTracks: this.getPlaylistTracks.bind(this),
                findAPlaylist: this.findAPlaylist.bind(this),
                getPlaylistTracks: this.getPlaylistTracks.bind(this)
            }}>
                {this.props.children}
            </OxContext.Provider>
        );
    }
}

export default OxContextProvider;