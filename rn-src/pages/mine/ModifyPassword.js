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
import {modifyPassword,logout} from '../../actions/index';
import TitleBar from "../../components/TitleBar";
import Colors from "../../common/Colors";
import RoundButton from "../../components/RoundButton";
import Util from '../../utils/Util';
import Network from "../../utils/Network";
import LoadingView from "../../components/LoadingView";

class ModifyPassword extends PureComponent {
    constructor(props) {
        super(props);

        this.propsParams = this.props.navigation.state.params;
        this.state = {
            oldPwd: '',
            nPwd: '',
            nPwd1: '',
        };

    }

    componentDidMount() {
        console.log(this.state);
        console.log(this.props);

        let that = this;
        InteractionManager.runAfterInteractions(() => {

        });
    }

    submitClick=()=> {
        if(!this.state.oldPwd){
            Util.showToast("请输入旧密码");
            return;
        }

        if(!this.state.nPwd){
            Util.showToast("请输入新密码");
            return;
        }

        if(!this.state.nPwd1){
            Util.showToast("请再次输入新密码");
            return;
        }
        if(this.state.nPwd != this.state.nPwd1){
            Util.showToast("两次输入不一致");
            return;
        }

        this.Loading.show();
        let params = {
            oldPwd: this.state.oldPwd,
            newPwd: this.state.nPwd
        };
        let promise = this.props.dispatch(modifyPassword(params));
        promise.then((res) => {
            this.Loading.hide();
            Util.showToast("修改密码成功");
            this.props.dispatch(logout());

        }).catch((err) => {
            this.Loading.hide();
            Util.showToast("修改错误")
        });
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"修改登录密码"} hideLeftArrow={false}/>
                <View style={[styles.wrapper, {marginTop: 10}]}>
                    <View style={styles.left}>
                        <Text style={styles.left_text}>原密码:</Text>
                    </View>
                    <TextInput
                        style={styles.right_TextInput}
                        onChangeText={(text) => this.setState({oldPwd: text})}
                        value={this.state.oldPwd}
                        autoFocus={true}
                        clearButtonMode={'while-editing'}
                        placeholder={'请输入原密码'}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.wrapper}>
                    <View style={styles.left}>
                        <Text style={styles.left_text}>新密码:</Text>
                    </View>
                    <TextInput
                        style={styles.right_TextInput}
                        onChangeText={(text) => this.setState({nPwd: text})}
                        value={this.state.nPwd}
                        clearButtonMode={'while-editing'}
                        placeholder={'请输入6-18位字母、数字组合'}
                    />
                </View>

                <View style={styles.wrapper}>
                    <View style={styles.left}>
                        <Text style={styles.left_text}>确认新密码:</Text>
                    </View>
                    <TextInput
                        style={styles.right_TextInput}
                        onChangeText={(text) => this.setState({nPwd1: text})}
                        value={this.state.nPwd1}
                        clearButtonMode={'while-editing'}
                        placeholder={'请再次输入新密码'}
                        secureTextEntry={true}
                    />
                </View>

                <View style={styles.forget}>
                    <TouchableOpacity style={{height: 46, justifyContent: 'center', paddingRight: 20}} onPress={()=>{this.forget()}}>
                        <Text style={styles.forget_text}>忘记密码?</Text>
                    </TouchableOpacity>
                </View>


                <RoundButton style={{width: width, marginTop: 400*uW}} btnText={"提交"}
                             onPress={this.submitClick}/>


                <LoadingView ref={r => {
                    this.Loading = r
                }}/>
            </View>
        )
    }
    forget=()=>{
        SceneUtil.gotoScene("Forget")
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
    },
    wrapper: {
        width: width,
        height: 46,
        backgroundColor: 'white',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        borderBottomColor: Colors.borderColor,
        borderBottomWidth: 0.5
    },
    left: {
        width: 100,
        height: 46,
        justifyContent: 'center'
    },
    left_text: {
        fontSize: 14,
        color: Colors.mainText
    },
    right_TextInput: {
        marginLeft: 15,
        flex: 1,
        height: 46,
        fontSize: 14,
    },
    forget: {
        width: width,
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    forget_text: {
        fontSize: 14,
        color: Colors.lightThemeColor
    }

});

function select(store) {
    console.log(store)
    return {};
}

module.exports = connect(select)(ModifyPassword);