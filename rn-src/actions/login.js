/**
 *
 *
 * @flow
 *
 */
'use strict';
const Network = require('../utils/Network');

//退出登录
function logout():ThunkAction {
    return (dispatch, getState) => {
        dispatch({
            type: "logout",
        });
    };
}
//是否记住密码
function remember(flag):ThunkAction {
    return (dispatch, getState) => {
        dispatch({
            type: "remember",
            data:flag
        });
    };
}
//存储登录名和密码
function savePwd(params):ThunkAction {
    return (dispatch, getState) => {
        dispatch({
            type: "savePwd",
            data:params
        });
    };
}

//登录
function risklogin(params): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'login',
            method: 'POST',
            params: params,
        };

        let onSuccess = (data, dispatch) => {
            dispatch({
                type: "login",
                data:data.token
            });
            console.log('登录成功');
            return Promise.resolve(data);
        };

        let onFailure = (error, dispatch) => {
            console.log('登录失败 ');
            return Promise.reject(error);
        };

        return dispatch(Network.fetch(conf, onSuccess, onFailure))
    }
}

//获取个人信息
function getUserInfo(): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'me',
            method: 'GET',
        };

        let onSuccess = (data, dispatch) => {
            dispatch({
                type: "userInfo",
                data:data
            });
            return Promise.resolve(data);
        };

        let onFailure = (error, dispatch) => {
            return Promise.reject(error);
        };
        return dispatch(Network.fetch(conf, onSuccess, onFailure))
    }
}

function modifyPassword(params): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'modifyPassword',
            method: 'POST',
            params: params,
        };

        let onSuccess = (data, dispatch) => {
            return Promise.resolve(data);
        };

        let onFailure = (error, dispatch) => {
            return Promise.reject(error);
        };
        return dispatch(Network.fetch(conf, onSuccess, onFailure))
    }
}




module.exports = {
    logout,
    remember,
    risklogin,
    getUserInfo,
    savePwd,
    modifyPassword
};
