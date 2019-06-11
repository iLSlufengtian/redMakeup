/**
 * @flow
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    ImageBackground,
    TouchableNativeFeedback,
    Dimensions,
    TouchableOpacity,
    TextInput,
    Button,
    Linking,
    ScrollView,
    AppState,
    TouchableHighlight,
    InteractionManager,
    DeviceEventEmitter, Animated, Image, DatePickerIOS,
} from 'react-native';
import {connect} from 'react-redux';
import {width, uW, isAppleX, safeAreaViewHeight} from '../../utils/DeviceUtil'
import SceneUtil from '../../utils/SceneUtil';
import * as Images from "../../common/Images"

import TitleBar from "../../components/TitleBar";
import Colors from "../../common/Colors";


class Mine extends PureComponent {
    props: Props;

    constructor(props) {
        super(props);
        this.state = {
            date: new Date()
        };

    }

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.top}>
                    <Image style={{width:40*uW,height:40*uW,marginRight:30*uW,marginTop:20*uW}} source={Images.mine_setting} />
                </View>
                <View style={{width:width,height:240*uW,display:'flex',alignItems:'center'}}>
                    <Image source={Images.mine_avatar} style={{width:170*uW,height:170*uW}} />
                    <Text style={{marginTop:15*uW}}>缘来是你</Text>
                </View>
                {/* 全部订单 */}
                <View style={{width:620*uW,height:100*uW,display:'flex',flexDirection:'row',padding:20*uW,borderRadius:6*uW,borderColor:'pink',borderWidth:1*uW,marginBottom:20*uW}}>
                    <Text style={{width:200*uW,height:60*uW,lineHeight:60*uW,textAlign:'center',borderRightColor:'pink',borderRightWidth:1*uW}}>全部订单</Text>
                    <Text style={{width:200*uW,height:60*uW,lineHeight:60*uW,textAlign:'center',borderRightColor:'pink',borderRightWidth:1*uW}}>待收货</Text>
                    <Text style={{width:200*uW,height:60*uW,lineHeight:60*uW,textAlign:'center',borderRightColor:'pink'}}>待评价</Text>
                </View>
                {/* 资产 */}
                <View style={{width:620*uW,height:260*uW,paddingHorizontal:20*uW,}}>
                    <Text style={{color:'#3E3E3E',fontSize:30*uW,marginTop:20*uW}}>资产</Text>
                    <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:64*uW,height:49*uW}} source={Images.mine_list1} />
                            <Text>我的优惠券</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:64*uW,height:49*uW}} source={Images.mine_list2} />
                            <Text>会员中心</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:64*uW,height:49*uW}} source={Images.mine_list3} />
                            <Text>钱包</Text>
                        </View>
                    </View>
                </View>
                {/* 工具 */}
                <View style={{width:620*uW,height:420*uW,paddingHorizontal:20*uW,marginTop:30*uW,paddingTop:10*uW,borderTopColor:'pink',borderTopWidth:1*uW}}>
                    <Text style={{color:'#3E3E3E',fontSize:30*uW,marginTop:20*uW}}>工具</Text>
                    <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:42*uW,height:49*uW}} source={Images.mine_tool1} />
                            <Text style={{marginTop:5*uW}}>客服</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:61*uW,height:49*uW}} source={Images.mine_tool2} />
                            <Text style={{marginTop:5*uW}}>消息</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:55*uW,height:48*uW}} source={Images.mine_tool3} />
                            <Text style={{marginTop:5*uW}}>反馈</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:48*uW,height:48*uW}} source={Images.mine_tool4} />
                            <Text style={{marginTop:5*uW}}>更多</Text>
                        </View>
                    </View>
                    <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:52*uW,height:49*uW}} source={Images.mine_tool5} />
                            <Text style={{marginTop:5*uW}}>售后</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:44*uW,height:55*uW}} source={Images.mine_tool6} />
                            <Text style={{marginTop:5*uW}}>安全</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:45*uW,height:48*uW}} source={Images.mine_tool7} />
                            <Text style={{marginTop:5*uW}}>记录</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:51*uW,height:51*uW}} source={Images.mine_tool8} />
                            <Text style={{marginTop:5*uW}}>指南</Text>
                        </View>
                    </View>
                </View>
            </View>
        )
    }

   
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
        display:'flex',
        alignItems:'center',
    },
    top: {
        width: width,
        marginTop:44*uW,
        height: uW * 40,
        alignItems: 'flex-end',
    },
    wrapper: {
        height: 48,
        marginRight: 10,
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: 'white',
        borderRadius: 3,
    },

});

function select(store) {
    // console.log(store)
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Mine);