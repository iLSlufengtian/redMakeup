import React, {PureComponent,Component} from 'react';
import { View, StyleSheet,Text,Image,TouchableOpacity,Button } from 'react-native';
import Modal from "react-native-modal";
import {width, uW, statusBarHeight, isAppleX} from '../utils/DeviceUtil';
import * as Images from "../common/Images";
import Colors from "../common/Colors";

class UploadModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            modalShow:false
        }
    }

    open = ()=> {
        this.setState({modalShow:true})
    }

    render() {
        console.log(this.props)
        return(
            <Modal isVisible={this.state.modalShow} backdropOpacity={0.2} style={{justifyContent: 'center',alignItems:'center', margin: 0,}}
                       onBackdropPress={() => this.setState({modalShow: false})}>
                <View style={styles.container}>
                    <View style={styles.mainStyle}>
                        {/*<View style={styles.closeView}>*/}
                            {/*<TouchableOpacity activeOpacity={0.8} onPress={()=>{this.setState({modalShow:false})}}>*/}
                                {/*<Image style={{width:18,height:18}} source={Images.modal_close}></Image>*/}
                            {/*</TouchableOpacity>*/}
                        {/*</View>*/}
                        <View style={styles.content}>
                            <Text style={{color:Colors.mainText,fontSize:15}}>您确认要选择不合格吗？</Text>
                        </View>
                        <View style={{flexDirection:'row',}}>
                            <TouchableOpacity activeOpacity={0.8} style={styles.cancelButton} onPress={()=>{this.setState({modalShow:false})}}>
                                <Text style={{color:'#486DFF',fontSize:16}}>取消</Text>
                            </TouchableOpacity>
                            <TouchableOpacity activeOpacity={0.8} style={styles.confirmButton} onPress={()=>{
                                this.setState({modalShow:false},
                                 ) ,
                                 this.props.clickOk
                                 }}>
                                <Text style={{color:'#FFFFFF',fontSize:16}}>确认</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={styles.topView}>
                        <Image style={{width:204*uW,height:155*uW,}} source={Images.modal_alarm}></Image>
                    </View>
                </View>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: 590*uW,
        height:337*uW,
        position:'relative',
    },  
    topView: {
        width:590*uW,
        height:155*uW,
        alignItems:'center',
        position:'absolute',
        top:-78*uW,
        // backgroundColor:'pink'
    },
    mainStyle: {
        height:337*uW,
        backgroundColor:'#FFFFFF',
        borderRadius:10,
    },
    closeView: {
        height:24,
        padding:5,
        alignItems:'flex-end',
    },
    content: {
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    cancelButton: {
        width:295*uW,
        height:88*uW,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#F5F5F5',
        borderBottomLeftRadius:10,
    },
    confirmButton: {
        width:295*uW,
        height:88*uW,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#486DFF',
        borderBottomRightRadius:10,
    },
})

module.exports = UploadModal