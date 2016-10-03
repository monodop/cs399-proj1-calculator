
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';

export class CalcButtons extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let rows = [];
        let count = 0;
        let row = [];
        for (let i = 0; i < this.props.buttons.length; i++) {
            let button = this.props.buttons[i];
            row.push(button);
            count++;
            if (count == 4) {
                rows.push(row);
                row = [];
                count = 0;
            }
        }

        return (
            <View style={styles.container}>
                {rows.map(function(row, i) {
                    return (
                        <View key={i} style={styles.row}>
                            {row.map(function(button) {
                                let buttonStyle = {
                                    flex: 1,
                                    backgroundColor: '#bbbbbb',
                                    margin: 5,
                                    justifyContent: 'center',
                                    alignItems: 'center'
                                };
                                if (button == '=') {
                                    buttonStyle.backgroundColor = '#3D75DB';
                                }
                                return (
                                    <View key={button} style={buttonStyle}>
                                        <Text style={styles.buttonText}>{button}</Text>
                                    </View>
                                );
                            })}
                        </View>
                    );
                })}
            </View>
        );
    }
}
CalcButtons.propTypes = {
    buttons: React.PropTypes.arrayOf(React.PropTypes.string).isRequired
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        margin: 5,
        marginTop: 0,
        flexDirection: 'column'
    },
    row: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'stretch',
        flexDirection: 'row'
    },
    buttonText: {
        fontSize: 20,
    }
});

export default CalcButtons;