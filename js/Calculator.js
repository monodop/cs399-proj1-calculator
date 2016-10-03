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
            currentEquation: "17+32",
            isResult: false
        };
    }

    onSettingsClicked() {
        // TODO: Open Settings Menu
    }

    calculateResult(exp) {
        let res = null;
        if (exp === null || exp.length > 0) {
            try {
                eval("res=" + exp);
            } catch (e) {
                res = null;
            }
        }
        return res;
    }

    onCalcButtonClick(buttonName) {
        if (buttonName == "DEL") {
            if (this.state.currentEquation.includes("Infinity")) {
                this.setState({
                    currentEquation: "",
                    isResult: false
                });
            }
            else if (this.state.currentEquation.length > 0) {
                this.setState({
                    currentEquation: this.state.currentEquation.substring(0, this.state.currentEquation.length - 1),
                    isResult: false
                });
            }
        } else if (buttonName == "=") {
            let res = this.calculateResult(this.state.currentEquation);
            this.setState({
                currentEquation: res !== null ? res.toString() : "",
                isResult: true
            });
        } else if (buttonName == "C") {
            this.setState({
                currentEquation: "",
                isResult: false
            });
        } else {
            if (this.state.currentEquation.includes("Infinity")) {
                this.setState({
                    currentEquation: buttonName,
                    isResult: false
                });
            } else {
                this.setState({
                    currentEquation: this.state.currentEquation + buttonName,
                    isResult: false
                });
            }
        }
    }

    render() {

        let buttons = [
            "C",
            "(",
            ")",
            "DEL",
            "7",
            "8",
            "9",
            "*",
            "4",
            "5",
            "6",
            "/",
            "1",
            "2",
            "3",
            "+",
            "0",
            ".",
            "=",
            "-"
        ];

        return (
            <View style={styles.container}>
                <Icon.ToolbarAndroid
                    style={styles.toolbar}
                    title="Clackulator"
                    navIconName="bars"
                    onIconClicked={this.onSettingsClicked.bind(this)}
                />
                <CalcScreen
                    value={this.state.currentEquation}
                    isResult={this.state.isResult}
                    calcFunction={this.calculateResult.bind(this)}
                />
                <TouchableNativeFeedback>
                    <View style={styles.historyButton}>
                        <Text style={styles.historyButtonText}>History</Text>
                    </View>
                </TouchableNativeFeedback>
                <CalcButtons buttons={buttons} onClick={this.onCalcButtonClick.bind(this)} />
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