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
            historyItems: []
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

    onAddHistoryItem(equation, result) {
        let items = this.state.historyItems;
        items.push({
            equation: equation,
            result: result
        });
        this.setState({
            historyItems: items
        });
    }

    render() {
        return (
            <Navigator
                initialRoute={{id: 'calc'}}
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
                        onHistoryItemAdded={this.onAddHistoryItem.bind(this)}
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
