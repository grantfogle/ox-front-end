import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native'

class Login extends Component {

    showText() {
        console.log('cats')
    }

    render() {

        const { background, text } = styles;
        return (
            <View style={background}>
                {this.showText()}
                <Text style={text}>Cats Login Here</Text>
            </View>
        );
    }
}

export default Login;

const styles = StyleSheet.create({
    background: {
        flex: 1,
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        height: 40,
        width: 100,
        fontSize: 20,
        color: '#000'
    }
})