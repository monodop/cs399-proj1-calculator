/**
 * @providesModule
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    TouchableNativeFeedback,
    StyleSheet,
    Text,
    View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalcScreen from './Calculator/CalcScreen';
import CalcButtons from './Calculator/CalcButtons';

export class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentEquation: "17+32"
        };
    }

    onSettingsClicked() {
        // TODO: Open Settings Menu
    }

    render() {

        let buttons = [
            "(",
            ")",
            "DEL",
            "x",
            "7",
            "8",
            "9",
            "/",
            "4",
            "5",
            "6",
            "+",
            "1",
            "2",
            "3",
            "-",
            "0",
            ".",
            "(-)",
            "="
        ];

        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Clackulator"
                    navIconName="bars"
                    onIconClicked={this.onSettingsClicked.bind(this)}
                />
                <CalcScreen value={this.state.currentEquation}/>
                <TouchableNativeFeedback>
                    <View style={styles.historyButton}>
                        <Text style={styles.historyButtonText}>History</Text>
                    </View>
                </TouchableNativeFeedback>
                <CalcButtons buttons={buttons} />
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
    toolbar: {
        height: 56,
        backgroundColor: '#e9eaed'
    },
    historyButton: {
        backgroundColor: '#3D75DB',
        margin: 10,
        marginTop: 0,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center'
    },
    historyButtonText: {
        fontSize: 20
    }
});

export { CalcScreen, CalcButtons };
export default Calculator;