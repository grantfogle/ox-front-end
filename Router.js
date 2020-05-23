import React from 'react';
import { Scene, Router, Stack, Actions } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';
import Login from './components/login/Login';
import Start from './components/start/Start';
import CreatePlaylist from './components/playlist/CreatePlaylist';
import FindPlaylist from './components/playlist/FindPlaylist';
import PlaylistHome from './components/playlist/PlaylistHome';
import SearchResults from './components/playlist/search/SearchResults';

const RouterComponent = () => {
    return (
        <Router>
            <Stack key="root">
                <Scene key="login" hideNavBar={true} component={Login} title="Login/Signup" initial />
                <Scene key="start" component={Start} title="Start/Find a Playlist" />
                <Scene key="createPlaylist" component={CreatePlaylist} title="Create Playlist" />
                <Scene key="findPlaylist" component={FindPlaylist} title="Find a Playlist" />
                <Scene key="playlistHome" component={PlaylistHome} title="Playlist" />
                <Scene key="searchResults" component={SearchResults} title="Search Results" />
            </Stack>
        </Router>
    )
}

export default RouterComponent;