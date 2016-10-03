/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    View,
    ScrollView,
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

/**
 * Displays the history screen in the calculator app
 */
export class History extends Component {

    constructor(props) {
        super(props);

        // An event handler for the back button clicked - used by the component mounting and unmounting callbacks
        this.onBackClickedEH = this.onBackClicked.bind(this);
    }

    /**
     * Called when the component has completed mounting - Start listening for back button presses (to exit the screen)
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called before the component unmounts - Stop listening for back button presses (to exit the screen)
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    /**
     * Called when the back button has been pressed: either hardware back or the back button on the toolbar
     * @returns {boolean}
     */
    onBackClicked() {
        this.props.onBack();
        return true;
    }

    /**
     * Render the component
     */
    render() {
        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Clackulator - History"
                    navIconName="arrow-left"
                    onIconClicked={this.onBackClicked.bind(this)}
                />
                <ScrollView>
                    {this.props.historyItems.map(function(item, i) {
                        let result = item.result;
                        if (result === null)
                            result = "Syntax Error";
                        else if (result.toString().includes("Infinity"))
                            result = "Error: Division by zero";
                        return (
                            <View key={i} style={styles.row}>
                                <Text style={styles.equation}>{item.equation}</Text>
                                <Text style={styles.result}>{result}</Text>
                            </View>
                        );
                    })}
                </ScrollView>
            </View>
        );
    }
}

History.propTypes = {
    historyItems: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
    onBack: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'stretch',
        backgroundColor: '#F5FCFF',
    },
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    row: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#666666'
    },
    equation: {
        fontSize: 25,
        marginRight: 10
    },
    result: {
        fontSize: 15,
        marginRight: 10
    }
});

export default History;