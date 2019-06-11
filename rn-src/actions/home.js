/**
 * @flow
 *
 */
'use strict';
const Network = require('../utils/Network');

//是否查看事件
function  readEvent(params): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'readEvent',
            method: 'PUT',
            params: params,
            urlParams: true
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

//获取首页数据  诊所
function getEventsCountClinic(params): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'statsClinic',
            method: 'GET',
            params: params,
            urlParams: true,
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

//获取首页数据  卫监
function getEventsCountWeijian(params): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'statsWeijian',
            method: 'GET',
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


//设置底部红点数量
function setEventCount(count):ThunkAction {
    return (dispatch, getState) => {
        dispatch({
            type: "count",
            data:count
        });
    };
}

module.exports = {
    readEvent,
    getEventsCountClinic,
    getEventsCountWeijian,
    setEventCount
};
