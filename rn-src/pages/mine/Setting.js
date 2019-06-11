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

class Setting extends PureComponent {
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

    logout = () => {
        this.props.dispatch(logout());

        // DatePickerUtil.showPicker((timeStamp) => {
        //     alert(timeStamp)
        // },);
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"设置"} hideLeftArrow={false}/>

                <View  style={styles.wrapper}>
                    <View style={{flexDirection: 'row', marginLeft: 12}}>
                        <Text style={{fontSize: 15, color:Colors.mainText, marginLeft: 5, marginTop: 4}}>修改密码</Text>
                    </View>
                    <TouchableOpacity style={styles.right} onPress={() => {
                       SceneUtil.gotoScene("ModifyPassword")
                    }} activeOpacity={0.8}>
                        <Image source={Images.btn_arrow} style={{width: 9, height: 16, marginRight: 10,}}/>
                    </TouchableOpacity>
                </View>


                <View  style={styles.wrapper}>
                    <View style={{flexDirection: 'row', marginLeft: 12}}>
                        <Text style={{fontSize: 15, color:Colors.mainText, marginLeft: 5, marginTop: 4}}>检查更新</Text>
                    </View>
                    <TouchableOpacity style={styles.right} onPress={() => {
                        alert(90)
                    }} activeOpacity={0.8}>
                        <Text style={{fontSize: 15, color:Colors.grayText, marginRight: 5,}}>3.3.2</Text>
                        <Image source={Images.btn_arrow} style={{width: 9, height: 16, marginRight: 10,}}/>
                    </TouchableOpacity>
                </View>


                <TouchableOpacity  style={[styles.wrapper,{alignItems:"center",justifyContent:'center',marginTop:10}]} onPress={() => {this.logout()}} activeOpacity={0.8}>
                        <Text style={{fontSize: 15, color:Colors.themeColor,}}>退出登录</Text>
                </TouchableOpacity>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
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
    right: {
        flex: 1,
        height: 52,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    }

});

function select(store) {
    return {};
}

module.exports = connect(select)(Setting);