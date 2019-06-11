/**
 * @flow meekoma
 * 加载view
 */
"use strict";
import React, {Component, PureComponent} from 'react';
import {
    Platform,
    View,
    ActivityIndicator,
    Modal,
} from 'react-native';
import PropTypes from 'prop-types';

class LoadingView extends PureComponent {
    static propTypes = {
        hide: PropTypes.bool,
    };

    constructor(props) {
        super(props);
        this.state = {
            modalVisible: false,
        }
    }

    hide() {
        if (Platform.OS === 'android') {
            setTimeout(() => {
                this.setState({modalVisible: false});
            }, 1000)
        } else {
            this.setState({modalVisible: false});
        }
    }

    show() {
        this.setState({modalVisible: true});
    }

    render() {
        if (!this.state.modalVisible) {
            return null
        }
        return (
            <Modal
                animationType={"none"}
                transparent={true}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                }}
            >
                <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <View style={{
                        borderRadius: 10,
                        backgroundColor: 'rgba(0,0,0,0.5)',
                        width: 100,
                        height: 100,
                        alignItems: 'center'
                    }}>
                        <ActivityIndicator
                            animating={true}
                            color='white'
                            style={{
                                marginTop: 20,
                                width: 60,
                                height: 60,
                            }}
                            size="large"/>
                    </View>
                </View>
            </Modal>
        );
    }
}
module.exports = LoadingView;
