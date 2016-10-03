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
    ScrollView
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export class History extends Component {

    constructor(props) {
        super(props);
    }

    onBackClicked() {
        this.props.onBack();
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
                        return (
                            <View key={i} style={styles.row}>
                                <Text style={styles.equation}>{item.equation}</Text>
                                {item.result === null ? null :
                                    <Text style={styles.result}>{item.result}</Text>
                                }
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