import React, { Component, createContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import { clientId, clientSecret } from '../secret';
import base64 from 'react-native-base64';
import SpotifyWebApi from 'spotify-web-api-node';

export const OxContext = createContext();

class OxContextProvider extends Component {
    state = {
        username: '',
        spotifyUsername: '',
        spotifyId: '',
        authorizationCode: '',
        spotifyToken: '',
        refreshToken: '',
        expirationTime: '',
        playlist: [],
        songSearch: [],
        currentPlaylist: [
            { id: 1, name: 'Flashing Lights', artist: 'Kanye West' },
            { id: 2, name: 'Fly Me to The Moon', artist: 'Frank Sinatra' },
            { id: 3, name: 'Apparently', artist: 'J. Cole' },
            { id: 4, name: 'Underwater', artist: 'Rufus Du Sol' },
            { id: 5, name: 'Heartache on the Dancefloor', artist: 'Jon Pardi' },
            { id: 6, name: '22', artist: 'Taylor Swift' }
        ],
    }

    spotifyApi = new SpotifyWebApi({
        clientId: clientId,
        clientSecret: clientSecret,
        redirectUri: AuthSession.getRedirectUrl(),
    });

    async getSpotifyCredentials() {
        const obj = {
            clientId: clientId,
            secret: clientSecret,
            redirectUri: AuthSession.getRedirectUrl(),
        };
        return obj;
    };

    async getAuthorizationCode() {
        const scopesArr = [
            'user-read-email',
            'user-read-currently-playing',
            'app-remote-control',
            'playlist-modify-public',
        ]
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
        })
        this.setState({ authorizationCode: result.params.code });
        return result.params.code;
    };
    // get auth token
    async getAccessToken(authorizationCode) {
        const redirectUri = AuthSession.getRedirectUrl();
        const credentialsToBase64 = base64.encode(`${clientId}:${clientSecret}`);
        // const credentialsToBase64 = 'NzYzYWNlZTk2M2IyNGI4NGE0YTM1ZDRhYjU4NzRiOTk6YTZiZjA5ZDAwNGJiNDBkMzg1MDc5YTM1ODU2ZGRlY2I='
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
                spotifyApi.setAccessToken(data.access_token);
                this.setState({ spotifyToken: data.access_token })
                console.log('data', data);
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
    // Get spotify user
    async getUserPlaylists() {
        const { id: userId } = await sp.getMe();
        const { item: playlists } = await sp.getUserPlaylists(userId, { limit: 50 });
        console.log('playlists', playlists)
        return playlists;
    }
    // create playlist

    // find a playlist
    // find a song

    // add items to to playlist
    // remove items from a playlist
    // get playback info (what's played, current tracks, skip, repeat, pause)

    //Refresh Token
    // refreshTokens = async () => {
    //     try {
    //       const credentials = await getSpotifyCredentials() //we wrote this function above
    //       const credsB64 = btoa(`${credentials.clientId}:${credentials.clientSecret}`);
    //       const refreshToken = await getUserData('refreshToken');
    //       const response = await fetch('https://accounts.spotify.com/api/token', {
    //         method: 'POST',
    //         headers: {
    //           Authorization: `Basic ${credsB64}`,
    //           'Content-Type': 'application/x-www-form-urlencoded',
    //         },
    //         body: `grant_type=refresh_token&refresh_token=${refreshToken}`,
    //       });
    //       const responseJson = await response.json();
    //       if (responseJson.error) {
    //         await getTokens();
    //       } else {
    //         const {
    //           access_token: newAccessToken,
    //           refresh_token: newRefreshToken,
    //           expires_in: expiresIn,
    //         } = responseJson;

    //         const expirationTime = new Date().getTime() + expiresIn * 1000;
    //         await setUserData('accessToken', newAccessToken);
    //         if (newRefreshToken) {
    //           await setUserData('refreshToken', newRefreshToken);
    //         }
    //         await setUserData('expirationTime', expirationTime);
    //     }
    //   }
    render() {
        return (
            <OxContext.Provider value={{
                ...this.state, getAccessToken: this.getAccessToken.bind(this),
                getAuthorizationCode: this.getAuthorizationCode.bind(this),
                getUserPlaylists: this.getUserPlaylists
            }}>
                {this.props.children}
            </OxContext.Provider>
        );
    }
}

export default OxContextProvider;