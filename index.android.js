/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry } from 'react-native';
import Calculator from './js/Calculator';

class cs399_proj1_calculator extends Component {
    render() {
        return (
            <Calculator/>
        );
    }
}

AppRegistry.registerComponent('cs399_proj1_calculator', () => cs399_proj1_calculator);
