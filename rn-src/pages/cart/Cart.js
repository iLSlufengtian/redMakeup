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


class Cart extends PureComponent {
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
                    <Text> </Text>
                    <Text style={{fontSize:30*uW,color:'#3E3E3E'}}>购物车</Text>
                    <Text style={{color:'#3E3E3E'}}>编辑</Text>
                </View>
                <ScrollView style={{flex:1,width:width,}}>
                        <View style={{width:width,height:230*uW,display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-around'}}>
                            <Image style={{width:50*uW,height:50*uW}} source={Images.cart_noSelected} />
                            <Image source={Images.cart_image} style={{width:164*uW,height:164*uW}} />
                            <View style={{width:200*uW}}>
                                <Text>梵蒂冈口红</Text>
                                <Text>姨妈色</Text>
                                <Text style={{color:'red'}}>￥299</Text>
                            </View>
                            <View style={{width:200*uW,display:'flex',flexDirection:'row',alignItems:'center',}}>
                                <Text style={{padding:10*uW,borderWidth:1*uW,borderColor:'#DEDEDE'}}>—</Text>
                                <Text style={{padding:10*uW,borderWidth:1*uW,borderColor:'#DEDEDE',paddingHorizontal:20*uW,borderLeftWidth:0,borderRightWidth:0}}>1</Text>
                                <Text style={{padding:10*uW,borderWidth:1*uW,borderColor:'#DEDEDE'}}>+</Text>
                            </View>
                        </View>
                        <View style={{width:width,height:15*uW,backgroundColor:'#F0F0F0'}}></View>
                </ScrollView>
                <View style={{height:105*uW,width:width,position:'absolute',bottom:0,backgroundColor:'#F0F0F0',display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                    <View style={{display:'flex',flexDirection:'row',paddingLeft:30*uW}}>
                        <Image source={Images.cart_noSelected} style={{width:30*uW,height:30*uW}} />
                        <Text style={{fontSize:30*uW,color:'#3E3E3E',marginLeft:20*uW}}>全选</Text>
                    </View>
                    <Text style={{fontSize:30*uW,color:'#3E3E3E',}}>合计:<Text style={{color:'red'}}>￥299</Text></Text>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#FF3B3B'}
                        onPress={() => {
                            // this.cancel()
                        }}
                    >
                        <Text style={styles.buttonText}>结算</Text>
                    </TouchableHighlight>
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
        paddingHorizontal:20*uW,
        height: uW * 80,
        display:'flex',
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
    },
    button: {
        width:200*uW,
        height:105*uW,
        backgroundColor:'#FF3B3B',
        justifyContent:'center',
        alignItems:'center',
        borderRadius:10*uW,
    },
    buttonText:{
        color:'#FFFFFF',
        fontSize:30*uW,
    },

});

function select(store) {
    // console.log(store)
    return {
        userInfo: store.login.userInfo
    };
}

module.exports = connect(select)(Cart);