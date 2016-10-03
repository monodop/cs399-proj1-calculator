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

export class History extends Component {

    constructor(props) {
        super(props);

        this.onBackClickedEH = this.onBackClicked.bind(this);
    }

    componentDidMount() {
        BackAndroid.addEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    componentWillUnmount() {
        BackAndroid.removeEventListener("hardwareBackPress", this.onBackClickedEH);
    }

    onBackClicked() {
        this.props.onBack();
        return true;
    }

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