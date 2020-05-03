import React from 'react';
import { Actions } from 'react-native-router-flux';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';

const Start = () => {
    return (
        <View style={styles.container}>
            <Text>Start a Party</Text>
        </View>
    )
}

export default Start;

const styles = {
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
};