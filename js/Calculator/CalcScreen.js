
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export class CalcScreen extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        let displayText = this.props.value;
        if (this.props.isResult && displayText.length == 0) {
            displayText = "Syntax Error";
        } else if (displayText.includes("Infinity")) {
            displayText = "Error: Division by zero";
        }
        let evald = this.props.calcFunction(this.props.value);
        if (evald === null) {
            evald = " ";
        }
        if (evald.toString().includes("Infinity")) {
            evald = "Error: Division by zero";
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{displayText}</Text>
                {this.props.isResult ? null :
                    <Text style={styles.preview}>{evald}</Text>
                }
            </View>
        );
    }
}
CalcScreen.propTypes = {
    value: React.PropTypes.string,
    isResult: React.PropTypes.bool.isRequired,
    calcFunction: React.PropTypes.func.isRequired
};

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'flex-end',
        backgroundColor: '#8AEBEB',
        margin: 10,
        height: 100
    },
    text: {
        marginRight: 20,
        fontSize: 30
    },
    preview: {
        marginRight: 20,
        fontSize: 20
    }
});

export default CalcScreen;