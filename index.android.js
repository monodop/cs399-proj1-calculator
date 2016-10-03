/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { View, Text, AppRegistry, Navigator } from 'react-native';
import Calculator from './js/Calculator';
import History from './js/History';

/**
 * Represents the entire app
 */
class cs399_proj1_calculator extends Component {

    constructor(props) {
        super(props);

        // Set the initial list of history items to an empty list
        this.state = {
            historyItems: []
        }
    }

    /**
     * Called when a screen should be pushed on to the navigation stack
     * @param screenName - The id of the screen
     * @param navigator - The navigator
     */
    onScreenPush(screenName, navigator) {
        navigator.push({
            id: screenName
        });
    }

    /**
     * Called when a screen should be popped from the navigation stack
     * @param navigator - The navigator
     */
    onScreenPop(navigator) {
        navigator.pop();
    }

    /**
     * Called when a history item should be added to the list of items
     * @param equation - The equation that was entered
     * @param result - The result
     */
    onAddHistoryItem(equation, result) {
        let items = this.state.historyItems;

        // Add the item to the beginning of the list
        items.unshift({
            equation: equation,
            result: result
        });

        // Update the state
        this.setState({
            historyItems: items
        });
    }

    /**
     * Render the app
     */
    render() {
        // Simply divert the rendering to renderScene()
        return (
            <Navigator
                initialRoute={{id: 'calc'}}
                renderScene={this.renderScene.bind(this)}
            />
        );
    }

    /**
     * Decide which root level component to render depending on which screen is currently being accessed
     * @param route - The route to render
     * @param navigator - The navigator
     */
    renderScene(route, navigator) {
        switch (route.id) {
            // Render the calculator
            case "calc":
                return (
                    <Calculator
                        onHistory={this.onScreenPush.bind(this, "history", navigator)}
                        onHistoryItemAdded={this.onAddHistoryItem.bind(this)}
                    />
                );
            // Render the history screen
            case "history":
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
