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
// import Modal from "react-native-modal";
import SceneUtil from '../../utils/SceneUtil';
import Util from "../../utils/Util";
import Network from "../../utils/Network";

const {getEventsCountClinic, setEventCount} = require('../../actions/index');

const marginTop = statusBarHeight + 88 * uW + 20;

class Home extends PureComponent {
    props: Props;

    constructor(props) {
        super(props);
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.titlebar}>
                    <View style={{flex:1,display:'flex',alignItems:"center"}}>
                        <Image style={styles.titleLogo} source={Images.homeTitleLogo}/>
                    </View>
                </View>
                {/* banner */}
                <View style={{height:300*uW,marginHorizontal:30*uW,}}>
                    <Image style={{width:690*uW,height:247*uW}} source={Images.homeBanner}></Image>
                </View>
                {/* 种草社区 */}
                <View style={{height:450*uW,borderTopColor:'#E9E9E9',borderTopWidth:1,paddingHorizontal:30*uW}}>
                    <View style={{height:60*uW,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:30*uW,fontWeight:'500'}}>种草社区</Text>
                        <View>
                            <Text>查看更多</Text>
                        </View>
                    </View>
                    <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <View style={{width:346*uW}}>
                            <Image source={Images.homeBig1} style={{width:348*uW,height:263*uW}}></Image>
                            <Text style={{fontSize:20*uW,color:'#3E3E3E',width:346*uW,paddingLeft:10*uW}}>这次我买的这香水超级好闻，感觉很棒，不知道你们会不会也很喜欢呢？</Text>
                            <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:10*uW,paddingRight:20*uW}}>
                                <View style={{display:'flex',flexDirection:'row'}}>
                                    <Image source={Images.homeAvatar} style={{width:46*uW,height:46*uW}}></Image>
                                    <Text style={{fontWeight:'500',fontSize:20*uW,color:'#3E3E3E',lineHeight:46*uW}}> 逯沣天</Text>
                                </View>
                                <View style={{display:'flex',flexDirection:'row'}}>
                                    <Image source={Images.home_good} style={{width:18*uW,height:18*uW}}></Image>
                                    <Text style={{color:'#FF3B3B',fontSize:20*uW,lineHeight:22*uW}}>1252</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{width:346*uW}} >
                        <Image source={Images.homeBig1} style={{width:346*uW,height:263*uW,}}></Image>
                        <Text style={{fontSize:20*uW,color:'#3E3E3E',paddingLeft:10*uW}}>这次我买的这香水超级好闻，感觉很棒，不知道你们会不会也很喜欢呢？</Text>
                        <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingLeft:10*uW,paddingRight:20*uW}}>
                            <View style={{display:'flex',flexDirection:'row'}}>
                                <Image source={Images.homeAvatar} style={{width:46*uW,height:46*uW}}></Image>
                                <Text style={{fontWeight:'500',fontSize:20*uW,color:'#3E3E3E',lineHeight:46*uW}}> 逯沣天</Text>
                            </View>
                            <View style={{display:'flex',flexDirection:'row'}}>
                                <Image source={Images.home_good} style={{width:18*uW,height:18*uW}}></Image>
                                <Text style={{color:'#FF3B3B',fontSize:20*uW,lineHeight:22*uW}}>1252</Text>
                            </View>
                        </View>
                    </View>
                    </View>
                </View>

                  {/* 热门分类 */}
                <View style={{height:206*uW,borderTopColor:'#E9E9E9',borderTopWidth:1,paddingHorizontal:30*uW}}>
                    <View style={{height:60*uW,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
                        <Text style={{fontSize:30*uW,fontWeight:'500'}}>热门分类</Text>
                        <View>
                            <Text>查看更多</Text>
                        </View>
                    </View>
                    <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:34*uW,height:40*uW}} source={Images.home_hot1}></Image>
                            <Text>香水</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:22*uW,height:40*uW}} source={Images.home_hot2}></Image>
                            <Text>口红</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:49*uW,height:40*uW}} source={Images.home_hot3}></Image>
                            <Text>腮红</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <Image style={{width:34*uW,height:44*uW}} source={Images.home_hot4}></Image>
                            <Text>眼影</Text>
                        </View>
                        <View style={{display:'flex',alignItems:'center'}}>
                            <Image style={{width:37*uW,height:44*uW}} source={Images.home_hot5}></Image>
                            <Text>卸妆棉</Text>
                        </View>
                        

                    </View>
                </View>

                  {/* 大牌推荐 */}
                  <View style={{height:186*uW,borderTopColor:'#E9E9E9',borderTopWidth:1,paddingHorizontal:30*uW}}>
                    <View style={{height:40*uW,display:'flex',flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingTop:10*uW}}>
                        <Text style={{fontSize:30*uW,fontWeight:'500'}}>大牌推荐</Text>
                        <View>
                            <Text>查看更多</Text>
                        </View>
                    </View>
                    <View style={{flex:1,display:'flex',flexDirection:'row',justifyContent:'space-around',alignItems:'center'}}>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{SceneUtil.gotoScene("HomeDetail")}}>
                            <Image style={{width:160*uW,height:100*uW}} source={Images.home_list1}  ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{SceneUtil.gotoScene("HomeDetail")}}>
                            <Image style={{width:160*uW,height:100*uW}} source={Images.home_list2}  ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{SceneUtil.gotoScene("HomeDetail")}}>
                            <Image style={{width:160*uW,height:100*uW}} source={Images.home_list3}  ></Image>
                        </TouchableOpacity>
                        <TouchableOpacity activeOpacity={0.8} onPress={()=>{SceneUtil.gotoScene("HomeDetail")}}>
                            <Image style={{width:160*uW,height:100*uW}} source={Images.home_list4}  ></Image>
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
                backgroundColor: '#F4F5F7'
            },
            titlebar: {
                width: width,
                height: uW * 88,
                marginTop: statusBarHeight,
                // marginTop: Platform.OS == 'ios'? statusBarHeight:0,
                flexDirection: 'row',
                alignItems: 'center',
            },
            titleLogo: {
                width:205*uW,
                height:45*uW,
            },
            rightImg: {
                width: uW * 40,
                height: uW * 40,
                resizeMode: 'contain',
                marginRight: uW * 30
            },
            content: {
                width: uW * 650,
                height: uW * 494,
                backgroundColor: 'white',
                position: 'absolute',
                top: marginTop,
                left: uW * 50,
                borderRadius: 7
            },
})

module.exports = Home;

// class Home extends PureComponent {
//     props: Props;

//     constructor(props) {
//         super(props);
//         this.state = {
//             modalShow: false,

//             abnormal: 0,//异常
//             tips: 0,//检修提示
//             missing: 0,//检测缺失
//             interrupt: 0//数据中断
//         };
//     }

//     componentDidMount() {
//         let that = this;
//         that.getEventsCount();
//         InteractionManager.runAfterInteractions(() => {

//         });
//     }

//     componentWillReceiveProps(nextProps: Props) {
//         if (nextProps.isLoggedIn && (nextProps.isLoggedIn != this.props.isLoggedIn)) {

//         }
//     };


//     //首页数据
//     getEventsCount = () => {
//         let params = {
//             id: this.props.userInfo ? this.props.userInfo.departmentId : "",
//         };
//         let promise = this.props.dispatch(getEventsCountClinic(params));
//         promise.then((res) => {
//             let arr = res.event;
//             if (arr && arr.length > 0) {
//                 arr.map((item, index) => {
//                     if (item.typeName == "abnormal_run") {
//                         this.setState({abnormal: item.count}) //异常
//                     }

//                     if (item.typeName == "maintenance_reminder") {
//                         this.setState({tips: item.count}) //检修提示
//                     }

//                     if (item.typeName == "operation_violation") {
//                         this.setState({missing: item.count}) //检测缺失
//                     }

//                     if (item.typeName == "offline") {
//                         this.setState({interrupt: item.count}) //数据中断
//                     }

//                 });
//                this.props.dispatch(setEventCount(arr.length));
//             }
//         }).catch((err) => {
//             if (err) Util.showToast(err.message)
//         });

//     };

//     render() {
//         return (
//             <View style={styles.container}>
//                 <StatusBar backgroundColor={"transparent"}
//                            barStyle={'light-content'}
//                            translucent={true}
//                     // networkActivityIndicatorVisible={true}
//                 />
//                 <ImageBackground style={styles.top} source={Images.home_top} resizeMode={"cover"}>
//                     <View style={styles.titlebar}>
//                         <View style={{flex: 1}}/>
//                         <View style={{flex: 1}}>
//                             <Text style={styles.titleText}>衢州口腔医院</Text>
//                         </View>
//                         <TouchableOpacity style={{flex: 1, flexDirection: 'row', justifyContent: 'flex-end'}}
//                                           onPress={() => {
//                                               this.setState({modalShow: true})
//                                           }}>
//                             <Image style={styles.rightImg} source={Images.home_message}/>
//                         </TouchableOpacity>
//                     </View>
//                 </ImageBackground>


//                 <View style={styles.content}>
//                     <View style={{flex: 1, flexDirection: 'row', alignItems: 'center'}}>
//                         <View style={{flex: 1, height: uW * 247, alignItems: 'center'}}>
//                             <TouchableOpacity style={[styles.item, {
//                                 borderBottomColor: Colors.borderColor,
//                                 borderBottomWidth: 1,
//                             }]} onPress={() => {
//                                 SceneUtil.gotoScene("Abnormal")
//                             }} activeOpacity={0.8}>
//                                 <View style={{width: uW * 128, height: uW * 128}}>
//                                     <Image style={{width: uW * 128, height: uW * 128}}
//                                            source={Images.home_red}/>
//                                     <View style={[styles.circle, {borderColor: '#FF5858'}]}>
//                                         <Text style={{fontSize: 15, color: '#FF5858'}}>{this.state.abnormal}</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={{fontSize: 14, color: '#FF5858', marginTop: 3}}>灭菌异常</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width: 1, height: uW * 178, backgroundColor: '#EBEBEB'}}/>
//                         <View style={{flex: 1, height: uW * 247, alignItems: 'center',}}>
//                             <TouchableOpacity style={[styles.item, {
//                                 borderBottomColor: Colors.borderColor,
//                                 borderBottomWidth: 1,
//                             }]} onPress={() => {
//                                 SceneUtil.gotoScene('MaintenanceTips');
//                             }} activeOpacity={0.8}>
//                                 <View style={{width: uW * 128, height: uW * 128}}>
//                                     <Image style={{width: uW * 128, height: uW * 128}}
//                                            source={Images.home_yellow}/>
//                                     <View style={[styles.circle, {borderColor: '#FFC515'}]}>
//                                         <Text style={{fontSize: 15, color: '#FFC515'}}>{this.state.tips}</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={{fontSize: 14, color: '#FFC515', marginTop: 3}}>检修提示</Text>
//                             </TouchableOpacity>
//                         </View>
//                     </View>

//                     <View style={{flex: 1, height: uW * 247, flexDirection: 'row', alignItems: 'center'}}>
//                         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//                             <TouchableOpacity style={styles.item} onPress={() => {
//                                 SceneUtil.gotoScene("Missing")
//                             }} activeOpacity={0.8}>
//                                 <View style={{width: uW * 128, height: uW * 128}}>
//                                     <Image style={{width: uW * 128, height: uW * 128}}
//                                            source={Images.home_purple}/>
//                                     <View style={[styles.circle, {borderColor: '#B554FF'}]}>
//                                         <Text style={{fontSize: 15, color: '#B554FF'}}>{this.state.missing}</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={{fontSize: 14, color: '#B554FF', marginTop: 3}}>监测缺失</Text>
//                             </TouchableOpacity>
//                         </View>
//                         <View style={{width: 1, height: uW * 178, backgroundColor: '#EBEBEB'}}/>
//                         <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
//                             <TouchableOpacity style={styles.item} onPress={() => {
//                                 SceneUtil.gotoScene("Offline")
//                             }} activeOpacity={0.8}>
//                                 <View style={{width: uW * 128, height: uW * 128}}>
//                                     <Image style={{width: uW * 128, height: uW * 128}}
//                                            source={Images.home_blue}/>
//                                     <View style={[styles.circle, {borderColor: '#499BF9'}]}>
//                                         <Text style={{fontSize: 15, color: '#499BF9'}}>{this.state.interrupt}</Text>
//                                     </View>
//                                 </View>
//                                 <Text style={{fontSize: 14, color: '#499BF9', marginTop: 3}}>数据中断</Text>
//                             </TouchableOpacity>
//                         </View>

//                     </View>
//                 </View>


//                 <Modal isVisible={this.state.modalShow} backdropOpacity={0.2} style={styles.modal}
//                        onBackdropPress={() => this.setState({modalShow: false})}>
//                     <View style={{width: uW * 590, height: uW * 337, alignItems: 'center'}}>
//                         <View style={{
//                             width: 263,
//                             height: 170,
//                             backgroundColor: "white",
//                             position: 'absolute',
//                             top: 38,
//                             borderRadius: 5
//                         }}>
//                             <View style={{flex: 1, marginTop: 38, justifyContent: 'center', alignItems: 'center'}}>
//                                 <Text style={{color: Colors.mainText, fontSize: 16,}}>有任何疑问请拨打：</Text>
//                                 <Text style={{color: '#999999', fontSize: 16, marginTop: 10}}>400-663-4522</Text>
//                             </View>
//                             <View style={{flexDirection: 'row', height: 35}}>
//                                 <TouchableOpacity onPress={() => {
//                                     this.setState({modalShow: false})
//                                 }} activeOpacity={0.7}
//                                                   style={{
//                                                       flex: 1,
//                                                       justifyContent: 'center',
//                                                       alignItems: 'center',
//                                                       backgroundColor: '#F5F5F5',
//                                                       borderBottomLeftRadius: 5,
//                                                   }}>
//                                     <Text style={{color: '#54A2FF', fontSize: 16,}}>取消</Text>

//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress={() => {
//                                     this.call()
//                                 }} activeOpacity={0.7}
//                                                   style={{
//                                                       flex: 1,
//                                                       justifyContent: 'center',
//                                                       alignItems: 'center',
//                                                       backgroundColor: '#486DFF',
//                                                       borderBottomRightRadius: 5
//                                                   }}>
//                                     <Text style={{color: 'white', fontSize: 16,}}>呼叫</Text>

//                                 </TouchableOpacity>
//                             </View>
//                         </View>
//                         <Image source={Images.home_modal} style={{width: uW * 204, height: uW * 155}}
//                                resizeMode="contain"/>
//                     </View>
//                 </Modal>
//             </View>
//         )
//     }

//     call = () => {
//         this.setState({modalShow: false});
//         Linking.openURL(`tel:${`tel:4006634522`}`)
//     }

// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F4F5F7'
//     },
//     top: {
//         width: width,
//         height: 210,
//     },
//     titlebar: {
//         width: width,
//         height: uW * 88,
//         marginTop: statusBarHeight,
//         // marginTop: Platform.OS == 'ios'? statusBarHeight:0,
//         flexDirection: 'row',
//         alignItems: 'center',
//     },
//     titleText: {
//         fontSize: uW * 34,
//         color: "white",
//         alignItems: 'center',
//     },
//     rightImg: {
//         width: uW * 40,
//         height: uW * 40,
//         resizeMode: 'contain',
//         marginRight: uW * 30
//     },
//     content: {
//         width: uW * 650,
//         height: uW * 494,
//         backgroundColor: 'white',
//         position: 'absolute',
//         top: marginTop,
//         left: uW * 50,
//         borderRadius: 7
//     },
//     item: {
//         flex: 1,
//         width: uW * 250,
//         // backgroundColor: "green",
//         alignItems: 'center',
//         justifyContent: 'center',
//     },
//     circle: {
//         width: uW * 48,
//         height: uW * 48,
//         borderColor: 'yellow',
//         borderWidth: 1,
//         position: 'absolute',
//         top: 0,
//         right: 0,
//         borderRadius: 30,
//         justifyContent: 'center',
//         alignItems: "center",
//         backgroundColor: '#FFF2F2'
//     },
//     modal: {
//         margin: 0,
//         justifyContent: 'center',
//         alignItems: 'center'
//     }

// });

// function select(store) {
//     return {
//         userInfo: store.login.userInfo
//     };
// }

// module.exports = connect(select)(Home);