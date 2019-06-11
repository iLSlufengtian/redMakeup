/**
 * @flow
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    Image,
    TouchableNativeFeedback,
    Dimensions,
    FlatList,
    TouchableOpacity,
    TextInput,
    Linking,
    ScrollView,
    RefreshControl,
    AppState,
    TouchableHighlight,
    InteractionManager,
    DeviceEventEmitter, Animated, ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import SceneUtil from '../../utils/SceneUtil';
import * as Images from "../../common/Images"
import {width, uW, isAppleX, safeAreaViewHeight} from '../../utils/DeviceUtil'
import TitleBar from "../../components/TitleBar";
import FilterModal from "../../components/FilterModal";
import {queryRecord} from '../../actions/index';
import Colors from "../../common/Colors";
import Util from "../../utils/Util";
import RefreshFlatList from "../../components/RefreshFlatList";


const ITEM_HEIGHT = 100;

class Record extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [],
            refreshing: true,
            defaultArr: [{label: "全部", id: -1}, {label: "已检测", id: 0}, {label: "未检测", id: 1}],
            deviceArr: [],
            modalShow: false,
        };
        // this.fetchData = this.fetchData.bind(this);
    };

    // _onRefresh = () => {
    //     this.setState({refreshing: true});
    //     fetchData().then(() => {
    //         this.setState({refreshing: false});
    //     });
    // }

    componentDidMount() {
        let that = this;
        that.queryRecord("init");
        InteractionManager.runAfterInteractions(() => {

        });
    };

    handlestaus(type) {
        let detected = false;//是否已检测
        switch (type) {
            case "CLOSED":
            //结案
            case "ACCEPTED":
            //立案
            case "INVESTIGATED":
            //调查终结
            case "NOTICE":
            //事先告知
            case "FIXED":
            //已修复
            case "PUNISH":
            //处罚决定
            case "ARCHIVED":
            //上级备案
            case "IGNORED":
            // 忽略
            case "ACKNOWLEDGED":
                //待处理
                detected = true;
                break;
            case "NONE":
            //未上传
            case "OPEN":
                detected = false;
                break;
            //未上传
        }
        return detected;
    }

    onFilter = (defaultType, para) => {
        this.queryRecord("filter", para, defaultType);
    };

    queryRecord = (type, para, defaultType) => {
        let that = this;
        let params = {
            // departmentId: that.props.userInfo ? that.props.userInfo.departmentId : "",
            eventTypeId: 13
        };
        if (type != "init") {
            params = {...params, ...para}
        }
        ;
        let promise = that.props.dispatch(queryRecord(params));
        promise.then((res) => {
            let arr = res.list;
            if (arr || arr.length != 0) {
                let drr = that.state.deviceArr;
                for (let i = 0; i < arr.length; i++) {
                    arr[i].hour = Util.dateFtc("hh:mm", arr[i].startTime)
                    arr[i].day = Util.dateFtd('yyy-MM-dd', arr[i].startTime);
                    arr[i].detected = that.handlestaus(arr[i].processStatus);
                    drr.push({label: arr[i].device, id: arr[i].deviceId})

                    if (arr[i].startTime && arr[i].endTime) {
                        let sk = arr[i].endTime - arr[i].startTime;
                        if (sk <= 1000) {
                            arr[i].continuedTime = "0分0秒";
                        } else {
                            //秒
                            let ss = (sk / 1000) % 60;
                            //分钟
                            let mm = Math.floor(sk / 1000 / 60);
                            //小时
                            let hh = "";
                            if (mm >= 60) {
                                hh = Math.floor(mm / 60);
                                mm = mm % 60;
                                arr[i].continuedTime = hh + "时" + mm + "分" + ss + "秒"
                            } else {
                                arr[i].continuedTime = mm + "分" + ss + "秒"
                            }
                        }
                    } else {
                        arr[i].continuedTime = "0分0秒";
                    }
                }


                //是否是筛选
                if (type == "filter") {
                    let datas = [];
                    if(defaultType==0){
                        datas=arr;
                    }
                    if(defaultType==1){
                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j].processStatus == "CLOSED") {
                                datas.push(arr[j]);
                            }
                        }
                    }
                    if(defaultType==2){
                        for (let j = 0; j < arr.length; j++) {
                            if (arr[j].processStatus != "CLOSED") {
                                datas.push(arr[j]);
                            }
                        }
                    }
                    that.setState({
                        dataArr: datas,
                        refreshing: false,
                        deviceArr: drr,
                    });
                } else {
                    that.setState({
                        dataArr: arr,
                        refreshing: false,
                        deviceArr: drr,
                    });
                }
            }
        }).catch((err) => {
            that.setState({
                refreshing: false,
            });
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"灭菌锅消毒记录"}/>
                <FlatList
                    renderItem={({item, index}) => <Item data={item} index={index}/>}
                    data={this.state.dataArr}
                    keyExtractor={this._keyExtractor}
                    getItemLayout={this._getItemLayout}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refreshing}
                            // onRefresh={() => {
                            //     this._onRefresh()
                            // }}
                        />
                    }
                />

                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', right: 0, bottom: 40}}
                                  onPress={() => {
                                      this.filterModal.open()
                                  }}>
                    <Image style={{width: 137 * uW, height: 83 * uW}} source={Images.record_filter}></Image>
                </TouchableOpacity>
                <FilterModal ref={r => {
                    this.filterModal = r
                }} onFilter={(defaultType, params) => {
                    this.onFilter(defaultType, params)
                }} defaultArr={this.state.defaultArr} deviceArr={this.state.deviceArr}/>


            </View>
        )
    }

    _keyExtractor = (item, index) => index + '';
    _getItemLayout = (data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    )
}

class Item extends PureComponent {
    clickItem = (id,actions) => {
        SceneUtil.gotoScene('UploadRecord',{id:id,actions:actions},null,);
    };

    render() {
        const data = this.props.data;
        return (
            <TouchableOpacity style={styles.item} onPress={() => {
                this.clickItem(data.id,data.actions);
            }} activeOpacity={0.85}>
                <Image style={styles.imageDetect} source={
                    (data.detected == false) ? Images.record_nodetect : Images.record_detect
                }/>
                <Image style={styles.imageWarn} source={(data.detected == false) ? Images.record_warn : null}/>
                <View style={styles.itemTop}>
                    <Text style={styles.topTitle}>{data.device}</Text>
                </View>
                <View style={styles.itemMain}>
                    <ImageBackground source={Images.record_bg} style={{
                        width: 270 * uW,
                        height: 270 * uW, justifyContent: 'center', alignItems: 'center'
                    }}>
                        <Text style={{fontSize: 14, color: '#6977B5'}}>
                            <Text
                                style={{fontSize: 20, color: '#1D2D72', fontWeight: 'bold'}}>{data.continuedTime}</Text>
                            {/* h */}
                        </Text>
                        <Text style={styles.titleFont}>持续时间</Text>
                    </ImageBackground>
                </View>
                <View style={styles.itemClock}>
                    <Image source={Images.record_clock} style={{width: 69 * uW, height: 69 * uW}}></Image>
                    <View style={{paddingTop: 5 * uW}}>
                        <Text style={{fontSize: 14, color: '#1D2D72', fontWeight: 'bold'}}>{data.hour}</Text>
                        <Text style={styles.titleFont}>开始时间</Text>
                    </View>
                </View>
                <Text style={{
                    position: 'absolute',
                    right: 10,
                    bottom: 12,
                    fontSize: 12,
                    color: '#9094C9'
                }}>{data.day}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor
        // position:'relative',
    },
    item: {
        width: width - 60 * uW,
        backgroundColor: 'white',
        borderRadius: 8,
        shadowColor: '#4A98FF',
        shadowOffset: {width: 0, height: 2},
        shadowRadius: 2,
        shadowOpacity: 0.24,
        marginTop: 10,
        marginLeft: 30 * uW,
        height: uW * 426,
        position: 'relative',
    },
    imageDetect: {
        width: 82 * uW,
        height: 85 * uW,
        position: 'absolute',
        left: -2,
        top: -2,
    },
    imageWarn: {
        width: 59 * uW,
        height: 59 * uW,
        position: 'absolute',
        right: 4,
        top: 10,
    },
    itemTop: {
        width: width - 100 * uW,
        height: 80 * uW,
        position: 'relative',
        borderColor: '#E6E6E6',
        borderStyle: 'solid',
        borderBottomWidth: 1,
        marginLeft: 20 * uW,
    },
    topTitle: {
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 80 * uW,
        color: 'rgba(17,34,107,1)',
    },
    itemMain: {
        paddingTop: 25 * uW,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleFont: {
        fontSize: 10,
        color: '#8F94C9',
    },
    itemClock: {
        width: 120 * uW,
        height: 69 * uW,
        position: 'absolute',
        left: 10,
        bottom: 8,
        flexDirection: 'row'
    },

});

function select(store) {
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Record);