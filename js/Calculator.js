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

/**
 * Represents the overall calculator screen
 */
export class Calculator extends Component {

    constructor(props) {
        super(props);

        // Set the initial state of the component
        this.state = {
            currentEquation: "",
            isResult: false
        };

        // Preload the clack sound effect so it does not have a delay when playing
        this.clackSound = new Sound('keyboard_clack.wav', Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                // TODO: Do something?
                console.log("Unable to load keyboard clack.");
            }
        });
        this.clackSound.setVolume(1.0);
    }

    /**
     * Called when the component has completed mounting - Listens for back button presses to exit the app
     */
    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", BackAndroid.exitApp);
    }

    /**
     * Called before the component unmounts - Stops listening for back button presses
     */
    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", BackAndroid.exitApp);
    }

    /**
     * Called when the history button has been pressed
     */
    onHistoryClicked() {
        this.props.onHistory();
    }

    /**
     * Calculates the result of an expression
     * @param exp - The expression to calculate
     * @returns {*} - The result
     */
    calculateResult(exp) {
        let res = null;
        if (exp !== null && exp.length > 0) {
            try {
                eval("res=" + exp);
            } catch (e) {
                res = null;
            }
        }
        return res;
    }

    /**
     * Called when a button on the calculator has been pressed
     * @param buttonName - The button that was pressed
     */
    onCalcButtonClick(buttonName) {

        // Play a sound
        this.clackSound.play((success) => {
            if (!success) {
                console.log("Unable to play keyboard clack sound.");
            }
        });

        if (buttonName == "DEL") {
            // If the user pressed the delete button...
            if (this.state.currentEquation.includes("Infinity")) {
                // And the current equation contains infinity, then delete everything
                this.setState({
                    currentEquation: "",
                    isResult: false
                });
            }
            else if (this.state.currentEquation.length > 0) {
                // Otherwise, delete the last character in the equation
                this.setState({
                    currentEquation: this.state.currentEquation.substring(0, this.state.currentEquation.length - 1),
                    isResult: false
                });
            }
        } else if (buttonName == "=") {
            // If the user pressed the equals button, then calculate the result and add it to the history list.
            // Then, set the result and indicate that the current equation is the result
            let res = this.calculateResult(this.state.currentEquation);
            this.props.onHistoryItemAdded(this.state.currentEquation, res);
            this.setState({
                currentEquation: res !== null ? res.toString() : "",
                isResult: true
            });
        } else if (buttonName == "C") {
            // If the user pressed the clear button, then clear the current equation
            this.setState({
                currentEquation: "",
                isResult: false
            });
        } else {
            // Otherwise...
            if (this.state.currentEquation.includes("Infinity")) {
                // If the current equation includes infinity, then set the equation to the button that was pressed
                this.setState({
                    currentEquation: buttonName,
                    isResult: false
                });
            } else if (this.state.isResult && (buttonName == "." || /^\d$/.test(buttonName))) {
                // Or, if the current equation is a result, and the button was a digit or decimal, then clear the equation
                // and replace it with the button that was pressed
                this.setState({
                    currentEquation: buttonName,
                    isResult: false
                });
            } else {
                // Otherwise, append the button that was pressed
                this.setState({
                    currentEquation: this.state.currentEquation + buttonName,
                    isResult: false
                });
            }
        }
    }

    /**
     * Render the component
     */
    render() {

        // Define the buttons in the button grid
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

        // Render the calculator
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