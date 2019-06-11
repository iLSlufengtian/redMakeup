/**
 * @flow
 * 灭菌异常
 */
'use strict';
import React, {PureComponent,Component} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableNativeFeedback,
    Dimensions,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Linking,
    ScrollView,
    RefreshControl,
    AppState,
    TouchableHighlight,
    InteractionManager,
    DeviceEventEmitter, Animated, ImageBackground, Image, FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import SceneUtil from '../../utils/SceneUtil';
import TitleBar from "../../components/TitleBar";
import {width, uW, isAppleX, safeAreaViewHeight} from '../../utils/DeviceUtil'
import Util from "../../utils/Util";
import Echarts from 'native-echarts';
import Colors from "../../common/Colors";
import * as Images from "../../common/Images";
import FilterModal from "../../components/FilterModal";
import RefreshFlatList from "../../components/RefreshFlatList";

const {readEvent} = require('../../actions/index');
const TimerMixin = require('react-timer-mixin');
const ITEM_HEIGHT = 280;

class Abnormal extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            defaultArr: [{label: "全部", id: -1}, {label: "已读", id: 0}, {label: "未读", id: 1}],
            deviceArr:[],

        };
    }

    componentDidMount() {
        let that = this;
        InteractionManager.runAfterInteractions(() => {

        });
    }

    onFilter = (defaultType, para) => {


    };

    _reloadFetchConfig() {
        return {
            url: 'queryEvents',
            method: 'get',
            params: {
                departmentId: this.props.userInfo ? this.props.userInfo.departmentId : "",
                eventTypeId: 12,
            }
        };
    };

    setData=(datas)=>{
        let that=this;
        if(datas.length>0){
            let arr=[];
            datas.forEach((item) => {
                arr.push({label:item.event?item.event.device:"",id:item.event?item.event.monitoringTargetId:0})
            });

            that.setState(Object.assign({}, this.state, {
                deviceArr:arr
            }));
        }
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"灭菌异常"} hideLeftArrow={false}/>
                <RefreshFlatList
                    style={{flex: 1, marginTop: 15,}}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={this._getItemLayout}
                    name="listview"
                    setData={(data)=>{this.setData(data)}}
                    reloadFetchConfig={() => this._reloadFetchConfig()}
                    renderItem={({item, index}) => <Item data={item} index={index} dispacth={this.props.dispatch}/>}
                />
                {/*read={(id,isRead)=>{this.read(id, isRead)}}*/}
                <FilterModal ref={r => {
                    this.filterModal = r
                }} onFilter={(defaultType, params) => {
                    this.onFilter(defaultType, params)
                }} defaultArr={this.state.defaultArr} deviceArr={this.state.deviceArr}/>

                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', right: 0, bottom: 40}}
                                  onPress={() => {
                                      this.filterModal.open()
                                  }}>
                    <Image style={{width: 137 * uW, height: 83 * uW}} source={Images.record_filter}></Image>
                </TouchableOpacity>
            </View>
        )
    }

    _keyExtractor = (item, index) => index + '';
    _getItemLayout = (data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    );

}

class Item extends PureComponent {

    constructor(props) {
        super(props);
        this.state = {
            isRead: this.props.data.event.isRead,
        };
    }

    read(id, isRead) {
        if(isRead==1){
            return;
        }
        let params = {
            id:id,
        };
        if( this.props.dispacth){
            let promise = this.props.dispacth(readEvent(params));
            promise.then((res) => {
                if(res){
                    this.setState({
                        isRead:1,
                    })
                }
            }).catch((err) => {
                if (err) Util.showToast(err.message)
            });
        }
    }


    render() {
        let data = this.props.data;
        if (data && data.data) {
            let timeData = [], tempData = [], preData = [];

            let timeSlots = data.data.timeSlots;
            if (timeSlots && timeSlots.length > 0) {
                timeSlots.map((item, index) => {
                    timeData.push(Util.dateFtk("MM-dd hh:mm:ss", item));

                    if (data.data.startTime == item) {
                        console.log("开始相等")
                    }
                    if (data.data.endTime == item) {
                        console.log("结束相等")
                    }
                });
            }

            let temps = data.data.telemetryAggregatedData[0];
            if (temps && temps.valueSeries && temps.valueSeries.length > 0) {
                tempData = temps.valueSeries;
            }

            let pres = data.data.telemetryAggregatedData[1];
            if (pres && pres.valueSeries && pres.valueSeries.length > 0) {
                preData = pres.valueSeries;
            }
            let startTime = Util.dateFtk("MM-dd hh:mm:ss", data.data.startTime);
            let endTime = Util.dateFtk("MM-dd hh:mm:ss", data.data.endTime);

            const option = {
                // toolbox: {
                //     trigger: 'axis',
                //     show: true,
                //     left: '40%',
                //     top: 10,
                //     feature: {
                //         // dataZoom: {
                //         //     show: true,
                //         //     yAxisIndex: false
                //         // },
                //         // restore: {show: true},
                //         // saveAsImage: {show: true}
                //     }
                // },
                // legend: {
                //     top: 0,
                //     show: true,
                //     right: 80,
                //     data: ['压力', '温度']
                // },
                grid: {
                    top: 30,
                    left: 50,
                    right: 80,
                    bottom: 45,
                },
                calculable: true,
                tooltip: {
                    trigger: 'axis'
                },
                color: ['#FCA929', '#1CA5FC'],
                xAxis: [
                    {
                        type: 'category',
                        data: timeData,
                        nameTextStyle: {
                            color: 'red'
                        },
                    },
                ],
                yAxis: [
                    {
                        type: 'value',
                        name: '温度(°C)',
                        min: 0,
                        max: 180,
                        nameTextStyle: {
                            color: '#FCA929'
                        },
                        axisLabel: {
                            formatter: '{value} °C'
                        },
                    },
                    {
                        type: 'value',
                        name: '压力(kPa)',
                        min: 0,
                        max: 271.0,
                        interval: 90,
                        nameTextStyle: {
                            color: '#1CA5FC'
                        },
                        axisLabel: {
                            formatter: '{value}kPa'
                        },

                    }

                ],
                dataZoom: [
                    {
                        type: "slider",
                        show: true,
                        backgroundColor: "white",
                        fillerColor: "transparent",
                        borderColor: "white",
                        // realtime: true,
                        top: 165,
                        bottom: 0,
                    },

                ],
                visualMap: [{
                    type: 'piecewise',
                    show: false,
                    seriesIndex: 0,
                    dimension: 1,
                    min: 134,
                    max: 300,
                    // maxOpen:true,
                    splitNumber: 1,
                    color: ['#FF3224'],
                    outOfRange: {
                        color: '#FCA929'
                    }
                }, {
                    type: 'piecewise',
                    show: false,
                    seriesIndex: 1,
                    dimension: 1,
                    min: 202,
                    // maxOpen:true,
                    splitNumber: 1,
                    color: ['green'],
                    outOfRange: {
                        color: '#1CA5FC'
                    }
                }],
                series: [
                    {
                        name: '温度',
                        type: 'line',
                        data: tempData,
                        yAxisIndex: 1,
                        // lineStyle: {
                        // color: '#FCA929'
                        // },
                        symbol: 'none',
                        markLine: {
                            data: [
                                {yAxis: 134, name: '标准线'},
                            ],
                            lineStyle: {
                                color: 'red'
                            },
                            symbol: 'none'
                        },
                        markArea: {
                            silent: true,
                            data: [
                                [{
                                    name: '异常时间段',
                                    xAxis: startTime
                                }, {
                                    xAxis: endTime
                                }]
                            ]
                        }
                    },
                    {
                        name: '压力',
                        type: 'line',
                        data: preData,
                        // lineStyle: {
                        // color: '#1CA5FC'
                        // },
                        symbol: 'none',
                        markLine: {
                            label: {
                                position: 'start'
                            },
                            lineStyle: {
                                color: 'red'
                            },
                            data: [
                                // {},
                                {yAxis: 202, name: '标准线'},
                            ],
                            symbol: 'none'
                        },
                    },
                ]
            };

            return (
                <View style={styles.item}>
                    <View style={styles.wrapper}>
                        <View style={{flexDirection: 'row'}}>
                            <Image style={styles.icon} source={Images.upload_title}></Image>
                            <Text style={styles.titleFont}>生物监测</Text>
                        </View>
                        <TouchableOpacity onPress={() => {
                            this.read(data.event.id, data.event.isRead);

                            // if(this.props.read){ this.props.read(data.event.id, data.event.isRead)}

                        }}>
                            <Image style={styles.readwrapper} source={this.state.isRead=="1"?Images.home_read:Images.home_unread} resizeMode={"cover"}></Image>
                        </TouchableOpacity>
                    </View>
                    <Echarts option={option} height={180} width={width}/>

                    <View style={{flexDirection: 'column', marginLeft: 10, paddingTop: 10,}}>
                        <Text style={styles.reason}>报警原因：温度/时间异常</Text>
                        <Text style={[styles.reason, {marginTop: 5,}]}>{"异常时间段：" + startTime + "~" + endTime}</Text>
                    </View>
                </View>
            );
        }
        return (
            <View style={styles.item}/>
        );
    }


}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
        // alignItems: 'center'
    },
    item: {
        backgroundColor: 'white',
        height: ITEM_HEIGHT,
        marginBottom: 10,
        width: width - 30,
        borderRadius: 7,
        marginLeft: 15,
    },
    wrapper: {
        flexDirection: 'row',
        paddingTop: 10,
        paddingBottom: 5,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
        justifyContent: 'space-between'
    },
    icon: {
        width: 29 * uW,
        height: 31 * uW,
        marginLeft: 15 * uW,
        marginRight: 5 * uW,
    },
    titleFont: {
        color: Colors.mainText,
        fontSize: 14,
        fontWeight: '300'
    },
    readwrapper: {
        width: 47,
        height: 22,
        marginRight: 10,
    },
    reason: {
        color: Colors.mainText,
        fontSize: 14,
        fontWeight: '300'
    },


});

function select(store) {
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Abnormal);