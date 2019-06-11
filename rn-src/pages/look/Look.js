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


class Look extends PureComponent {
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
                <View style={{width:width,height:64*uW,}}>
                    <Text style={{width:240*uW,height:50*uW,borderWidth:1*uW,borderColor:'#FF3B3B',color:'#FF3B3B',fontSize:30*uW,textAlign:'center',lineHeight:50*uW,position:'absolute',right:10*uW,top:10*uW}}>往期中奖结果</Text>
                </View>
                <ScrollView>
                    <View style={{width:width,height:520*uW,backgroundColor:'#FFFFFF',marginBottom:20*uW}}>
                        <View style={{width:width,height:60*uW,backgroundColor:'#EF730F',paddingHorizontal:20*uW,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text>本期活动商品：圣罗兰</Text>
                            <Text>倒计时：1天20小时</Text>
                        </View>
                        <Image source={Images.look_image} style={{width:width,height:270*uW,marginBottom:20*uW}}/>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={'#FF3B3B'}
                            onPress={() => {
                                alert("参与成功!")
                            }}
                        >
                            <Text style={styles.buttonText}>参与抽奖</Text>
                        </TouchableHighlight>
                        <View style={{ flex:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text>当前参与人数：</Text>
                            <Image source={Images.look_schedule} style={{width:400*uW,height:56*uW}} />
                            <Text>60/100</Text>
                        </View>
                    </View>
                    <View style={{width:width,height:520*uW,backgroundColor:'#FFFFFF',marginBottom:20*uW}}>
                        <View style={{width:width,height:60*uW,backgroundColor:'#EF730F',paddingHorizontal:20*uW,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text>本期活动商品：圣罗兰</Text>
                            <Text>倒计时：1天06小时</Text>
                        </View>
                        <Image source={Images.look_image2} style={{width:width,height:270*uW,marginBottom:20*uW}}/>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={'#FF3B3B'}
                            onPress={() => {
                                alert("参与成功!")
                            }}
                        >
                            <Text style={styles.buttonText}>参与抽奖</Text>
                        </TouchableHighlight>
                        <View style={{ flex:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text>当前参与人数：</Text>
                            <Image source={Images.look_schedule2} style={{width:400*uW,height:56*uW}} />
                            <Text>96/100</Text>
                        </View>
                    </View>
                    <View style={{width:width,height:520*uW,backgroundColor:'#FFFFFF',marginBottom:20*uW}}>
                        <View style={{width:width,height:60*uW,backgroundColor:'#EF730F',paddingHorizontal:20*uW,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text>本期活动商品：圣罗兰</Text>
                            <Text>倒计时：1天20小时</Text>
                        </View>
                        <Image source={Images.look_image3} style={{width:width,height:270*uW,marginBottom:20*uW}}/>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={'#FF3B3B'}
                            onPress={() => {
                                alert("参与成功!")
                            }}
                        >
                            <Text style={styles.buttonText}>参与抽奖</Text>
                        </TouchableHighlight>
                        <View style={{ flex:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text>当前参与人数：</Text>
                            <Image source={Images.look_schedule} style={{width:400*uW,height:56*uW}} />
                            <Text>60/100</Text>
                        </View>
                    </View>
                    <View style={{width:width,height:520*uW,backgroundColor:'#FFFFFF',marginBottom:20*uW}}>
                        <View style={{width:width,height:60*uW,backgroundColor:'#EF730F',paddingHorizontal:20*uW,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between'}}>
                            <Text>本期活动商品：圣罗兰</Text>
                            <Text>倒计时：1天20小时</Text>
                        </View>
                        <Image source={Images.look_image} style={{width:width,height:270*uW,marginBottom:20*uW}}/>
                        <TouchableHighlight
                            style={styles.button}
                            underlayColor={'#FF3B3B'}
                            onPress={() => {
                                alert("参与成功!")
                            }}
                        >
                            <Text style={styles.buttonText}>参与抽奖</Text>
                        </TouchableHighlight>
                        <View style={{ flex:1,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center'}}>
                            <Text>当前参与人数：</Text>
                            <Image source={Images.look_schedule} style={{width:400*uW,height:56*uW}} />
                            <Text>60/100</Text>
                        </View>
                    </View>
                    
                </ScrollView>
                
                
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
    button: {
        width:width,
        height:75*uW,
        backgroundColor:'#FF3B3B',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:30*uW,
    },
    buttonText:{
        color:'#FFFFFF'
    },

});

function select(store) {
    // console.log(store)
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Look);