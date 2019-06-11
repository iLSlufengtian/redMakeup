/**
 * @flow meekoma
 * 左边文字，右边输入框组件封装
 */
'use strict';
import React, {PureComponent} from 'react';
import {View, StyleSheet, TextInput, Text, Image, TouchableOpacity} from 'react-native';
import Colors from "../common/Colors";
import PropTypes from 'prop-types';

const ITEM_HEIGHT = 50;
class CustomTextInput extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        height: PropTypes.number,
        showSegment: PropTypes.bool,
        defaultValue: PropTypes.string,
        ContainerStyle: PropTypes.any,
        labelWidth: PropTypes.number,
        showErrIcon: PropTypes.bool,
        showRightIcon: PropTypes.bool,
        ref: PropTypes.string,
        placeholder: PropTypes.string,
        editable: PropTypes.bool,
        keyboardType: PropTypes.string,
        onChangeText: PropTypes.any,
        autoFocus: PropTypes.bool,
        secureTextEntry: PropTypes.bool,
        maxLength: PropTypes.number,
        multiline: PropTypes.bool,
        textInputStyle: PropTypes.any,
        rightContent: PropTypes.any,
    };
    static defaultProps = {
        labelWidth: 100,
        showErrIcon: true,
    };

    getHeight() {
        return (this.props.height) ? this.props.height : ITEM_HEIGHT;
    }

    focus() {
        if (this.refs && this.refs.textInput) {
            this.refs.textInput.focus();
        }
    }

    blur() {
        if (this.refs && this.refs.textInput) {
            this.refs.textInput.blur();
        }
    }

    render() {
        let props = this.props;

        let content = null;

        let height = this.getHeight();

        if (props.children) {
            content = (
                <View style={styles.rightContentWrapper}>
                    {props.children}
                </View>
            );
        }

        return (
            <View style={[styles.container, props.ContainerStyle]}>
                <View style={[styles.wrapper, props.showSegment ? styles.wrapperSegment : null, {height: height}]}>
                    <View style={[styles.leftWrapper, {width: props.labelWidth, height: height}]}>
                        <Text style={styles.text}>{props.text}</Text>
                    </View>
                    {props.showRightIcon ?
                        <TouchableOpacity onPress={() =>{if(props.onPress){props.onPress()}}} style={[styles.textInput, props.textInputStyle]}>
                                 <Text style={{color: props.value?'#7C7C7C':'#DDDDDD', fontSize: 14,marginLeft:0.5}}>{props.value?props.value:props.placeholder}</Text>
                        </TouchableOpacity>
                        :
                        <TextInput style={[
                            styles.textInput,
                            props.textInputStyle]}
                                   onChangeText={props.onChangeText}
                                   editable={props.editable}
                                   underlineColorAndroid="transparent"
                                   keyboardType={props.keyboardType}
                                   onSubmitEditing={props.onSubmitEditing}
                                   defaultValue={props.defaultValue}
                                   placeholder={props.placeholder}
                                   value={props.value}
                                   onBlur={props.onBlur}
                                   onFocus={props.onFocus}
                                   secureTextEntry={props.secureTextEntry}
                                   multiline={props.multiline}
                                   maxLength={props.maxLength}
                                   returnKeyType={props.returnKeyType || "done"}
                                   autoFocus={props.autoFocus}
                                   placeholderTextColor={Colors.placeholderColor}
                                   ref={"textInput"}
                                   clearButtonMode={'while-editing'}
                        />}
                    {content}
                </View>
            </View>
        );
    }
}

var styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        backgroundColor: 'white',
        alignItems: 'center',
        marginBottom: 0.5,
    },
    errContent: {
        color: 'green', paddingLeft: 10, paddingTop: 5, paddingBottom: 5, fontSize: 14, fontWeight: 'bold'
    },
    wrapper: {
        flex: 1,
        flexDirection: 'row',
        // paddingRight: 15,
        // height:50,
    },
    wrapperSegment: {
        borderBottomWidth: 0.5,
        borderBottomColor: 'green'
    },
    leftWrapper: {
        width: 150,
        justifyContent: 'center',
        // marginLeft: 15,
        // marginRight: 15,
        alignItems: 'flex-end',
        // backgroundColor:'yellow'
    },
    textInput: {
        fontSize: 12,
         marginLeft:2,
        flex: 1,
        justifyContent: 'center',
        paddingVertical: 0,
        borderWidth:1,
        borderColor:Colors.borderColor,
        // backgroundColor: 'yellow'
    },
    text: {
        fontSize: 12,
        color: '#333333',
        fontWeight:'500'
    },
    rightContentWrapper: {
        position: 'absolute',
        right: 0,
        alignSelf: 'center',
        // backgroundColor: 'red'
    }
});

module.exports = CustomTextInput;
