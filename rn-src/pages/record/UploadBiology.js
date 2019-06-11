'use strict';

import React, {PureComponent} from 'react';
import {View, StyleSheet, Text,Platform, Image, TouchableOpacity, Button} from 'react-native';
import TitleBar from "../../components/TitleBar";
import {width, uW, statusBarHeight, isAppleX} from '../../utils/DeviceUtil';
import * as Images from "../../common/Images";
import Colors from "../../common/Colors";
import RoundButton from "../../components/RoundButton";
import LoadingView from "../../components/LoadingView";
import SelectImageDialog from "../../components/SelectImageDialog";
import Util from '../../utils/Util';
import SceneUtil from '../../utils/SceneUtil';
import ImagePreview from "../../components/ImagePreview";
const {upload} = require('../../actions/index');
import {connect} from 'react-redux';

class UploadBiology extends PureComponent {

    constructor(props) {
        super(props);
        this.propsParams = this.props.navigation.state.params;
        this.state = {
            modalShow: true,
            biologyImg: [],
        }
    };
    //判断如果还未选择图片，弹出选择拍照，如果选择过了，点击放大
    gophotograph = () => {
        
        if(this.state.biologyImg.length > 0) {
            this.imagePreview.show(this.state.biologyImg[0])
        } else {
            this.dialog.show();
        }
    };
    onSelectedImage=(res)=>{
        if(res) {
            let arr = this.state.biologyImg;
            if (arr.length >= 0) {
                arr = []
            }
            arr.push(Platform.OS == 'ios' ? res.sourceURL : res.path);
            arr.push(Platform.OS == 'ios' ? res.creationDate : res.modificationDate);
            this.setState({
                biologyImg: arr
            },()=>{console.log(this.state.biologyImg)})
        }

    };

    uploadClick = ()=> {
        if (!this.state.biologyImg[0]) {
            Util.showToast("生物检测未选择")
            return;
        };

        if(this.Loading){this.Loading.show()};
        this.upload("biology", this.state.biologyImg[0], this.state.biologyImg[1]);
        
    };

    upload = (type,imgurl,filename) => {
        let file = {uri: imgurl, type: 'multipart/form-data', name: filename + '.jpg'}; 
        let form = new FormData();
        form.append('image', file);
        form.append('type', type);

        let conf = {
            url: "secure/customer/event/" + this.propsParams.id + "/exam/result",
            params: form
        };

        let promise = this.props.dispatch(upload(conf));
        promise.then((res) => {
            console.log(res)
            if (res) {
                Util.showToast("上传成功")
            }else{
                if(this.Loading){this.Loading.hide()};
                Util.showToast("上传错误")
            }
        }).catch((err) => {
            if(this.Loading){this.Loading.hide()};
            Util.showToast("网络请求错误")
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"上传生物监测记录"} hideLeftArrow={false}/>
                {/* 生物监测 */}
                <View style={styles.ModuleStyle}>
                    <View style={styles.titleStyle}>
                        <Image style={styles.recordFormTitle} source={Images.upload_title}></Image>
                        <Text style={styles.titleFont}>生物监测</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8}
                                      style={{flex: 0.9, alignItems: 'center', justifyContent: 'space-around'}}
                                      onPress={() => {
                                          this.gophotograph()
                                      }}
                                      onLongPress={() => {
                                        Util.showTwoButton('提示', '确定删除图片吗?', '确定', () => {
                                            this.setState({
                                                biologyImg: ''
                                            })
                                        }, '取消');
                                    }}
                                      >
                        <Image style={{width: 166 * uW, height: 166 * uW,}} source={(this.state.biologyImg.length > 0)?{uri: this.state.biologyImg[0]}:Images.upload_bg}/>
                        <Text style={{fontSize: 12, color: Colors.grayText}}>{(this.state.biologyImg.length > 0)?'点击查看大图':'拍照上传图片凭证'}</Text>
                    </TouchableOpacity>
                </View>

                <RoundButton style={{width: width,}} btnText={"上传"}
                             onPress={() => {
                                 this.uploadClick()
                             }}/>

                <LoadingView ref={r => {
                                    this.Loading = r
                                }}/>

                <SelectImageDialog ref={(dialog)=>{this.dialog = dialog;}}  onSelectedImage={this.onSelectedImage} />
                <ImagePreview ref={(dialog) => {
                    this.imagePreview = dialog
                }}></ImagePreview>
            </View>
        )
    }



    // upload=()=>{
    //     this.dialog.show(this.callbackSelected);

    // };
    // // 回调
    // callbackSelected(i){
    //     switch (i){
    //         case 0: // 拍照
    //             alert('拍照');
    //             break;
    //         case 1: // 图库

    //             break;
    //     }
    // }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
        alignItems: 'center'
    },
    ModuleStyle: {
        width: width - 60 * uW,
        height: 360 * uW,
        marginTop:15,
        marginBottom:20,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    titleStyle: {
        height: 70 * uW,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2FF',
    },
    titleFont: {
        color: Colors.mainText,
        fontSize: 15,
        fontWeight: '300'
    },
    recordFormTitle: {
        width: 29 * uW,
        height: 31 * uW,
        marginLeft: 15 * uW,
        marginRight: 5 * uW,
    }
});

function select(store) {
    console.log(store)
    return {};
}

module.exports = connect(select)(UploadBiology);