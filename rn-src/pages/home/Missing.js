/**
 * @flow
 * 检测缺失
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Button,
    TouchableNativeFeedback,
    Dimensions,
    FlatList,
    TouchableOpacity,
    SafeAreaView,
    TextInput,
    Linking,
    ScrollView,
    RefreshControl,
    AppState,
    TouchableHighlight,
    InteractionManager,
    DeviceEventEmitter, Animated, ImageBackground, Image,
} from 'react-native';
import {connect} from 'react-redux';
import SceneUtil from '../../utils/SceneUtil';
import * as Images from "../../common/Images";
import TitleBar from "../../components/TitleBar";
import {width, uW, isAppleX, safeAreaViewHeight} from '../../utils/DeviceUtil'
import Util from "../../utils/Util";
import Echarts from 'native-echarts';
import Modal from "react-native-modal";
import Colors from "../../common/Colors";
import FilterModal from "../../components/FilterModal";
import RefreshFlatList from "../../components/RefreshFlatList";
const {queryRecord} = require('../../actions/index');

const TimerMixin = require('react-timer-mixin');
const ITEM_HEIGHT = 125;

class Missing extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            dataArr: [0, 1, 2, 3, 4, 5, 6, 7, 8],
            deviceArr: [{label: "全部", id: -1}, {label: "灭菌器1", id: 0}, {label: "灭菌器2", id: 1}, {
                label: "灭菌器3",
                id: 3
            }, {label: "灭菌器4", id: 4}, {label: "灭菌器5", id: 4}, {label: "灭菌器6", id: 5}, {
                label: "灭菌器7",
                id: 6
            }, {label: "灭菌器8", id: 7}],
            datalist:[],
        };
    }

    componentDidMount() {
        let that = this;
        InteractionManager.runAfterInteractions(() => {

        });
        this.queryRecord()
    }

    componentWillUnmount() {
        if (this.timer) clearInterval(this.timer);
    }

    queryRecord=()=>{
       let params= {
            departmentId: this.props.userInfo ? this.props.userInfo.departmentId : "",
            eventTypeId: 10,
        };
        let promise = this.props.dispatch(queryRecord(params))
        promise.then((res) => {
            console.log(res)
            this.setState({
                datalist:res.list
            },()=>{
                console.log(this.state.datalist)
            })
        }).catch((err) => {
            if(err)Util.showToast(err.message)
        });

    };


    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"监测缺失"} hideLeftArrow={false}/>
                {this.state.datalist.length !=0 ?
                    <View>
                        <FlatList
                            style={{flex: 1}}
                            data={this.state.datalist}
                            keyExtractor={this._keyExtractor}
                            getItemLayout={this._getItemLayout}
                            name="listview"
                            renderItem={this.renderItem}
                        />
                        <FilterModal deviceArr={this.state.deviceArr} onFilter={() => {
                            alert(89)
                        }}/>
                    </View>
                    :
                    <View style={{flex:1,alignItems:'center',paddingTop:100}}>
                        <Image source={Images.home_nodatabg} style={{width:200,height:200}}/>
                        <Text>暂无数据</Text>
                    </View>
                }

            </View>
        )
    }

    _keyExtractor = (item, index) => index + '';
    _getItemLayout = (data, index) => (
        {length: ITEM_HEIGHT, offset: ITEM_HEIGHT * index, index}
    );

    renderItem = (item, index) => {
        return (
            <View style={styles.item_wrapper}>
                <View style={styles.titleWrapper}>
                    <Image style={styles.title_img} source={Images.home_left}></Image>
                    <Text style={styles.title_text}>灭菌周期运行记录表</Text>
                </View>

                <View style={[styles.reason, {marginTop: 10}]}>
                    <Image style={styles.reason_img} source={Images.home_reason}></Image>
                    <Text style={styles.reason_text}>原因：{item.item.diagnoseReason}</Text>
                </View>

                <View style={[styles.reason, {justifyContent: 'space-between'}]}>
                    <View style={{flexDirection: 'row', alignItems: 'center',}}>
                        <Image style={styles.reason_img} source={Images.home_time}></Image>
                        <Text style={styles.reason_text}>时间：{Util.dateFta('yyyy-MM-dd hh:mm:ss',item.item.startTime)}</Text>
                    </View>
                    <View style={styles.upload}>
                        <Text style={{color: Colors.themeColor, fontSize: 12,}}>去上传</Text>
                    </View>
                </View>
            </View>
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: Colors.bacColor
    },
    item_wrapper:{
        width: width - 30,
        height: 125,
        marginBottom: 10,
        backgroundColor: 'white',
        borderRadius: 5,
    },
    titleWrapper: {
        height: 70 * uW,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2FF',
    },
    title_text: {
        color: Colors.mainText,
        fontSize: 15,
        // fontWeight: '300',
    },
    title_img: {
        width: 3,
        height: 15,
        marginLeft: 15,
        marginRight: 10,
    },

    reason: {
        height: 70 * uW,
        flexDirection: 'row',
        alignItems: 'center',
    },
    reason_img: {
        width: 53 * uW,
        height: 53 * uW,
        marginLeft: 20,
        marginRight: 10,
    },
    reason_text: {
        color: Colors.mainText2,
        fontSize: 14,
        // fontWeight: '300',
    },
    upload: {
        width: 62,
        height: 21,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: Colors.themeColor,
        marginRight: 15
    },

});

function select(store) {
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Missing);