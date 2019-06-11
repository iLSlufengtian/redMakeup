/**
 * @flow
 * 按钮封装
 */
'use strict';
import React, {Component, PureComponent} from 'react';
import {Image, StyleSheet, TouchableOpacity, ImageBackground, Text} from 'react-native';
import {width,} from '../utils/DeviceUtil'
import * as Images from '../common/Images';
import PropTypes from 'prop-types';

class RoundButton extends PureComponent {
    static propTypes = {
        btnText: PropTypes.string.isRequired,
        onPress: PropTypes.func.isRequired,
    };
    static defaultProps = {};

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress} activeOpacity={0.8}>
                <ImageBackground style={[styles.bac, this.props.style]} resizeMode={"contain"}
                                 source={this.props.source ? this.props.source : Images.round_button}>
                    <Text style={styles.text}>{this.props.btnText}</Text>
                </ImageBackground>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    bac: {
        width: width - 30,
        height: 60,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: '#ffffff',
        fontSize: 15,
        alignSelf: 'center',
        marginBottom: 5
    },
});

module.exports = RoundButton;