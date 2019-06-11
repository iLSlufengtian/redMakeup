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
import {width, uW, statusBarHeight} from '../../utils/DeviceUtil'
import Colors from "../../common/Colors";
import Modal from "react-native-modal";
import SceneUtil from '../../utils/SceneUtil';
import Util from "../../utils/Util";
import Network from "../../utils/Network";

const {getEventsCountClinic, setEventCount} = require('../../actions/index');

const marginTop = statusBarHeight + 88 * uW + 20;

class List extends PureComponent {
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
    changeColor(){
        this.setState({color:'red'})
    }

    render(){
        return(
            <View style={styles.container}>
                <View style={styles.contentLeft}>
                    {this.state.listName.map((item,index)=>{
                        return <TouchableOpacity activeOpacity={0.8} style={{height:82*uW,width:180*uW,display:'flex', justifyContent:'center',alignItems:'center',}} onPress={this.changeColor()}>
                                <View style={{display:'flex',height:82*uW,width:160*uW,justifyContent:'center',alignItems:'center',borderLeftColor:'red',borderLeftWidth:10*uW,
                            borderBottomColor:'#E1E1E1',borderBottomWidth:1*uW}}>
                                    <Text>{item}</Text>
                                </View>
                            </TouchableOpacity>
                    })}
                </View>
                <View style={styles.contentRight}>
                    <View style={{height:80*uW,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Text>护肤品</Text>
                    </View>
                    <View style={{flex:1,display:'flex',flexWrap:'wrap',flexDirection:'row',justifyContent:'flex-start',}}>
                        {this.state.images[0].imagesUrl.map((item,index)=> {
                            return <TouchableOpacity style={{margin:30*uW,display:'flex',justifyContent:'center',alignItems:'center'}} activeOpacity={0.8} onPress={() => {
                                SceneUtil.gotoScene("Detail")
                            }}>
                                <Image style={{width:120*uW,height:120*uW}} source={Images.list1}></Image>
                                <Text>{item.text}</Text>
                            </TouchableOpacity>
                        })}
                    </View>
                   
                    
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F4F5F7',
        display:'flex',
        flexDirection:'row',
        // paddingTop:40*uW,
    },
    contentLeft: {
        width: 200*uW,
        borderRightColor:'#939393',
        borderRightWidth:1*uW,
        // backgroundColor:'green'
    },
    contentRight: {
        flex:1,
        borderRightColor:'#939393',
        borderRightWidth:1*uW,
        // backgroundColor:'pink',
    }
});

function select(store) {
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(List);