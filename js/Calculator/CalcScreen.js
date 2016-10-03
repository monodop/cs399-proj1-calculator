
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
        let evald = " ";
        if (this.props.value.length > 0) {
            try {
                eval("evald=" + this.props.value);
            } catch (e) {
                evald=" ";
            }
        }
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{displayText}</Text>
                <Text style={styles.preview}>{evald}</Text>
            </View>
        );
    }
}
CalcScreen.propTypes = {
    value: React.PropTypes.string.isRequired
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