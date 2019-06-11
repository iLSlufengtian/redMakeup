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
import Modal from "react-native-modal";
import SceneUtil from '../../utils/SceneUtil';
import Util from "../../utils/Util";
import Network from "../../utils/Network";

const {getEventsCountClinic, setEventCount} = require('../../actions/index');

const marginTop = statusBarHeight + 88 * uW + 20;

class Detail extends PureComponent {
    props: Props;
    constructor(props){
        super(props);
        this.state = {
            listName:[
                '护肤品','洗面奶','水乳','精华','眼霜','面膜','彩妆','粉底液','隔离霜','眼影盘','睫毛膏','眼线笔','腮红','眉笔','口红','粉饼'
            ],
            color:'',
            images:[
                {
                    id:1,
                    imagesUrl:[
                        {
                            "url":'Images.list1',
                            text:'ROUYZ',
                        },
                        {
                            "url":'Images.list2',
                            text:'RYZ',
                        },
                        {
                            "url":'Images.list3',
                            text:'YZ',
                        },
                        {
                            "url":'Images.list4',
                            text:'ROUYZ',
                        },
                        {
                            "url":'Images.list4',
                            text:'ROUYZ',
                        },
                        {
                            "url":'Images.list4',
                            text:'ROUYZ',
                        },
                        {
                            "url":'Images.list4',
                            text:'ROUYZ',
                        },
                        {
                            "url":'Images.list4',
                            text:'ROUYZ',
                        },
                        
                    ]
                }
            ]
        }
    }

    //改变颜色
    // changeColor(){
    //     this.setState({color:'red'})
    // }

    render(){
        return(
            <View style={styles.container}>
                <TitleBar title={"详情"} hideLeftArrow={false}/>
                <ScrollView style={{flex:1,backgroundColor:'#FFFFFF'}}>
                    <Image source={Images.detailBig} style={{width:width,height:670*uW}} />
                    <View style={styles.content}>
                        <Text style={{fontWeight:'500',fontSize:36*uW,color:'#3E3E3E',marginVertical:20*uW}}>DEAGE</Text>
                        <Text><Text style={{color:'red',marginVertical:20*uW}}>[全民狂欢节，抓紧机会]</Text>水木粹白补水套装，全网热销， 现在只要88元，一起抢爆款。</Text>
                        <Text style={{marginVertical:20*uW}}>￥88</Text>
                        <View style={{height:240*uW,backgroundColor:'#F3F3F3',paddingHorizontal:20*uW}}>
                            <View style={styles.active}>
                                <Text>促销</Text>
                                <Text style={{color:'#FF0101'}}>买一送一</Text>
                            </View>
                            <View style={styles.active}>
                                <Text>已选</Text>
                                <Text>DEAGE一件套装</Text>
                            </View>
                            <View style={[styles.active,{borderBottomWidth:0}]}>
                                <Text>商品详情</Text>
                                <Text>></Text>
                            </View>
                        </View>
                    </View>
                </ScrollView>
                <View style={styles.bottomStyle}>
                    <View style={styles.bottomEvery}>
                        <Image style={{width:40*uW,height:36*uW,marginRight:5*uW}} source={Images.detail_love}/>
                        <Text>喜欢</Text>
                    </View>
                    <View style={styles.bottomEvery}>
                        <Image style={{width:40*uW,height:36*uW,marginRight:5*uW}} source={Images.detail_littleCart}/>
                        <Text>购物车</Text>
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#FF3B3B'}
                        onPress={() => {
                            // this.cancel()
                        }}
                    >
                        <Text style={styles.buttonText}>加入购物车</Text>
                    </TouchableHighlight>
                    <TouchableHighlight
                        style={styles.button2}
                        underlayColor={'#FF3B3B'}
                        onPress={() => {
                            // this.cancel()
                        }}
                    >
                        <Text style={styles.buttonText}>立即购买</Text>
                    </TouchableHighlight>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: 'red',
        
    },
    content: {
        flex:1,
        height:900*uW,
        // backgroundColor:'green',
        paddingHorizontal:30*uW,
    },
    active: {
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
        height:80*uW,
        borderBottomWidth:1*uW,
        borderBottomColor:'#DBDBDB',
    },
    bottomStyle: {
        width:width,
        height:96*uW,
        backgroundColor:'#F3F3F3',
        position:'absolute',
        bottom:0,
        display:'flex',
        flexDirection:'row',
        justifyContent:'space-around',
        alignItems:'center',
    },
    bottomEvery: {
        display:'flex',
        flexDirection:'row',
        height:96*uW,
        alignItems:'center',
    },
    button: {
        width:200*uW,
        height:60*uW,
        backgroundColor:'#FF3B3B',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10*uW,
    },
    buttonText:{
        color:'#FFFFFF'
    },
    button2: {
        width:156*uW,
        height:60*uW,
        backgroundColor:'#FF3B3B',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10*uW,
    }
});

function select(store) {
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Detail);