/**
 * @flow
 *
 */
'use strict';
import {StackActions, NavigationActions} from 'react-navigation';
// about tabs页面
var _tabNavigation = null;
var _tabInfo = null;

// about stacks页面
var _stackNavigation = null;

var _preStateInfo = {};
var _newStateInfo = {};

var _currentIndex = 0;
var _currentRoutes = [];
var _preIndex = 0;
var _preRoutes = [];


var SceneUtil = {

    setStackNavigation: (nav) => {
        if(nav){
            _stackNavigation = nav._navigation;
        }

    },

    setTabNavigation: (navigation, tabInfo) => {
        _tabNavigation = navigation;
        _tabInfo = tabInfo;
    },

    setNavigationStateChangeInfo: (preState, newState, action) => {
        _preStateInfo = preState || {};
        _newStateInfo = newState || {};

        _currentIndex = newState.index;
        _currentRoutes = newState.routes;

        _preIndex = newState.index;
        _preRoutes = newState.routes;

    },

    getCurrentRoutes: () => {
        return _currentRoutes;
    },

    /**
     * @flow navigation 方法总结
     *  Reset - Replace current state with a new state
     *  Replace - Replace a route at a given key with another route
     *  Push - Add a route on the top of the stack, and navigate forward to it
     *  Pop - Navigate back to previous routes
     *  PopToTop Navigate to the top route of the stack, dismissing all other routes
     *  dismiss,
     */

    //index 为tabs页面数组的的下标,传值则跳对应页面，不传则跳当前的tab页面
    gotoTabView: (routeName, params, index) => {
        _stackNavigation.dispatch(StackActions.popToTop());

        if (index != null) {
            var name = _tabInfo[index].routeName;
            _tabNavigation._navigation.navigate(name, params)
        } else {
            _tabNavigation._navigation.navigate(routeName, params)
        }
    },

    gotoScene: (routeName, params, navType) => {
        let stackNavigation = _stackNavigation;

        if (navType === 'popToTop') {
            stackNavigation.dispatch(StackActions.popToTop());
        } else if (navType === 'replace') {
            stackNavigation.replace(routeName, params)
        } else if (navType === 'reset') {
            if (_currentRoutes.length < 1) {
                return;
            }

            let backIndex;
            _currentRoutes.forEach((item, idx) => {
                if (routeName == item.routeName) {
                    backIndex = idx;
                }
            });
            //止错
            if (!backIndex) {
                return;
            }

            let actions = [];
            _currentRoutes.forEach((item, idx) => {
                if (idx <= backIndex) {
                    actions.push(NavigationActions.navigate({routeName: item.routeName}));
                }
            });

            let resetAction;
            resetAction = StackActions.reset({
                index: backIndex,
                actions: actions
            });

            if (params) {
                //Todo 暂不可传值
                stackNavigation.setParams(params)
            }

            stackNavigation.dispatch(resetAction);
        } else {
            stackNavigation.navigate(routeName, params);
        }
    },


    // 在目的页面 重写componentWillReceiveProps(nextProps: Props)，用nextProps.navigation.state.params来接受。目前方法较复杂，后面有时间再改进。
    goBack: async (backParams) => {
        _stackNavigation.pop();
        if (backParams) {
            let navigateAction = NavigationActions.setParams({
                params: backParams,
                key: _currentRoutes[_currentIndex - 1].key
            });
            _stackNavigation.dispatch(navigateAction);
        }
    },

};

module.exports = SceneUtil;
