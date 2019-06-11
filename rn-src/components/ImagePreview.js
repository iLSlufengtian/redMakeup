/**
 * @flow
 * 按钮封装
 */
'use strict';
import React, {Component, PureComponent} from 'react';
import {Image, StyleSheet, TouchableOpacity, ImageBackground, Text, Modal} from 'react-native';
import {width, height} from '../utils/DeviceUtil'
import * as Images from '../common/Images';
import PropTypes from 'prop-types';

class ImagePreview extends PureComponent {

    static propTypes = {
        url: PropTypes.string,
        modalShow: PropTypes.bool,
    };
    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
            url:null
        }
    }

    show = (url) => {
        this.setState({
            modalShow: true,
            url:url
        })
    };

    hide = () => {
        this.setState({
            modalShow: false
        })
    };

    render() {
        return (
            <Modal
                visible={this.state.modalShow}
                transparent={true}
                onRequestClose={() => this.setState({modalShow: false})}>
                <TouchableOpacity onPress={()=>{
                    this.setState({modalShow: false})
                }} style={{flex:1,backgroundColor:'rgba(0,0,0,0.8)'}}>
                    <Image style={{width: width, height: height}} resizeMode={"contain"}
                       source={{uri:this.state.url}}/>
                </TouchableOpacity>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({});

module.exports = ImagePreview;