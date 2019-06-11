/**
 * @flow
 * 筛选组件
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
    StyleSheet, ScrollView, DatePickerAndroid,
} from 'react-native';
import * as Images from '../common/Images';
import {width, uW, isAppleX, safeAreaViewHeight} from '../utils/DeviceUtil'
import Colors from "../common/Colors";
import SceneUtil from '../utils/SceneUtil';
import Util from '../utils/Util';
import Modal from "react-native-modal";
import DatePicker from './DatePicker';


class FilterModal extends Component {
    static propTypes = {
        defaultArr: PropTypes.array,
        deviceArr: PropTypes.array,
        showConfiguration: PropTypes.array,//显示选项
        onFilter:PropTypes.func.isRequired,

    };

    static defaultProps = {
        showConfiguration: ["default", "devices", "time"],
        defaultArr:[],
        deviceArr:[],

    };

    constructor(props) {
        super(props);

        this.state = {
            modalShow: false,
            selectedDefaultIndex: 0,
            selectedDeviceIndex: -1,

            start: null,
            startTimeStamp: null,
            end: null,
            endTimeStamp: null,
        };
        this.type = null;
        console.log(this.props)
    }

    open = () => {
        this.setState({
            modalShow: true
        })
    };

    pressDefault = (item, i) => {
        this.setState({
            selectedDefaultIndex: i
        })
    };

    pressDevice = (item, i) => {
        this.setState({
            selectedDeviceIndex: i
        })
    };

    pressStartTime = () => {
        this.datePicker.showPicker();
        this.type = "start"
    };

    pressEndTime = () => {
        this.datePicker.showPicker();
        this.type = "end"
    };

    onDateSelected = (timeStamp) => {
        if (this.type == "start") {
            this.setState({
                start: Util.dateFtd("yyy-MM-dd", timeStamp),
                startTimeStamp: timeStamp,
            });
        }
        if (this.type == "end") {
            this.setState({
                end: Util.dateFtd("yyy-MM-dd", timeStamp),
                endTimeStamp: timeStamp,
            });
        }
    };

    reset=()=>{
        this.setState({
            selectedDefaultIndex: 0,
            selectedDeviceIndex: -1,

            start: null,
            startTimeStamp: null,
            end: null,
            endTimeStamp: null,
        })
    };

    filter=()=>{
        if(this.props.onFilter){
            let params={};
            if(this.state.selectedDeviceIndex !=-1){
                params.monitorTarget=this.props.deviceArr[this.state.selectedDeviceIndex].label
            }
            if(this.state.startTimeStamp){
                params.startTime=this.state.startTimeStamp
            }
            if(this.state.endTimeStamp){
                params.endTime=this.state.endTimeStamp
            }
            this.setState({modalShow: false});
            this.props.onFilter(this.state.selectedDefaultIndex,params);
        }
    };
    //默认选择
    renderDefault = () => {
        if (this.props.defaultArr.length == 0 || (this.props.showConfiguration.indexOf("default") == -1)) {
            return (
                <View/>
            )
        }
        let def = this.props.defaultArr.map((item, i) => {
            let marginRight = {marginRight: ((i + 1) % 4 == 0 && i != 0) ? 0 : 10};
            let bacColor = this.state.selectedDefaultIndex == i ? Colors.themeColor : "white";
            let textColor = this.state.selectedDefaultIndex == i ? "white" : Colors.themeColor;
            return (
                <TouchableOpacity key={i} onPress={() => {
                    this.pressDefault(item, i)
                }} activeOpacity={0.7} style={[styles.modal_labelWrapper, marginRight, {
                    marginBottom: 10,
                    backgroundColor: bacColor
                }]}>
                    <Text style={{color: textColor, fontSize: 13}} >{item.label}</Text>
                </TouchableOpacity>
            )
        });

        return (
            <View>
                <Text style={[styles.modal_label, {marginTop: 15,}]}>默认显示</Text>
                <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                    {def}
                </View>
            </View>
        )
    };

    //设备选择
    renderDevices = () => {
        if (this.props.deviceArr.length == 0 || (this.props.showConfiguration.indexOf("devices") == -1)) {
            return (
                <View/>
            )
        }
        let devices = this.props.deviceArr.map((item, i) => {
            let marginRight = {marginRight: ((i + 1) % 4 == 0 && i != 0) ? 0 : 10};
            let bacColor = this.state.selectedDeviceIndex == i ? Colors.themeColor : "white";
            let textColor = this.state.selectedDeviceIndex == i ? "white" : Colors.themeColor;
            return (
                <TouchableOpacity key={i} onPress={() => {
                    this.pressDevice(item, i)
                }} activeOpacity={0.7}>
                    <View
                        style={[styles.modal_labelWrapper, marginRight, {marginBottom: 10, backgroundColor: bacColor}]}>
                        <Text style={{color: textColor, fontSize: 13,marginLeft:3}} numberOfLines={1}>{item.label}</Text>
                    </View>
                </TouchableOpacity>
            )
        });

        return (
            <View>
                <Text style={styles.modal_label}>设备</Text>
                <ScrollView contentContainerStyle={{maxHeight: isAppleX ? 190 : 100}}
                            automaticallyAdjustContentInsets={true}>
                    <View style={{flexDirection: 'row', flexWrap: 'wrap',}}>
                        {devices}
                    </View>
                </ScrollView>
            </View>
        )
    };

    //时间选择
    renderTime = () => {
        return (
            <View>
                <Text style={[styles.modal_label, {marginTop: 10,}]}>时间</Text>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <TouchableOpacity style={styles.modal_timeWrapper} onPress={() => {
                        this.pressStartTime()
                    }} activeOpacity={0.8}>
                        <Text style={{
                            color: this.state.start ? Colors.themeColor : Colors.placeholderColor2,
                            fontSize: 12,
                        }}>{this.state.start ? this.state.start : "开始时间"}</Text>
                        <Image source={Images.home_date} style={{width: 16, height: 15}}
                               resizeMode="contain"/>
                    </TouchableOpacity>
                    <View style={styles.modal_line}/>
                    <TouchableOpacity style={styles.modal_timeWrapper} onPress={() => {
                        this.pressEndTime()
                    }} activeOpacity={0.8}>
                        <Text style={{
                            color: this.state.end ? Colors.themeColor : Colors.placeholderColor2,
                            fontSize: 12,
                        }}>{this.state.end ? this.state.end : "结束时间"}</Text>
                        <Image source={Images.home_date} style={{width: 16, height: 15}}
                               resizeMode="contain"/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    };

    render() {
        return (
            <Modal isVisible={this.state.modalShow} backdropOpacity={0.2} style={styles.modal}
                   onBackdropPress={() => this.setState({modalShow: false})}>
                <View style={styles.container}>
                    <Text style={styles.modal_title}>筛选</Text>
                    <View style={{height: 1, borderBottomWidth: 1, borderBottomColor: Colors.borderColor}}/>
                    <View style={{flex: 1, marginLeft: 40, marginRight: 40,}}>
                        {this.renderDefault()}
                        {this.renderDevices()}
                        {this.renderTime()}
                    </View>
                    {/*底部按钮*/}
                    <View style={{flexDirection: 'row', height: 40, alignSelf: 'flex-end', marginTop: 20}}>
                        <TouchableOpacity style={styles.modal_left} onPress={() => {
                            this.reset()
                        }} activeOpacity={0.8}>
                            <Text style={{color: Colors.themeColor, fontSize: 15,}}>重置</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modal_right}  onPress={() => {
                            this.filter()
                        }} activeOpacity={0.8}>
                            <Text style={{color: 'white', fontSize: 15,}}>确定</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <DatePicker ref={r => {
                    this.datePicker = r
                }} onDateSelected={(time) => {
                    this.onDateSelected(time)
                }}/>
            </Modal>
        );
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
    modal_label: {
        fontSize: 15,
        color: Colors.mainText,
        // marginTop: 20,
        marginBottom: 15,
    },
    modal_labelWrapper: {
        width: uW * 128,
        height: uW * 46,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 1,
        borderColor: Colors.themeColor,
        borderRadius: 3,
    },
    label_text: {
        textAlign: 'center',
    },
    modal_timeWrapper: {
        width: 184 * uW,
        height: 52 * uW,
        borderWidth: 1,
        borderColor: Colors.themeColor,
        justifyContent: 'space-around',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: 3,
    },
    modal_line: {
        width: 20,
        height: 0.5,
        borderWidth: 1,
        borderColor: Colors.themeColor,
        marginLeft: 5,
        marginRight: 5
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
module.exports = FilterModal;