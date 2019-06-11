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
    Linking,
    TextInput,
    Button,
    ScrollView,
    AppState,
    TouchableHighlight,
    InteractionManager,
    DeviceEventEmitter, Animated, Image, Platform, StatusBar,
} from 'react-native';
import {connect} from 'react-redux';
import * as Images from "../../common/Images";
import TitleBar from "../../components/TitleBar";
import {width, uW, statusBarHeight} from '../../utils/DeviceUtil'
import Colors from "../../common/Colors";
// import Modal from "react-native-modal";
import SceneUtil from '../../utils/SceneUtil';
import Util from "../../utils/Util";
import Network from "../../utils/Network";

const {getEventsCountClinic, setEventCount} = require('../../actions/index');

const marginTop = statusBarHeight + 88 * uW + 20;

class HomeDetail extends PureComponent {
    props: Props;

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"潮流大牌"} hideLeftArrow={false}/>
                <View style={styles.content}>
                    <Image source={Images.home_detailBig} style={{width:width-60*uW,height:400*uW,marginTop:10*uW}}></Image>
                    <Image source={Images.home_detailCon1} style={{width:580*uW,height:50*uW,marginVertical:20*uW}}></Image>
                    <View style={{width:width-60*uW,Colors:'#8E8E8E',fontSize:24*uW,display:'flex',alignItems:'center'}}>
                        <Text>香奈儿（Chanel）是一个法国奢侈品品牌</Text>
                        <Text>创始人是Coco Chanel</Text>
                        <Text>该品牌于1910年在法国巴黎创立。</Text>
                        <Text>香奈儿（Chanel）是一个法国奢侈品品牌</Text>
                        <Text>创始人是Coco Chanel</Text>
                        <Text>该品牌于1910年在法国巴黎创立。</Text>
                    </View>
                    <Image source={Images.home_detailCon2} style={{width:580*uW,height:50*uW,marginVertical:20*uW}}></Image>
                    <View style={{width:width-60*uW,display:'flex',flexDirection:'row',justifyContent:"space-around"}}>
                        <TouchableOpacity activeOpacity={0.8} style={{display:'flex',alignItems:'center'}} onPress={()=>{SceneUtil.gotoScene("Detail")}}>
                            <Image style={{width:194*uW,height:206*uW}} source={Images.home_detail1}></Image>
                            <Text style={{color:'#3E3E3E',fontSize:26*uW}}>SUBLIMAGE</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{display:'flex',alignItems:'center'}} onPress={()=>{SceneUtil.gotoScene("Detail")}}>
                            <Image style={{width:194*uW,height:206*uW}} source={Images.home_detail2}></Image>
                            <Text style={{color:'#3E3E3E',fontSize:26*uW}}>N°5</Text>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} style={{display:'flex',alignItems:'center'}} onPress={()=>{SceneUtil.gotoScene("Detail")}}>
                            <Image style={{width:194*uW,height:206*uW}} source={Images.home_detail3}></Image>
                            <Text style={{color:'#3E3E3E',fontSize:26*uW}}>SUBLIMAGE</Text>
                        </TouchableOpacity>

                    </View>
                    
                </View>
                
                 
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
                flex: 1,
                backgroundColor: '#FFFFFF'
            },
    content:{
        flex:1,
        // backgroundColor:'red',
        paddingHorizontal:30*uW,
        display:'flex',
        alignItems:'center',
    }
            
})

module.exports = HomeDetail;
