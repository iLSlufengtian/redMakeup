/**
 *@author: meekoMa
 *@date: 19/05/15 10:19:20
 *@desc: 路由管理页面
 */
'use strict';
import React, {PureComponent} from 'react';
import {BackHandler, Platform, ToastAndroid} from 'react-native';
import {connect} from 'react-redux';
import {createStackNavigator, createAppContainer} from 'react-navigation';
import StackViewStyleInterpolator from "react-navigation-stack/src/views/StackView/StackViewStyleInterpolator";
import SceneUtil from '../utils/SceneUtil';
import Network from '../utils/Network';

const TabsView = require('./TabsView');
const LoginView = require('./login/LoginView');

const Abnormal = require('./home/Abnormal');
const Missing = require('./home/Missing');
const Offline = require('./home/Offline');
const HomeDetail = require('./home/HomeDetail');
const ShopDetail = require('./home/ShopDetail');


const UploadRecord = require('./record/UploadRecord');
const UploadBiology = require('./record/UploadBiology');
const Detail = require('./list/Detail');


const Setting = require('./mine/Setting');
const ModifyPassword = require('./mine/ModifyPassword');
const Forget = require('./mine/Forget');

const RouteList = {
    'TabsView': TabsView,
    'LoginView': LoginView,
    'Abnormal': Abnormal,
    'UploadRecord': UploadRecord,
    'Setting': Setting,
    'ModifyPassword': ModifyPassword,
    'Forget': Forget,
    'UploadBiology': UploadBiology,
    'Missing': Missing,
    "Offline": Offline,
    "HomeDetail":HomeDetail,
    "ShopDetail":ShopDetail,
    "Detail":Detail,
};

let routeConfigs = {};
Object.keys(RouteList).forEach((key) => {
    routeConfigs[key] = {};
    routeConfigs[key].screen = RouteList[key];
});

class Routers extends PureComponent {

    setNav(navigation) {
        let a = 100;
        SceneUtil.setStackNavigation(navigation);
    }

    constructor(props) {
        super(props);
        Network.setToken(this.props.token);
    }

    render() {
        const stackNavigatorConfig = {
            initialRouteName: this.props.token ? 'TabsView' : 'LoginView',
            initialRouteParams: {count: 9},
            // defaultNavigationOptions: { this.props.count
            //     headerStyle: {
            //         backgroundColor: '#f4511e',
            //     },
            //     headerTintColor: '#fff',
            //     headerTitleStyle: {
            //         fontWeight: 'bold',
            //     },
            // },
            navigationOptions: ({navigation}) => {
                SceneUtil.setStackNavigation(navigation);
                return {
                    header: null,
                    swipeEnabled: false,
                    animationEnabled: false,
                    gesturesEnabled: true,
                }
            },

            // navigationOptions: ({navigation, screenProps}) => ({
            //     ...this.setNav(navigation),
            // }),
            headerMode: 'none',
            mode: Platform.OS === 'ios' ? 'card' : 'card',
            transitionConfig: () => ({
                screenInterpolator: StackViewStyleInterpolator.forHorizontal,
            }),
        };

        const AppNavigator = createStackNavigator(routeConfigs, stackNavigatorConfig);
        let AppContainer = createAppContainer(AppNavigator);
        return (
            <AppContainer
                ref={nav => {
                    SceneUtil.setStackNavigation(nav)
                }}
                onNavigationStateChange={(preState, newState, action) => {
                    SceneUtil.setNavigationStateChangeInfo(preState, newState, action)
                }}
            />
        );
    }
}

function select(store) {
    return {
        token: store.login.token,
        count: store.login.count
    };
}

module.exports = connect(select)(Routers);
