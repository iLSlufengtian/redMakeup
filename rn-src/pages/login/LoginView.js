/**
 * @flow
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    Text,
    Button,
    Image,
    StatusBar,
    SafeAreaView, TouchableOpacity,
    ImageBackground, StyleSheet, TextInput
} from 'react-native';

const {connect} = require('react-redux');
import * as Images from "../../common/Images";
import Colors from "../../common/Colors";
import {width,uW} from '../../utils/DeviceUtil'
import Util from '../../utils/Util'
import Network from '../../utils/Network'
import RoundButton from "../../components/RoundButton";
import LoadingView from "../../components/LoadingView";

const TimerMixin = require('react-timer-mixin');
const {risklogin, remember, savePwd, getUserInfo} = require('../../actions/index');

class LoginView extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            username: 'xiaqin',
            password: 'ilabservice',

            // username: 'ilab',
            // password: 'ilabservice',

            // username: this.props.username?this.props.username:'',
            // password: this.props.password?this.props.password:'',

        }
    }

    //测试redux状态持久化
    doLogin = () => {
        let that=this;
        if (that.state.username == "") {
            Util.showToast("账户名不能为空")
            return;
        }

        if (that.state.password == "") {
            Util.showToast("密码不能为空")
            return;
        }

        that.Loading.show();
        let params = {
            // username: this.state.username + "@ilab",
            username: that.state.username + "@qz",
            password: that.state.password
        };

        let promise = that.props.dispatch(risklogin(params));
        promise.then((res) => {
            Network.setToken(res.token); // 保存token
            that.queryUserInfo(params);
        }).catch((err) => {
            that.Loading.hide();
            Util.showToast("请检查账户和密码")
        });

    };

    queryUserInfo=(params)=>{
        //获取个人信息
        let result =this.props.dispatch(getUserInfo());
        result.then((res) => {
            //存储登录名和密码
            if (this.props.remember) {
                let arr = params.username.split("@");
                params.username = arr[0];
                this.props.dispatch(savePwd(params));
            }
        }).catch((err) => {

        });
    };

    componentWillUnmount(){
        // this.props.dispatch(risklogin(params));
        // this.timer = TimerMixin.setTimeout(()=>{
        //     SceneUtil.gotoScene('Tabs',null,'replace');
        // },1000);
        // clearInterval(this.timer);
    }

    forgetPwd = () => {

    };
    rememberPwd = () => {
        if (this.props.remember) {
            this.props.dispatch(remember(false));
        } else {
            this.props.dispatch(remember(true));
        }
    };

    _onAccountChange = (text) => {
        this.setState({
            username: text,
        });
    };

    _onPwdChange = (text) => {
        this.setState({
            password: text,
        });
    };

    render() {
        return (
            <ImageBackground style={{flex: 1, alignItems: 'center',}} source={Images.login_bac}>
                <StatusBar hidden={true} />
                <ImageBackground style={styles.wrapper} source={Images.login_content_bac}>
                    <View style={styles.inputWrapper}>
                        <Image source={Images.login_account} style={{width: 17, height: 18}}/>
                        <TextInput
                            value={this.state.username}
                            onChangeText={this._onAccountChange}
                            style={styles.textInput}
                            placeholder="请输入账号"
                            underlineColorAndroid="transparent"
                            placeholderTextColor={Colors.placeholderColor}
                        />
                    </View>

                    <View style={styles.inputWrapper}>
                        <Image source={Images.login_pwd} style={{width: 17, height: 18}}/>
                        <TextInput
                            value={this.state.password}
                            onChangeText={this._onPwdChange}
                            style={styles.textInput}
                            placeholder="请输入密码"
                            underlineColorAndroid="transparent"
                            placeholderTextColor={Colors.placeholderColor}
                        />
                    </View>

                    <RoundButton style={{width: uW * 580, marginTop: 30}} source={Images.square_button} btnText={"登录"}
                                 onPress={() => {
                                     this.doLogin()
                                 }}/>

                    <View style={{width: uW * 520, flexDirection: 'row', justifyContent: 'space-between',}}>
                        <TouchableOpacity style={styles.textWrapper} onPress={() => {
                            this.rememberPwd()
                        }}>
                            <Image source={this.props.remember ? Images.box_checked : Images.box_uncheck}
                                   style={{width: 12, height: 12}} resizeMode={"contain"}/>
                            <Text style={[styles.text, {marginLeft: 5}]}>记住密码</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.textWrapper} onPress={() => {
                            this.forgetPwd()
                        }}>
                            <Text style={[styles.text, {marginLeft: 5}]}>记住密码?</Text>
                        </TouchableOpacity>
                    </View>

                </ImageBackground>
                <LoadingView ref={r => {
                    this.Loading = r
                }}/>
            </ImageBackground>
        );
    }

}

const styles = StyleSheet.create({
    wrapper: {
        marginTop: 92,
        width: uW * 670,
        height: uW * 780,
        alignItems: 'center',
        paddingTop: 90
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 35,
        marginRight: 35,
        marginTop: 17,
        borderBottomWidth: 1,
        borderBottomColor: Colors.borderColor,
    },
    textInput: {
        flex: 1,
        height: 50,
        fontSize: 14,
        marginLeft: 9,
        color: Colors.mainText,
        marginTop: 5
    },
    textWrapper: {
        flexDirection: 'row',
        height: 40,
        alignItems: 'center'
    },
    text: {
        color: Colors.grayText,
        fontSize: 15,
        alignSelf: 'center',
    },

});

function select(store) {
    return {
        remember: store.login.remember,
        username: store.login.username,
        password: store.login.password,
    };
}

module.exports = connect(select)(LoginView);
