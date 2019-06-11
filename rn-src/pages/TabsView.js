/**
 *@author: meekoMa
 *@date: 19/05/15 11:30:06
 *@desc: 路由管理页面
 */
'use strict';
import React, {PureComponent} from 'react';
import {
    View,
    DeviceEventEmitter,
    InteractionManager,
    AppState,
    Image,
    Text,
    StyleSheet,
    Platform
} from 'react-native';
import {createBottomTabNavigator, TabBarBottom, createAppContainer} from 'react-navigation';
import SceneUtil from '../utils/SceneUtil';
import {connect} from "react-redux";

const ScreenHome = require('./home/Home');
const List = require('./list/List');
const Look = require('./look/Look');
const Cart = require('./cart/Cart');
const ScreenMine = require('./mine/Mine');



let TabNavigator = createBottomTabNavigator(
    {
        Home: {
            screen: ScreenHome,
            navigationOptions: {tabBarLabel: '首页', showIcon: true}
        },
        List: {
            screen: List,
            navigationOptions: {tabBarLabel: '分类', showIcon: true}
        },
        Look: {
            screen: Look,
            navigationOptions: {tabBarLabel: '发现', showIcon: true}
        },
        Cart: {
            screen: Cart,
            navigationOptions: {tabBarLabel: '购物车', showIcon: true}
        },
        Mine: {
            screen: ScreenMine,
            navigationOptions: {tabBarLabel: '我的', showIcon: true}
        },
        
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                SceneUtil.setTabNavigation(navigation, null);
                const {routeName} = navigation.state;
                let iconName, normalImage, selectedImage, badgeCount;
                switch (routeName) {
                    case 'Home':
                        normalImage = require('../images/tabs/home.png');
                        selectedImage = require('../images/tabs/home_selected.png');
                        badgeCount = 0;
                        break;
                    case 'List':
                        normalImage = require('../images/tabs/list.png');
                        selectedImage = require('../images/tabs/list_selected.png');
                        badgeCount = 0;
                        break;
                    case 'Look':
                        normalImage = require('../images/tabs/look.png');
                        selectedImage = require('../images/tabs/home_selected.png');
                        badgeCount = 0;
                        break;
                    case 'Cart':
                        normalImage = require('../images/tabs/cart.png');
                        selectedImage = require('../images/tabs/home_selected.png');
                        badgeCount = 10;
                        break;
                    case 'Mine':
                        normalImage = require('../images/tabs/me.png');
                        selectedImage = require('../images/tabs/me_selected.png');
                        badgeCount = 0;
                   
                }
                return (
                    <TabBarItemWithBadge
                        focused={focused}
                        routeName={iconName}
                        normalImage={normalImage}
                        selectedImage={selectedImage}
                        badgeCount={badgeCount}
                    />
                );
            },
        }),
        tabBarOptions: {
            activeTintColor: 'red',
            inactiveTintColor: 'gray',
            showLabel: true,

        },
    });


class TabBarItem extends PureComponent {
    render() {
        let imgSource = (this.props.focused) ? this.props.selectedImage : this.props.normalImage;
        return (
            <Image source={imgSource} style={{width: 20,}} resizeMode="contain"/>
        );
    }
}

class TabBarItemWithBadge extends PureComponent {

    render() {
        let imgSource = (this.props.focused) ? this.props.selectedImage : this.props.normalImage;
        const {name, badgeCount, color, size} = this.props;
        return (
            <View style={{width: 24, height: 24,}}>
                <Image source={imgSource} style={{width: 22, height: 22}} resizeMode="contain"/>
                {badgeCount > 0 && (
                    <View style={{
                        position: 'absolute',
                        right: -6,
                        top: -3,
                        backgroundColor: 'red',
                        borderRadius: 6,
                        width: 15,
                        height: 15,
                        justifyContent: 'center',
                        alignItems: 'center'
                    }}>
                        <Text style={{color: 'white', fontSize: 10, fontWeight: 'bold'}}>{badgeCount}</Text>
                    </View>
                )}
            </View>
        );
    }
}

module.exports = TabNavigator;

