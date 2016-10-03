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
    BackAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import CalcScreen from './Calculator/CalcScreen';
import CalcButtons from './Calculator/CalcButtons';
import Sound from 'react-native-sound';

export class Calculator extends Component {

    constructor(props) {
        super(props);

        this.state = {
            currentEquation: "",
            isResult: false
        };

        this.clackSound = new Sound('keyboard_clack.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                // TODO: Do something?
                console.log("Unable to load keyboard clack.");
            }
        });
        this.clackSound.setVolume(1.0);
    }

    componentWillMount() {
        this.listenForBackButton();
    }

    componentWillUnmount() {
        this.stopListeningForBackButton();
    }

    listenForBackButton() {
        BackAndroid.addEventListener("hardwareBackPress", BackAndroid.exitApp);
    }
    stopListeningForBackButton() {
        BackAndroid.removeEventListener("hardwareBackPress", BackAndroid.exitApp);
    }

    onHistoryClicked() {
        this.props.onHistory();
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

        this.clackSound.play((success) => {
            if (!success) {
                console.log("Unable to play keyboard clack sound.");
            }
        });

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
            this.props.onHistoryItemAdded(this.state.currentEquation, res);
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
            } else if (this.state.isResult && (buttonName == "." || /^\d$/.test(buttonName))) {
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
                />
                <CalcScreen
                    value={this.state.currentEquation}
                    isResult={this.state.isResult}
                    calcFunction={this.calculateResult.bind(this)}
                />
                <TouchableNativeFeedback onPress={this.onHistoryClicked.bind(this)}>
                    <View style={styles.historyButton}>
                        <Text style={styles.historyButtonText}>History</Text>
                    </View>
                </TouchableNativeFeedback>
                <CalcButtons buttons={buttons} onClick={this.onCalcButtonClick.bind(this)} />
            </View>
        );
    }
}

Calculator.propTypes = {
    onHistory: React.PropTypes.func.isRequired,
    onHistoryItemAdded: React.PropTypes.func.isRequired
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
    historyButton: {
        backgroundColor: '#3D75DB',
        margin: 10,
        marginTop: 0,
        marginBottom: 5,
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