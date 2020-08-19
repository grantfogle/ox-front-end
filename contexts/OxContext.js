import React, { Component, createContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import { clientId, clientSecret } from '../secret';
import base64 from 'react-native-base64';
import SpotifyWebAPI from 'spotify-web-api-js';

export const OxContext = createContext();

/*
    FUTURE IMPLEMENTATIONS
    - show playback info (what's played, current tracks, skip, repeat, pause)
    - allow for control of song
    - allow users to control what songs people add
    - STYLING IMPROVEMENTS
    - SESSION HANDLING LIVE
    - HOW TO FIND PLAYLIST BY PROXIMITY
    - CLEAN UP CODES BRO
*/

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
        currentPlaylist: [],
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
    };

    async getUserInfo() {
        const userInfo = await this.spotifyApi.getMe();
        this.setState({ spotifyUserId: userInfo.id });
        if (userInfo) {
            return true;
        }
    }

    async createPlaylistOnDB(name) {
        const playlistInfo = {
            playlistName: name,
            spotifyUserId: this.state.spotifyUserId,
        };
        await fetch('https://ox-db.herokuapp.com/create-playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(playlistInfo)
        })
            .then(response => response.json())
            .then(data => {
                playlistinfoFromDB = data[0];
            })
        this.setState({ playlistId: playlistinfoFromDB.spotifyId });
    }

    async doesPlaylistExist(playlistName) {
        let isPlaylistNameUnique = false;
        await fetch(`https://ox-db.herokuapp.com/playlist/${playlistName}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.length === 0) {
                    isPlaylistNameUnique = true;
                }
            });

        return isPlaylistNameUnique;
    }

    async createPlaylist(spotifyName, dbPlaylistName) {
        let playlistCreated = false;
        const body = {
            name: spotifyName,
            public: false,
            collaborative: true
        }
        let dbBody = {
            playlistName: dbPlaylistName,
            spotifyUserId: this.state.spotifyUserId,
            spotifyPlaylistId: '',
        }
        const createdPlaylist = await this.spotifyApi.createPlaylist(this.state.spotifyUserId, body);

        this.setState({ playlistId: createdPlaylist.id });
        dbBody.spotifyPlaylistId = this.state.playlistId;

        await fetch('https://ox-db.herokuapp.com/playlist/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(dbBody)
        })
            .then(response => {
                if (response.status === 204) {
                    playlistCreated = true;
                }
            });

        return playlistCreated;
    }

    async findAPlaylist() {
        this.spotifyApi.getPlaylist(this.state.playlistId);
    }

    async getPlaylistTracks() {
        const playlistId = this.state.playlistId;
        const playlist = [];
        await this.spotifyApi.getPlaylistTracks(playlistId)
            .then(response => {
                response.items.map(song => {
                    let name = song.track.name;
                    let artists = song.track.artists.map(artist => artist.name);
                    let album = song.track.album.name;
                    let id = song.track.id;
                    let uri = song.track.uri;
                    let art = song.track.album.images[2].url;
                    playlist.push({ id, uri, name, artists, album, art });
                });
            });
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
                    let art = song.album.images[2].url;
                    return { name, artist, album, id, uri, art };
                })
                this.setState({ searchedSongs: mappedSongResponse });
            })
        return true;
    }

    async findPlaylistOnDB(name) {
        let playlistFetched = false;
        let returnedPlaylist,
            playlistinfoFromDB;
        const playlistInfo = { playlistName: name };
        await fetch('https://ox-db.herokuapp.com/playlist', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(playlistInfo)
        })
            .then(response => response.json())
            .then(data => {
                console.log('data', data)
                if (data[0]) {
                    playlistFetched = true;
                    playlistinfoFromDB = data[0];
                }
            })
        this.setState({ playlistId: playlistinfoFromDB.spotifyPlaylistId });
        this.getPlaylistTracks();
        return playlistFetched;
    }

    async removeSongsFromPlaylist(song) {
        this.spotifyApi.removeTracksFromPlaylist(this.state.playlistId);
    }

    // async vetoCurrentSong() {
    //     this.spotifyApi.skipToNext()
    // }
    async fetchUserPlayback() {
    }
    // fetch user playback - get user plyaback to see what's being played
    // can i control user playback on someone else's device??
    // handle better 

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
                getPlaylistTracks: this.getPlaylistTracks.bind(this),
                findPlaylistOnDB: this.findPlaylistOnDB.bind(this),
                doesPlaylistExist: this.doesPlaylistExist.bind(this)
            }}>
                {this.props.children}
            </OxContext.Provider>
        );
    }
}

export default OxContextProvider;