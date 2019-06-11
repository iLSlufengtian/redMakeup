/**
 * @flow
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Image,
    Text,
    Button,
    Modal,
    TouchableNativeFeedback,
    Dimensions,
    TouchableOpacity,
    FlatList,
    TextInput,
    Linking,
    ScrollView,
    AppState,
    TouchableHighlight,
    InteractionManager,
    DeviceEventEmitter, Animated, ImageBackground,
} from 'react-native';
import {connect} from 'react-redux';
import {width, uW, isAppleX, safeAreaViewHeight} from '../../utils/DeviceUtil'
import SceneUtil from '../../utils/SceneUtil';
import * as Images from "../../common/Images"
import {logout,} from '../../actions/index';
import TitleBar from "../../components/TitleBar";
import Colors from "../../common/Colors";
import TimerButton from "../../components/TimerButton";
import RoundButton from "../../components/RoundButton";

class Forget extends PureComponent {
    constructor(props) {
        super(props);

        this.propsParams = this.props.navigation.state.params;
        this.state = {
            dep: ''
        };

    }

    componentDidMount() {
        let that = this;
        InteractionManager.runAfterInteractions(() => {

        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"忘记密码"} hideLeftArrow={false}/>

                <View style={styles.wrapper}>
                    <View style={{alignSelf:'center'}}>
                        <Image source={Images.forget_phone} style={{width:14,height:16,marginLeft:20}} resizeMode={"contain"}/>
                    </View>
                    <View style={{alignSelf:'center'}}>
                        <TextInput
                            style={{marginLeft: 15, width: width* 0.70}}
                            onChangeText={(text) => this.setState({tel: text})}
                            value={this.state.tel}
                            autoFocus={true}
                            clearButtonMode={'while-editing'}
                            placeholder={'请输入手机号'}/>
                    </View>

                </View>


                <View  style={[styles.wrapper,{backgroundColor:"transparent"}]}>
                    <View style={{
                        flex:1,
                        height:46,
                        backgroundColor: 'white',
                        borderRadius: 5,
                        flexDirection:'row',
                        marginRight:10
                    }}>
                        <View style={{height:46,justifyContent:'center',}}>
                            <Image source={Images.forget_pwd} style={{width:14,height:16,marginLeft:20}} resizeMode={"contain"}/>
                        </View>
                        <View style={{flex:1,}}>
                            <TextInput
                                style={{flex:1,marginLeft: 12,borderRadius: 5,}}
                                onChangeText={(text) => this.setState({yzm: text})}
                                value={this.state.yzm}
                                autoFocus={true}
                                clearButtonMode={'while-editing'}
                                placeholder={'请输入验证码'}/>
                        </View>
                    </View>
                    <TimerButton autoStart={true}/>
                </View>


                <RoundButton style={{width: width, marginTop: 30}} btnText={"确定"}
                             onPress={() => {
                                 // alert(90)
                             }}/>
                <Text style={{fontSize:12, color:"#A1A4B7", marginLeft: 15,marginTop:0}}> 新密码将发送至您的手机</Text>




            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
    },
    wrapper:{
        width: width -30,
        height: 46,
        backgroundColor: 'white',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 15,
        flexDirection:'row'
    },
    spaceBg:{
        width: width* 0.35,
        backgroundColor:'#DAEDFF',
        borderRadius:5,
        height:46,
        justifyContent:'center',
        alignItems:'center'
    },
    bg:{
        width:width * 0.35,
        backgroundColor:'#54A2FF',
        borderRadius:5,
        height:46,
        justifyContent:'center',
        alignItems:'center'
    },
    spaceMobile:{
        color: '#969AAE',
        fontSize:14
    },
    Mobile:{
        color: 'white',
        fontSize:14
    }

});

function select(store) {
    return {};
}

module.exports = connect(select)(Forget);