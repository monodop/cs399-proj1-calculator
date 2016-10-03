
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
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{displayText}</Text>
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
    }
});

export default CalcScreen;