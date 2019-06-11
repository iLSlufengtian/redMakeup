'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    StyleSheet,
    Text,
    Platform,
    Image,
    ScrollView,
    TextInput,
    TouchableOpacity,
    ImageBackground
} from 'react-native';
import TitleBar from "../../components/TitleBar";
import {width, uW, statusBarHeight, isAppleX} from '../../utils/DeviceUtil';
import * as Images from "../../common/Images";
import CustomTextInput from "../../components/CustomTextInput";
import Colors from "../../common/Colors";
import RoundButton from "../../components/RoundButton";
import Modal from "react-native-modal";
import LoadingView from "../../components/LoadingView";
import SceneUtil from '../../utils/SceneUtil';
import Util from '../../utils/Util';
import Network from '../../utils/Network';
import DatePicker from '../../components/DatePicker';
import SelectImageDialog from "../../components/SelectImageDialog";
import ImagePreview from "../../components/ImagePreview";

const {upload} = require('../../actions/index');
import {connect} from 'react-redux';

const TimerMixin = require('react-timer-mixin');

class UploadRecord extends PureComponent {

    constructor(props) {
        super(props);
        this.propsParams = this.props.navigation.state.params;

        this.state = {
            SterilizerID: '',
            SterilizationCycle: '0',
            SterilizationPot: '',
            description: '',
            signature: '',
            method: '',
            ChemicalMonitor: '0',
            OtherMonitor: '0',
            ProcessMonitor: '0',
            IdentifyData: '0',
            modalShow: false,
            change: false,
            whichno: '',
            modalOption: '1',
            start: null,
            startTimeStamp: null,
            eventStatus: null,

            currentImgType: null,
            physicImg: [],
            chemicalImg: [],
            initPhysicImg: '',
            initChemicalImg: ''
        };


    }

    componentDidMount(): void {
        if (this.propsParams.actions) {
            let initData = JSON.parse(this.propsParams.actions)
            console.log(initData)
            initData.map((item, index) => {
                if (item.type == "chemical") {
                    let initPhysicData = JSON.parse(item.text);
                    this.setState({
                        start: initPhysicData.sterilizeDate?Util.dateFtd("yyy-MM-dd", initPhysicData.sterilizeDate):
                        null,
                        startTimeStamp:initPhysicData.sterilizeDate ? initPhysicData.sterilizeDate : '',
                        SterilizerID: initPhysicData.sterilizeNumber ? initPhysicData.sterilizeNumber : '',
                        SterilizationCycle: initPhysicData.sterilizePeriod.period ? initPhysicData.sterilizePeriod.period : '0',
                        SterilizationPot: initPhysicData.sterilizeGuoci ? initPhysicData.sterilizeGuoci : '',
                        ChemicalMonitor: initPhysicData.chemicalDetection.status ? initPhysicData.chemicalDetection.status : '0',
                        OtherMonitor: initPhysicData.otherDetection.status ? initPhysicData.otherDetection.status : '0',
                        ProcessMonitor: initPhysicData.physicalGongyi.status ? initPhysicData.physicalGongyi.status : '0',
                        description: initPhysicData.sterilizeZhuangZaiDes ? initPhysicData.sterilizeZhuangZaiDes : '',
                        signature: initPhysicData.releasePerson ? initPhysicData.releasePerson : '',
                        method: initPhysicData.methodDescription ? initPhysicData.methodDescription : '',
                        chemicalImg: [item.doc ? item.doc : ''],
                    });
                }

                if (item.type == "physics") {
                    // let initPhysicData = JSON.parse(item.text);
                    console.log(item)
                    this.setState({
                        physicImg: [item.doc ? item.doc : ''],
                    });
                }


            })
        }
    }

    onPressSterilizationCycle = (type) => {
        if (this.state.SterilizationCycle == type) {
            this.setState({
                SterilizationCycle: ''
            })
        } else {
            this.setState({
                SterilizationCycle: type
            })
        }
    };

    onPressChemicalMonitor = (type) => {
        if (this.state.ChemicalMonitor == type) {
            this.setState({
                ChemicalMonitor: '',
            })
        } else {
            this.setState({
                ChemicalMonitor: type,
            })

        }

    };

    onPressOtherMonitor = (type) => {
        if (this.state.OtherMonitor == type) {
            this.setState({
                OtherMonitor: '',
                modalOption: 1
            })
        } else {
            this.setState({
                OtherMonitor: type,
                modalOption: 1
            })

        }
    };

    onPressProcessMonitor = (type) => {
        if (this.state.ProcessMonitor == type) {
            this.setState({
                modalOption: 1,
                ProcessMonitor: '',
             
            })
        } else {
            this.setState({
                modalOption: 1,
                ProcessMonitor: type,
                
            })

        }
    };

    onPressIdentifyData = (type) => {
        if (this.state.IdentifyData == type) {
            this.setState({
                IdentifyData: ''
            })
        } else {
            this.setState({
                IdentifyData: type
            })

        }
    };
    goToUploadBiometric = () => {
        SceneUtil.gotoScene('UploadBiology', {id: this.propsParams.id});
    };

    pressStartTime = () => {
        this.datePicker.showPicker();
        // this.type = "start"
    };

    onDateSelected = (timeStamp) => {

        this.setState({
            start: Util.dateFtd("yyy-MM-dd", timeStamp),
            startTimeStamp: timeStamp,
        });

        console.log(this.state)
    };

    onSelectedImage = (res) => {
        if (res) {
            if (this.state.currentImgType == 'physics') {
                let arr = this.state.physicImg;
                if (arr.length >= 0) {
                    arr = []
                }
                arr.push(Platform.OS == 'ios' ? res.sourceURL : res.path);
                arr.push(Platform.OS == 'ios' ? res.creationDate : res.modificationDate);
                this.setState({
                    physicImg: arr
                })
            }
            if (this.state.currentImgType == 'chemical') {
                let arr = this.state.chemicalImg;
                if (arr.length >= 0) {
                    arr = []
                }
                arr.push(Platform.OS == 'ios' ? res.sourceURL : res.path);
                arr.push(Platform.OS == 'ios' ? res.creationDate : res.modificationDate);
                this.setState({
                    chemicalImg: arr
                })
            }
        }
    };
    deleteImage = () => {
        if (this.state.currentImgType == 'physics') {
            this.setState({
                physicImg: ''
            })
        }
        if (this.state.currentImgType == 'chemical') {
            this.setState({
                chemicalImg: ''
            })
        }
    };
    uploadClick = () => {
        //判断输入是否为空
        if (!this.state.startTimeStamp) {
            Util.showToast("灭菌日期未选择")
            return;
        }
        if (this.state.SterilizerID == '') {
            Util.showToast("灭菌器编号未填写")
            return;
        }
        if (this.state.SterilizationPot == '') {
            Util.showToast("灭菌器锅次未填写")
            return;
        }
        if (this.state.description == '') {
            Util.showToast("灭菌装载物未填写")
            return;
        }
        if (this.state.signature == '') {
            Util.showToast("放行人未填写")
            return;
        }
        if (this.state.method == '') {
            Util.showToast("监测方法未填写")
            return;
        }

        if (!this.state.physicImg[0]) {
            Util.showToast("物理检测未选择")
            return;
        }
        ;
        if (!this.state.chemicalImg[0]) {
            Util.showToast("化学检测未选择")
            return;
        }
        ;

        //定义
        let description = {
            "sterilizeDate": this.state.startTimeStamp,
            "sterilizeNumber": this.state.SterilizerID,
            "sterilizePeriod": {
                period: this.state.SterilizationCycle
            },
            "sterilizeGuoci": this.state.SterilizationPot,
            "chemicalDetection": {
                status: this.state.ChemicalMonitor,
            },
            "otherDetection": {
                status: this.state.OtherMonitor,
            },
            "physicalGongyi": {
                status: this.state.ProcessMonitor
            },
            "sterilizeZhuangZaiDes": this.state.description,
            "sterilizeData": {
                status: "3"
            },
            "releasePerson": this.state.signature,
            "methodDescription": this.state.method,
        };
        description = JSON.stringify(description);


        //两个都上传过
        if (this.state.chemicalImg[0].indexOf("https") != -1 && this.state.physicImg[0].indexOf("https") != -1) {
            Util.showToast("不能再次上传");
            return;
        }

        //两个都没上传过
        if (this.state.chemicalImg[0].indexOf("https") == -1 && this.state.physicImg[0].indexOf("https") == -1) {
            this.upload("chemical", this.state.chemicalImg[0], this.state.chemicalImg[1], description, true);
            return;
        }

        //化学检测没上传过,物理检测上传过,上传化学检测
        if (this.state.chemicalImg[0].indexOf("https") == -1 && this.state.physicImg[0].indexOf("https") != -1) {
            this.upload("chemical", this.state.chemicalImg[0], this.state.chemicalImg[1], description);
            return;
        }

        //化学检测上传过,物理检测没传过,上传物理检测
        if (this.state.chemicalImg[0].indexOf("https") != -1 && this.state.physicImg[0].indexOf("https") == -1) {
            this.upload("physic", this.state.physicImg[0], this.state.physicImg[1], description);
            return;
        }
    };

    // uploadPhysics 是否需要上传物理检测，
    upload = (type, imgurl, filename, description, uploadPhysics) => {
        if (this.Loading) {
            this.Loading.show()
        }

        let form = new FormData();
        let file = {uri: imgurl, type: 'multipart/form-data', name: filename + '.jpg'}; // let  filename='131231313.jpg';
        form.append('image', file);
        form.append('type', type);
        form.append('description', description);

        let conf = {
            url: "secure/customer/event/" + this.propsParams.id + "/exam/result",
            params: form
        };

        let promise = this.props.dispatch(upload(conf));
        promise.then((res) => {
            console.log(res)
            console.log(res.code)
            if (this.Loading) {
                this.Loading.hide()
            }
            if (res) {
                if (uploadPhysics == true) {
                    this.upload("physics", this.state.physicImg[0], this.state.physicImg[1], "");
                }
                Util.showToast("上传成功")
            } else {
                Util.showToast("上传失败")
            }
        }).catch((err) => {
            if (this.Loading) {
                this.Loading.hide()
            }
            if (err) Util.showToast(err.message);
        });
    };

    gophotograph = () => {
        if (this.state.currentImgType == 'physics') {
            if (this.state.physicImg.length > 0) {
                //放大预览
                this.imagePreview.show(this.state.physicImg[0]);
            } else {
                this.dialog.show();
            }
        }
        if (this.state.currentImgType == 'chemical') {
            if (this.state.chemicalImg.length > 0) {
                this.imagePreview.show(this.state.chemicalImg[0]);
            } else {
                this.dialog.show();
            }
        }
    };
    renderCardOne = () => {
        return (
            <View style={styles.recordStyle}>
                <View style={styles.title}>
                    <Image style={styles.recordFormTitle} source={Images.upload_title}></Image>
                    <Text style={styles.titleFont}>灭菌周期运行记录表</Text>
                </View>
                {/*灭菌日期*/}
                <View style={{flexDirection: 'row', paddingHorizontal: 20, marginBottom: 10, marginTop: 10,}}>
                    <View style={{width: 80, height: 30, alignItems: 'flex-end'}}><Text style={{
                        color: Colors.mainText,
                        fontSize: 12,
                        lineHeight: 30,
                        fontWeight: '500',
                    }}>灭菌日期:</Text></View>
                    <Text style={{
                        flex: 1,
                        borderWidth: 1,
                        borderColor: Colors.borderColor,
                        lineHeight: 30,
                        fontSize: 12,
                        paddingLeft: 2,
                        marginLeft: 2,
                        color: this.state.start ? 'blue' : Colors.placeholderColor
                    }} onPress={() => {
                        this.pressStartTime()
                    }} onDateSelected={(time) => {
                        this.onDateSelected(time)
                        console.log(this.state)
                    }}> {this.state.start ? this.state.start : '请输入灭菌日期'}</Text>
                    {/* 日期选择 */}
                    <DatePicker ref={r => {
                        this.datePicker = r
                    }} onDateSelected={(time) => {
                        this.onDateSelected(time)
                        console.log(this.state)
                    }}/>


                </View>
                {/*灭菌器编号*/}
                <CustomTextInput
                    value={this.state.SterilizerID}
                    labelWidth={100}
                    height={30}
                    text={'灭菌器编号:'}
                    onChangeText={(text) => {
                        this.setState({SterilizerID: text})
                    }}
                    ContainerStyle={styles.ContainerStyle}
                    placeholder="请输入灭菌器编号"
                    underlineColorAndroid="transparent"
                    textInputStyle={styles.textInput}
                />

                {/*灭菌周期*/}
                <View style={styles.formChoose}>
                    <View style={styles.formLeft}>
                        <Text style={styles.formFontLeft}>灭菌周期:</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.8} style={styles.bigChoose}
                                      onPress={() => this.onPressSterilizationCycle("0")}>
                        <Image style={styles.chooseIcon}
                               source={this.state.SterilizationCycle == '0' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>B类 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.bigChoose}
                                      onPress={() => this.onPressSterilizationCycle("1")}>
                        <Image style={styles.chooseIcon}
                               source={this.state.SterilizationCycle == '1' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>S类 </Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.8} style={styles.bigChoose}
                                      onPress={() => this.onPressSterilizationCycle("2")}>
                        <Image style={styles.chooseIcon}
                               source={this.state.SterilizationCycle == '2' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>N类</Text>
                    </TouchableOpacity>
                </View>

                {/*灭菌器锅次*/}
                <CustomTextInput
                    value={this.state.SterilizationPot}
                    labelWidth={100}
                    height={30}
                    text={'灭菌器锅次:'}
                    onChangeText={(text) => {
                        this.setState({SterilizationPot: text})
                    }}
                    ContainerStyle={styles.ContainerStyle}
                    placeholder="请输入锅次数"
                    underlineColorAndroid="transparent"
                    textInputStyle={styles.textInput}
                />

                {/*化学监测*/}
                <View style={styles.formChoose}>
                    <View style={styles.formLeft}>
                        <Text style={styles.formFontLeft}>化学监测:</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={() => {
                        this.onPressChemicalMonitor('0')
                    }}>
                        <Image style={styles.chooseIcon}
                               source={this.state.ChemicalMonitor == '0' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>合格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={() => {
                        this.setState({
                            modalShow: true,
                            whichno: 1,
                            modalOption: '1',
                        })
                    }}
                    >
                        <Image style={styles.chooseIcon}
                               source={this.state.ChemicalMonitor == '1' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>不合格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose}
                                      onPress={() => {
                                          this.setState({
                                              modalShow: true,
                                              whichno: 1,
                                              modalOption: '2',
                                          })
                                      }}
                    >
                        <Image style={styles.chooseIcon}
                               source={this.state.ChemicalMonitor == '2' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>未测</Text>
                    </TouchableOpacity>
                </View>

                {/*其他监测*/}
                <View style={styles.formChoose}>
                    <View style={styles.formLeft}>
                        <Text style={styles.formFontLeft}>其他监测:</Text>
                    </View>

                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={() => {
                        this.onPressOtherMonitor('0')
                    }}>
                        <Image style={styles.chooseIcon}
                               source={this.state.OtherMonitor == '0' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>合格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={() => {
                        this.setState({
                            modalShow: true,
                            whichno: 2,
                        })
                    }}
                    >
                        <Image style={styles.chooseIcon}
                               source={this.state.OtherMonitor == '1' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>不合格</Text>
                    </TouchableOpacity>
                </View>

                {/*工艺变量监测*/}
                <View style={styles.formChoose}>
                    <View style={styles.formLeft}>
                        <Text style={styles.formFontLeft}>工艺变量监测:</Text>
                        <View style={{width: 100, alignItems: 'center'}}>
                            <Text style={styles.formFontLeft}> (物理参数)</Text>
                        </View>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={() => {
                        this.onPressProcessMonitor('0')
                    }}>
                        <Image style={styles.chooseIcon}
                               source={this.state.ProcessMonitor == '0' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>合格</Text>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={
                        () => {
                            this.setState({
                                modalShow: true,
                                whichno: 3,
                            })
                        }
                    }>
                        <Image style={styles.chooseIcon}
                               source={this.state.ProcessMonitor == '1' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>不合格</Text>
                    </TouchableOpacity>
                </View>

                {/*灭菌装载物说明*/}
                <View style={{flexDirection: 'row', marginBottom: 10,}}>
                    <View style={{width: 100, height: 30, alignItems: 'flex-end'}}>
                        <Text style={styles.formFontLeft}>灭菌装载物说明:</Text>
                        <View style={{width: 100, alignItems: 'center'}}>
                            <Text style={styles.formFontLeft}>（ 编号b或c ）</Text>
                        </View>
                    </View>
                    <TextInput
                        style={styles.textInput2}
                        underlineColorAndroid="transparent"
                        placeholder={"请输入编号b或c"}
                        onChangeText={(text) => {
                            this.setState({description: text})
                        }}
                        value={this.state.description}
                    />
                </View>

                {/*确定监测数据*/}
                <View style={styles.formChoose}>
                    <View style={styles.formLeft}>
                        <Text style={styles.formFontLeft}>确定监测数据:</Text>
                    </View>
                    <TouchableOpacity activeOpacity={0.7} style={styles.bigChoose} onPress={() => {
                        this.onPressIdentifyData('0')
                    }}>
                        <Image style={styles.chooseIcon}
                               source={this.state.IdentifyData == '0' ? Images.upload_choose : Images.upload_nochoose}/>
                        <Text style={styles.chooseFont}>灭菌物品放行</Text>
                    </TouchableOpacity>
                </View>

                <CustomTextInput
                    value={this.state.signature}
                    labelWidth={100}
                    height={30}
                    text={'放行人员签名:'}
                    onChangeText={(text) => {
                        this.setState({signature: text})
                    }}
                    ContainerStyle={styles.ContainerStyle}
                    placeholder="请输入放行人员名字"
                    underlineColorAndroid="transparent"
                    textInputStyle={styles.textInput}
                />

                <View style={[styles.formChoose, {height: 60, marginBottom: 10}]}>
                    <View style={{width: 100, height: 60, alignItems: 'flex-end',}}>
                        <Text style={styles.formFontLeft}>注明监测方法:</Text>
                    </View>
                    <TextInput
                        value={this.state.method}
                        onChangeText={(text) => {
                            this.setState({method: text})
                        }}
                        ContainerStyle={{height: 60, paddingBottom: 50, marginTop: 10,}}
                        placeholder="请输入监测方法"
                        underlineColorAndroid="transparent"
                        style={{
                            height: 60,
                            marginLeft: 2,
                            borderColor: Colors.borderColor,
                            borderWidth: 1,
                            flex: 1,
                            marginRight: 20,
                            paddingVertical: 0,
                            paddingLeft: 5,
                            fontSize: 12,
                            color: Colors.mainText
                        }}
                    />
                </View>
            </View>
        )
    };

    renderCardTwo = () => {
        return (
            <View style={styles.twoModule}>
                <View style={styles.title}>
                    <Image style={styles.recordFormTitle} source={Images.upload_title}></Image>
                    <Text style={styles.titleFont}>物理监测</Text>

                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    this.setState({
                        currentImgType: 'physics'
                    }, () => {
                        this.gophotograph()
                    })
                }}
                                  onLongPress={() => {
                                      Util.showTwoButton('提示', '确定删除图片吗?', '确定', () => {
                                          this.setState({
                                              currentImgType: 'physics'
                                          })
                                          this.deleteImage()
                                      }, '取消');
                                  }}
                                  style={{flex: 0.9, alignItems: 'center', justifyContent: 'space-around'}}>
                    <Image style={{width: 166 * uW, height: 166 * uW,}}
                           source={(this.state.physicImg.length > 0) ? {uri: this.state.physicImg[0]} : Images.upload_bg}/>
                    <Text style={{
                        fontSize: 12,
                        color: Colors.grayText
                    }}>{(this.state.physicImg.length > 0) ? '点击查看大图' : '拍照上传图片凭证'}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    renderCardThree = () => {
        return (
            <View style={styles.twoModule}>
                <View style={styles.title}>
                    <Image style={styles.recordFormTitle} source={Images.upload_title}></Image>
                    <Text style={styles.titleFont}>化学监测</Text>
                </View>
                <TouchableOpacity activeOpacity={0.7} onPress={() => {
                    this.setState({
                        currentImgType: 'chemical'
                    }, () => {
                        this.gophotograph()
                    })
                }}
                                  onLongPress={() => {
                                      Util.showTwoButton('提示', '确定删除图片吗?', '确定', () => {
                                          this.setState({
                                              currentImgType: 'chemical'
                                          })
                                          this.deleteImage()
                                      }, '取消');
                                  }}
                                  style={{flex: 0.9, alignItems: 'center', justifyContent: 'space-around'}}>
                    <Image style={{width: 166 * uW, height: 166 * uW,}}
                           source={(this.state.chemicalImg.length > 0) ? {uri: this.state.chemicalImg[0]} : Images.upload_bg}/>
                    <Text style={{
                        fontSize: 12,
                        color: Colors.grayText
                    }}>{(this.state.chemicalImg.length > 0) ? '点击查看大图' : '拍照上传图片凭证'}</Text>
                </TouchableOpacity>
            </View>
        )
    };

    render() {
        return (
            <View style={styles.container}>
                <TitleBar title={"灭菌异常"} hideLeftArrow={false}/>
                <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                    {this.renderCardOne()}
                    {this.renderCardTwo()}
                    {this.renderCardThree()}
                    <RoundButton style={{width: width, marginTop: 30}} btnText={"提交"}
                                 onPress={() => {
                                     console.log(this.state)
                                     this.uploadClick()
                                 }}/>
                </ScrollView>


                {/* 上传生物监测按钮 */}
                <TouchableOpacity activeOpacity={0.8} style={{position: 'absolute', right: 0, bottom: 40}}
                                  onPress={this.goToUploadBiometric}>
                    <Image style={{width: 137 * uW, height: 83 * uW}} source={Images.upload_fixed}></Image>
                </TouchableOpacity>

                {/* 选中不合格弹出模块 */}
                <Modal isVisible={this.state.modalShow} backdropOpacity={0.2}
                       style={{justifyContent: 'center', alignItems: 'center', margin: 0,}}
                       onBackdropPress={() => this.setState({modalShow: false})}>
                    <View style={styles.modalcontainer}>
                        <View style={styles.mainStyle}>
                            {/*<View style={styles.closeView}>*/}
                            {/*<TouchableOpacity activeOpacity={0.8} onPress={()=>{this.setState({modalShow:false})}}>*/}
                            {/*<Image style={{width:18,height:18}} source={Images.modal_close}></Image>*/}
                            {/*</TouchableOpacity>*/}
                            {/*</View>*/}
                            <View style={styles.content}>
                                <Text style={{
                                    color: Colors.mainText,
                                    fontSize: 15
                                }}>您确认要选择{(this.state.modalOption == '1') ? '不合格' : '未测'}吗？</Text>
                                {/*// }}>您确认要选择{(this.state.unknow == '1') ? '不合格' : '未测'}吗？</Text>*/}
                            </View>
                            <View style={{flexDirection: 'row',}}>
                                <TouchableOpacity activeOpacity={0.8} style={styles.cancelButton} onPress={() => {
                                    this.setState({modalShow: false})
                                }}>
                                    <Text style={{color: '#486DFF', fontSize: 16}}>取消</Text>
                                </TouchableOpacity>
                                <TouchableOpacity activeOpacity={0.8} style={styles.confirmButton} onPress={() => {
                                    this.setState({
                                        modalShow: false,
                                    })
                                    if (this.state.whichno == 1) {
                                        if (this.state.modalOption == '1') {
                                            this.onPressChemicalMonitor('1')
                                        } else if (this.state.modalOption == '2') {
                                            this.onPressChemicalMonitor('2')

                                        }
                                        // if(this.state.unknow ==true) {
                                        //     this.onPressChemicalMonitor('2')
                                        // }else {
                                        //     this.onPressChemicalMonitor('1')
                                        // }

                                    } else if (this.state.whichno == 2) {
                                        this.onPressOtherMonitor('1')
                                    } else if (this.state.whichno == 3) {
                                        this.onPressProcessMonitor('1')
                                    }

                                }}>
                                    <Text style={{color: '#FFFFFF', fontSize: 16}}>确认</Text>
                                </TouchableOpacity>
                            </View>
                        </View>

                        <View style={styles.topView}>
                            <Image style={{width: 204 * uW, height: 155 * uW,}} source={Images.modal_alarm}></Image>
                        </View>
                    </View>
                </Modal>

                <LoadingView ref={r => {
                    this.Loading = r
                }}/>

                <SelectImageDialog ref={(dialog) => {
                    this.dialog = dialog;
                }} onSelectedImage={this.onSelectedImage}/>

                <ImagePreview ref={(dialog) => {
                    this.imagePreview = dialog;
                }}/>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.bacColor,
    },

    recordStyle: {
        width: width - 60 * uW,
        marginTop: 30 * uW,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
    },

    ContainerStyle: {
        height: 30,
        marginBottom: 9,
        marginRight: 20,
        // backgroundColor:'green'
    },
    textInput: {
        color: Colors.mainText,
        fontSize: 12,
        paddingLeft: 5
    },

    twoModule: {
        width: width - 60 * uW,
        height: 360 * uW,
        marginTop: 30 * uW,
        borderRadius: 10,
        backgroundColor: '#FFFFFF',
    },
    title: {
        height: 70 * uW,
        flexDirection: 'row',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderBottomColor: '#EDF2FF',
        // backgroundColor: 'pink',
    },
    titleFont: {
        color: Colors.mainText,
        fontSize: 15,
        fontWeight: '300',
    },
    recordFormTitle: {
        width: 29 * uW,
        height: 31 * uW,
        marginLeft: 15 * uW,
        marginRight: 5 * uW,
    },
    formChoose: {
        flexDirection: 'row',
        height: 30,
        // backgroundColor:'red',
        marginBottom: 10,
        alignItems: 'center'
    },
    chooseIcon: {
        width: 15,
        height: 15,
        marginRight: 2
    },
    chooseFont: {
        color: Colors.mainText,
        fontSize: 12,
    },
    formLeft: {
        width: 100,
        alignItems: 'flex-end',
        // backgroundColor: "red"
    },
    formFontLeft: {
        fontSize: 12,
        fontWeight: '500',
        color: '#333333',
    },
    bigChoose: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 15,
        height: 30,
        alignItems: 'center',
    },
    // SterilizerDateText: {
    //     flex: 1,
    //     borderWidth: 1,
    //     borderColor: Colors.borderColor,
    //     lineHeight: 30,
    //     fontSize: 12,
    //     color: Colors.placeholderColor,
    //     paddingLeft: 2,
    //     marginLeft: 2
    // },
    textInput2: {
        flex: 1,
        color: Colors.mainText,
        fontSize: 12,
        paddingLeft: 5,
        height: 30,
        borderWidth: 1,
        marginLeft: 2,
        marginRight: 20,
        borderColor: Colors.borderColor,
        paddingVertical: 0,
        // backgroundColor:'red',
    },
    modalcontainer: {
        width: 590 * uW,
        height: 337 * uW,
        position: 'relative',
    },
    topView: {
        width: 590 * uW,
        height: 155 * uW,
        alignItems: 'center',
        position: 'absolute',
        top: -78 * uW,
        // backgroundColor:'pink'
    },
    mainStyle: {
        height: 337 * uW,
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
    },
    closeView: {
        height: 24,
        padding: 5,
        alignItems: 'flex-end',
    },
    content: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cancelButton: {
        width: 295 * uW,
        height: 88 * uW,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#F5F5F5',
        borderBottomLeftRadius: 10,
    },
    confirmButton: {
        width: 295 * uW,
        height: 88 * uW,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#486DFF',
        borderBottomRightRadius: 10,
    },
})

function select(store) {
    console.log(store)
    return {};
}

module.exports = connect(select)(UploadRecord);