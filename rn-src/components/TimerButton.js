/**
 * @flow meekoma
 * 60秒倒计时
 */
'use strict'
import React, {PureComponent} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import TimerMixin from 'react-timer-mixin';
import PropTypes from 'prop-types';
import {width,uW} from '../utils/DeviceUtil';
import Colors from "../common/Colors";
class TimerButton extends PureComponent {
    static propTypes = {
        text: PropTypes.string,
        style: PropTypes.object,
        textStyle: PropTypes.object,
        countdown: PropTypes.number,
        autoStart: PropTypes.bool,
        onPressStart: PropTypes.func,
        onPressCancel: PropTypes.func,
    };
    static defaultProps = {
        countdown: 60,
        text:'发送验证码'
    };

    constructor(props) {
        super(props);
        (this: any).setInterval = TimerMixin.setInterval.bind(this);
        (this: any).clearInterval = TimerMixin.clearInterval.bind(this);

        this.state = {
            status: 'inactive', // inactive 未激活状态, active 激活状态
            text: props.text,
            countdown: props.countdown,
        };
    }

    start = () => {
        this.setState({
            countdown: this.props.countdown,
            status: 'active'
        });
        if (this.interval) {
            this.clearInterval(this.interval);
        }

        this.timer = this.setInterval(()=>{
            let countdown = this.state.countdown - 1;
            this.setState({
                countdown: countdown,
                text: countdown + '秒',
            });
            if (countdown <= 0) {
                this.cancel();
            }
        }, 1000);

    };

    cancel = (skipFn) => {
        if (this.props.onPressCancel && !skipFn) {
            this.props.onPressCancel();
        }
        if (this.timer) {
            this.clearInterval(this.timer);
        }
        this.setState({
            text: this.props.text,
            status: 'inactive'
        });
    };

    onPress=()=>{
        if (this.props.onPressStart) {
            this.props.onPressStart();
        };
        this.start();
    };

    render() {
        let {
            style,
            textStyle,
            autoStart,
            countdown,
            ...props
        } = this.props;

        if (autoStart && this.state.status === 'inactive') {
            this.start();
        }

        return (
            <TouchableOpacity style={[styles.wrapper, style]} onPress={()=>{this.onPress()}} activeOpacity={0.8}>
                <Text style={[styles.text, textStyle]}>{this.state.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    wrapper: {
        width: uW*250,
        height: 44,
        backgroundColor: Colors.lightThemeColor,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
    },
    text:{
        fontSize:14,
        color:'white'
    }
});

module.exports = TimerButton;
