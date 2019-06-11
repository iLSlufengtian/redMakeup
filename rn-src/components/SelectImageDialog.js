/**
 * @flow
 * 图片选择封装
 */
'use strict';
import React, {Component, PureComponent} from 'react';
import {
    StyleSheet,
    View,
    Image,
    Text,
    TouchableHighlight,
    Animated,
    Easing,
    Dimensions,
    Platform,
    TouchableOpacity
} from 'react-native';
import {width, height,isAppleX} from '../utils/DeviceUtil'
import PropTypes from 'prop-types';
import ImagePicker from 'react-native-image-crop-picker';
import Colors from "../common/Colors";

const [aWidth] = [width - 20];
const [middleLeft] = [(width - aWidth) / 2];

class SelectImageDialog extends PureComponent {

    static propTypes = {
        title: PropTypes.string,
        onSelectedImage: PropTypes.func.isRequired,
        options: PropTypes.array
    };
    static defaultProps = {
        options: [{label: "拍照", id: 0}, {label: "图库", id: 1}],
        title: "请选择照片",
        textColor: '#333333',
        defaultConfigs: {
            width: 512,
            height: 512,
            cropping: true,
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            offset: new Animated.Value(0),
            opacity: new Animated.Value(0),
            show: false,
            aHeight: 236,
        };
        this.configs = {};
    }

    cancel = () => {
        if (this.state.show) {
            this.out();
        }
    };

    choose = (id) => {
        if (this.state.show) {
            this.out();

            this.chooseTimer = setTimeout(() => {
                if (id == 0) {
                    ImagePicker.openCamera(this.configs).then(image => {
                        this.props.onSelectedImage && this.props.onSelectedImage(image);
                    }).catch(e => {
                        this.props.onSelectedImage && this.props.onSelectedImage(null);
                    });
                }
                if (id == 1) {
                    ImagePicker.openPicker(this.configs).then(image => {
                        this.props.onSelectedImage && this.props.onSelectedImage(image);
                    }).catch(e => {
                        this.props.onSelectedImage && this.props.onSelectedImage(null);
                    });
                }
            }, 200);
        }
    };

    show = (configs = {}) => {
        this.configs = {...this.props.defaultConfigs, ...configs};
        if (this.props.options.length == 1) {
            this.setState({
                aHeight: 180,
                show: true
            }, this.in);
        } else {
            this.setState({
                aHeight: 236,
                show: true
            }, this.in);
        }
    };

    render() {
        let {
            options,
            textColor,
            ...props
        } = this.props;
        if (!this.state.show) {
            return (<View/>)
        }

        return (
            <View style={styles.container}>
                <Animated.View style={styles.mask}/>
                <Animated.View style={[{
                    width: aWidth,
                    height: this.state.aHeight,
                    left: middleLeft,
                    ...Platform.select({
                        ios: {
                            bottom:isAppleX?0:-20,
                        },
                    }),
                    alignItems: "center",
                    justifyContent: "space-between",
                }, {
                    transform: [{
                        translateY: this.state.offset.interpolate({
                            inputRange: [0, 1],
                            outputRange: [height, (height - this.state.aHeight - 34)]
                        }),
                    }]
                }]}>
                    <View style={styles.content}>
                        <View style={styles.tipTitleView}>
                            <Text style={styles.tipTitleText}>{this.props.title}</Text>
                        </View>
                        {
                            options.map((item, i) => this.renderItem(item, i))
                        }
                    </View>
                    <TouchableHighlight
                        style={styles.button}
                        underlayColor={'#f0f0f0'}
                        onPress={() => {
                            this.cancel()
                        }}
                    >
                        <Text style={styles.buttonText}>取消</Text>
                    </TouchableHighlight>
                </Animated.View>
            </View>
        );
    }

    renderItem(item, i) {
        return (
            <TouchableOpacity
                style={styles.tipContentView} key={i + ""}
                onPress={() => {
                    this.choose(item.id)
                }}
            >
                <View style={styles.item}>
                    <Text style={{
                        color: this.props.textColor,
                        fontSize: 17,
                        textAlign: "center",
                    }}>{item.label}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    componentWillUnmount() {
        this.timer && clearTimeout(this.timer);
        this.chooseTimer && clearTimeout(this.chooseTimer);
    }

    //显示动画
    in() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,//一个用于定义曲线的渐变函数
                    duration: 200,//动画持续的时间（单位是毫秒），默认为200。
                    toValue: 0.8,//动画的最终值
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 1,
                }
            )
        ]).start();
    }

    //隐藏动画
    out() {
        Animated.parallel([
            Animated.timing(
                this.state.opacity,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            ),
            Animated.timing(
                this.state.offset,
                {
                    easing: Easing.linear,
                    duration: 200,
                    toValue: 0,
                }
            )
        ]).start(() => this.setState({show: false}));
    }

}

const styles = StyleSheet.create({
    container: {
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
    },
    mask: {
        justifyContent: "center",
        backgroundColor: "#000000",
        opacity: 0.3,
        position: "absolute",
        width: width,
        height: height,
        left: 0,
        top: 0,
    },
    // 提示标题
    tipTitleView: {
        height: 56,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
        marginLeft: 10,
        marginRight: 10
    },
    // 提示文字
    tipTitleText: {
        color: "#999999",
        fontSize: 14,
    },
    // 分割线
    tipContentView: {
        width: aWidth,
        height: 56,
        backgroundColor: '#fff',
        borderTopColor:Colors.borderColor,
        borderTopWidth:0.5,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    },
    item: {
        width: aWidth,
        height: 56,
        backgroundColor: '#fff',
        justifyContent: 'center',
        borderRadius: 5,
    },
    button: {
        height: 57,
        backgroundColor: '#fff',
        alignSelf: 'stretch',
        justifyContent: 'center',
        borderRadius: 5,
    },
    // 取消按钮
    buttonText: {
        fontSize: 17,
        color: Colors.themeColor,
        textAlign: "center",
    },
    content: {
        backgroundColor: '#fff',
        borderRadius: 5,
    }
});

module.exports = SelectImageDialog;