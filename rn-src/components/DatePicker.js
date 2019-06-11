/**
 * @flow meekoma
 * 日期选择器
 */
'use strict';
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Animated,
    Dimensions,
    Platform,
    Text,
    DatePickerAndroid, DatePickerIOS, TouchableOpacity,
} from 'react-native'
import PropTypes from 'prop-types';
import {width, uW, isAppleX, safeAreaViewHeight} from '../utils/DeviceUtil'
import Modal from "react-native-modal";
import Colors from "../common/Colors";

class DatePicker extends PureComponent {
    static propTypes = {
        onDateSelected: PropTypes.func.isRequired,
    };

    static defaultProps = {};

    constructor(props) {
        super(props);
        this.state = {
            date: new Date(),
            pickerShow: false
        }
    }

    //进行创建时间日期选择器
    async showPicker() {
        if (Platform.OS == 'ios') {
            this.setState({
                pickerShow: true
            })
        } else {
            try {
                // let options={
                //     date: new Date(2020, 4, 25),
                // };
                // const {action, year, month, day} = await DatePickerAndroid.open(options);
                const {action, year, month, day} = await DatePickerAndroid.open(null);
                if (action !== DatePickerAndroid.dismissedAction) {
                    let timeStamp = new Date(year, month, day).getTime();
                    if (this.props.onDateSelected) {
                        this.props.onDateSelected(timeStamp)
                    }
                }
            } catch ({code, message}) {
                console.warn('Cannot open date picker', message);
            }
        }
    }

    _onDatechange = (date) => {
        this.setState({date: date})
    };

    _onDateSelected = () => {
        this.setState({pickerShow: false});
        let year = this.state.date.getFullYear();
        let day = this.state.date.getDate();
        let month = this.state.date.getMonth();
        let timeStamp = new Date(year, month, day).getTime();
        if (this.props.onDateSelected) {
            this.props.onDateSelected(timeStamp)
        }
    };

    render() {
        if (Platform.OS == 'ios') {
            return (
                <Modal isVisible={this.state.pickerShow} backdropOpacity={0.2} style={styles.modal}
                       onBackdropPress={() => this.setState({pickerShow: false})}>
                    <View style={styles.container}>
                        <Text style={styles.modal_title}>选择日期</Text>
                        <View style={{height: 1, borderBottomWidth: 1, borderBottomColor: Colors.borderColor}}/>
                        <View style={{flex: 1, justifyContent: 'center'}}>
                            <DatePickerIOS
                                date={this.state.date}
                                onDateChange={(date) => {
                                    this._onDatechange(date)
                                }}
                                mode='date'
                            />
                        </View>
                        {/*底部按钮*/}
                        <View style={{flexDirection: 'row', height: 40, alignSelf: 'flex-end', marginTop: 20}}>
                            <TouchableOpacity style={styles.modal_left} activeOpacity={0.7} onPress={() => {
                                this.setState({pickerShow: false})
                            }}>
                                <Text style={{color: Colors.themeColor, fontSize: 15,}}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.modal_right} onPress={() => {
                                this._onDateSelected()
                            }} activeOpacity={0.7}>
                                <Text style={{color: 'white', fontSize: 15,}}>确定</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )
        } else {
            return (
                <View>
                    {this.props.children}
                </View>
            );
        }

    }
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    container: {
        width: width,
        minHeight: isAppleX ? 820 * uW : 750 * uW,
        backgroundColor: 'white',
        paddingBottom: safeAreaViewHeight
    },
    modal_title: {
        fontSize: 17,
        color: Colors.themeColor,
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 15
    },
    modal_right: {
        flex: 1,
        backgroundColor: Colors.themeColor,
        justifyContent: 'center',
        alignItems: 'center'
    },
    modal_left: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderTopColor: Colors.borderColor,
        borderTopWidth: 1
    },
});
module.exports = DatePicker;