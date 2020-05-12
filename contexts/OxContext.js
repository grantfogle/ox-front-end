import React, { Component, createContext } from 'react';
import * as AuthSession from 'expo-auth-session';
import { clientId, clientSecret } from '../secret';

export const OxContext = createContext();

class OxContextProvider extends Component {
    state = {
        username: '',
        spotifyUsername: '',
        spotifyId: '',
        spotifyToken: '',
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

    scopesArr = [
        'user-read-currently-playing',
        'app-remote-control',
        'playlist-modify-public',
    ]
    scopes = this.scopesArr.join(' ');

    async getSpotifyCredentials() {
        const obj = {
            clientId: clientId,
            secret: clientSecret,
            redirectUri: AuthSession.getRedirectUrl(),
        };
        return obj;
    };

    getAuthorizationCode = async () => {
        // const credentials = await getSpotifyCredentials();

        const credentials = {
            clientId: clientId,
            secret: clientSecret,
        };;
        const redirectUrl = AuthSession.getRedirectUrl();
        const result = await AuthSession.startAsync({
            authUrl:
                'https://accounts.spotify.com/authorize' +
                '?response_type=code' +
                '&client_id=' +
                credentials.clientId +
                '&scope=' + encodeURIComponent(this.scopes) +
                '&redirect_uri=' + encodeURIComponent(redirectUrl)
        })
        console.log('result', result);
        return result.params.code;
    }

    // get auth token
    async getAccessToken() {
        console.log(1);
        const authorizationCode = await this.getAuthorizationCode();
        console.log(authorizationCode);
        console.log(this.getAuthorizationCode());
        const credentials = {
            clientId: clientId,
            secret: clientSecret,
            redirectUri: AuthSession.getRedirectUrl(),
        };
        // const credentialsToBase64 = base64.encode(`${credentials.clientId}:${credentials.secret}`);
        const credentialsToBase64 = 'NzYzYWNlZTk2M2IyNGI4NGE0YTM1ZDRhYjU4NzRiOTk6YTZiZjA5ZDAwNGJiNDBkMzg1MDc5YTM1ODU2ZGRlY2I='
        console.log(1.1)
        await fetch('https://accounts.spotify.com/api/token', {
            method: 'POST',
            headers: {
                Authorization: `Basic ${credentialsToBase64}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: `grant_type=authorization_code&code=${authorizationCode}&redirect_uri=${
                credentials.redirectUri}`,
        })
            .then(response => response.json())
            .then(data => {
                const retreivedData = data;
                console.log('data', data);
            })
        const {
            access_token: accessToken,
            refresh_token: refreshToken,
            expires_in: expiresIn,
        } = responseJson;
        const expirationTime = new Date().getTime() + expiresIn * 1000;
        await setUserData('accessToken', accessToken);
        await setUserData('refreshToken', refreshToken);
        await setUserData('expirationTime', expirationTime);
    }
    // create playlist
    // find a playlist
    // find a song
    // add items to to playlist
    // remove items from a playlist
    // get playback info (what's played, current tracks, skip, repeat, pause)
    render() {
        return (
            <OxContext.Provider value={{ ...this.state, getAccessToken: this.getAccessToken }}>
                {this.props.children}
            </OxContext.Provider>
        );
    }
}

export default OxContextProvider;