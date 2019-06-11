/**
 * @flow meekoma
 * 自定义标题栏，灵活自由
 */
"use strict";
import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {
    Text,
    View,
    Image,
    StatusBar,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import * as Images from '../common/Images';
import {width, uW, titleHeight, statusBarHeight} from '../utils/DeviceUtil'
import Colors from "../common/Colors";
import SceneUtil from '../utils/SceneUtil';

class TitleBar extends PureComponent {
    static propTypes = {
        title: PropTypes.string.isRequired,
        hideLeftArrow: PropTypes.bool,
        pressLeft: PropTypes.func,
        pressRight: PropTypes.func,
        left: PropTypes.string,
        backgroundColor: PropTypes.string,
        titleColor: PropTypes.string,
        right: PropTypes.oneOfType([
            PropTypes.string,
            PropTypes.object,
        ]),
        rightImage: Image.propTypes.source,
        LeftImage: Image.propTypes.source,
        statusBarBgColor: PropTypes.string,
        barStyle: PropTypes.string,
    };

    static defaultProps = {
        title: "",
        hideLeftArrow: true,
    };

    back() {
        if (this.props.pressLeft) {
            this.props.pressLeft();
            return
        }
        SceneUtil.goBack();
    };

    render() {
        const {backgroundColor, titleColor} = this.props;
        return (
            <View style={[TitleStyle.titleBar, backgroundColor ? {backgroundColor: backgroundColor} : null]}>
                <StatusBar
                    backgroundColor={this.props.statusBarBgColor || "transparent"}
                    barStyle={this.props.barStyle || 'light-content'}
                    translucent={true}
                    // networkActivityIndicatorVisible={true}
                />
                <View style={TitleStyle.statusBar}/>

                <View style={TitleStyle.titleBarContent}>
                    {this.renderLeft() }
                    <View style={TitleStyle.middle}>
                        <Text numberOfLines={1}
                              style={[TitleStyle.middleTitle, titleColor ? {color: titleColor} : null]}>{this.props.title}</Text>
                    </View>
                    {this.renderRight()}
                </View>
            </View>
        );
    }

    renderLeft() {
        if(this.props.hideLeftArrow){
            return( <View style={TitleStyle.left}/>)
        }
        return(
            <TouchableOpacity activeOpacity={1} onPress={this.back.bind(this)}
                              style={TitleStyle.left}>
                <Image style={TitleStyle.titleLeftImage}
                       source={this.props.LeftImage || Images.btn_back}/>
                <Text style={TitleStyle.leftText}>{this.props.left}</Text>
            </TouchableOpacity>
        )
    }

    renderRight() {
        if (!this.props.right && !this.props.rightImage) {
            return <View style={TitleStyle.right}/>
        }
        return (
            <TouchableOpacity activeOpacity={1} style={TitleStyle.right}
                              onPress={() => {
                                  this.props.pressRight()
                              }}>
                {typeof this.props.right == 'object' ? (this.props.right) : (
                    <Text style={TitleStyle.rightText}>{this.props.right}</Text>
                )}
                {this.props.rightImage ? (
                    <Image style={TitleStyle.rightImage} source={this.props.rightImage}/>
                ) : (null)}
            </TouchableOpacity>
        )
    }
}

const TitleStyle = StyleSheet.create({
    titleBar: {
        width: width,
        height: titleHeight,
        backgroundColor: Colors.themeColor,
    },
    titleBarContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        justifyContent: 'space-between',
        height: titleHeight - statusBarHeight,
    },
    titleBarSearchContent: {
        flexDirection: 'row',
        alignItems: 'center',
        width: width,
        height: titleHeight - statusBarHeight,
    },
    left: {
        width: uW * 180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingLeft: uW * 10,
    },
    middle: {
        width: width - uW * 360,
        height: titleHeight,
        justifyContent: 'center',
        alignItems: 'center',
    },
    middleTitle: {
        fontSize: uW * 34,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },

    right: {
        width: uW * 180,
        height: titleHeight,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: uW * 30,
    },

    leftText: {
        fontSize: uW * 30,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },

    rightText: {
        fontSize: uW * 30,
        color: "white",
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightImage: {
        width: uW * 40,
        height: uW * 40,
        resizeMode: 'contain',
        marginLeft: uW * 5
    },

    titleLeftImage: {
        width: uW * 50,
        height: uW * 35,
        marginRight: uW * 5,
        resizeMode: 'contain'
    },

    homeTitleIcon: {
        width: uW * 213,
        height: uW * 52,
        resizeMode: 'stretch'
    },
    titleRightImage: {
        width: uW * 65,
        height: uW * 65,
        resizeMode: 'contain'
    },
    statusBar: {
        width: width,
        height: statusBarHeight,
        // backgroundColor: 'pink'
    }
});
module.exports = TitleBar;