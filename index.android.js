/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, AppRegistry, Navigator } from 'react-native';
import Calculator from './js/Calculator';
import History from './js/History';

class cs399_proj1_calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            historyItems: [
                {
                    equation: "38+10",
                    result: "48"
                },
                {
                    equation: "100-50",
                    result: "50"
                }
            ]
        }
    }

    onScreenPush(screenName, navigator) {
        navigator.push({
            id: screenName
        });
    }

    onScreenPop(navigator) {
        navigator.pop();
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'history'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

    renderScene(route, navigator) {
        switch (route.id) {
            case "calc":
                return (
                    <Calculator
                        onSettings={this.onScreenPush.bind(this, "settings", navigator)}
                        onHistory={this.onScreenPush.bind(this, "history", navigator)}
                    />
                );
            case "settings":
                // TODO: render settings
                return (
                    <View>
                        <Text>404 Not Found</Text>
                    </View>
                );
            case "history":
                // TODO: render history
                return (
                    <History
                        historyItems={this.state.historyItems}
                        onBack={this.onScreenPop.bind(this, navigator)}
                    />
                );
        }
    }
}

AppRegistry.registerComponent('cs399_proj1_calculator', () => cs399_proj1_calculator);
