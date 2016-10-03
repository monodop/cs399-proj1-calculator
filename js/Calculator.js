/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome'

export class Calculator extends Component {

    onSettingsClicked() {
        // TODO: Open Settings Menu
    }

    render() {
        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Clackulator"
                    navIconName="bars"
                    onIconClicked={this.onSettingsClicked}
                />
                <Text style={styles.welcome}>
                    Welcome to React Native! Hello, I am harrison!
                </Text>
                <Text style={styles.instructions}>
                    To get started, edit index.android.js
                </Text>
                <Text style={styles.instructions} onClick={this.onClick}>
                    Double tap R on your keyboard to reload,{'\n'}
                    Shake or press menu button for dev menu
                </Text>
                <Text style={styles.annoying}>
                    Check out my sick calculator!
                </Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
    annoying: {
        textAlign: 'right',
        color: '#000000',
        marginBottom: 5,
        backgroundColor: '#ff0000',
        padding: 100
    },
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    }
});

export default Calculator;