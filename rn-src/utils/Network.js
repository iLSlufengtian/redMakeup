/**
 *@author: meekoMa
 *@date: 18/11/24 19:06:30
 *@desc: 请求工具类
 *
 */
'use strict';

import React from 'react';

const UrlHelper = require('./UrlHelper');

export type RequestConf = {
    url: string;        // url
    trueUrl: string;    // 真实url,
    params?: Object;    // 参数
    method?: string;    // 请求方法
    isForm?: boolean;   // 是否form方式
};

const DEFAULT_REQUEST_CONF = {
    url: "",
    trueUrl: null,
    urlParams: null,//用来对付url中间有参数
    params: null,
    method: "GET",
    isForm: false,
};

let token;
const Network = {
    setToken: (to) => {
        token = to
    },

    getToken: () => {
       return  token
    },
    fetch: function (conf: RequestConf, onSuccess, onFailure) {
        if (!conf) {
            conf = {};
        }

        conf = {...DEFAULT_REQUEST_CONF, ...conf};

        let method = (conf.method || 'GET').toUpperCase();
        let options = {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Cache-Control': 'no-cache',
                'X-Authorization': 'Bearer ' + token,
                'x-language': 'chinese'
            }
        };

        let url;
        if (method === 'POST' || method === 'PUT') {

            //对url进行处理
            if (conf.trueUrl) {
                url = UrlHelper.getTureUrl(conf.url);
            } else {
                if (conf.urlParams) {
                    url = UrlHelper.getSprWithParams(conf.url, conf.params)
                } else {
                    url = UrlHelper.getUrl(conf.url);
                }
            }

            //对参数进行处理
            if (conf.isForm) {// 对于Form方式
                options.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
                if (conf.params) {
                    options.body = UrlHelper.toQueryString(conf.params);
                }
            } else {
                if (conf.params) {
                    options.body = JSON.stringify(conf.params);
                }
            }
        } else if (method === 'GET') {
            //对url进行处理
            if (conf.params) {
                if (conf.urlParams) {
                    url = UrlHelper.getSprWithParams(conf.url, conf.params)
                } else {
                    url = UrlHelper.getUrlWithParams(conf.url, conf.params);
                }
            } else {
                url = UrlHelper.getUrl(conf.url)
            }
        } else if (method === 'DELETE') {
            if (conf.urlParams) {
                url = UrlHelper.getSprWithParams(conf.url, conf.params)
            }
        }

        return dispatch => {
            return fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (json && Number(json.code) === 0) {
                        console.log("请求网络成功：");
                        console.log(url);
                        console.log(options);
                        console.log(json);
                        if (onSuccess) {
                            return onSuccess(json.data, dispatch);
                        }
                    } else {
                        return Promise.reject(json);
                    }
                })
                .catch(error => {
                    console.log("请求网络失败：");
                    console.log(url);
                    console.log(options);
                    console.log(error);
                    if (onFailure) {
                        return onFailure(error, dispatch);
                    }
                });
        }
    },

    upload: function (conf: RequestConf, onSuccess, onFailure) {
        if (!conf) {
            conf = {};
        }

        let url = UrlHelper.getTureUrl(conf.url);
        let options = {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Cache-Control': 'no-cache',
                'X-Authorization': 'Bearer ' + token,
                'x-language': 'chinese'
            },
            body: conf.params
        };

        return dispatch => {
            return fetch(url, options)
                .then(response => response.json())
                .then(json => {
                    if (json && Number(json.code) === 0) {
                        console.log("请求网络成功：");
                        console.log(url);
                        console.log(options);
                        console.log(json);
                        if (onSuccess) {
                            return onSuccess(json.data, dispatch);
                        }
                    } else {
                        return Promise.reject(json);
                    }
                })
                .catch(error => {
                    console.log("请求网络失败：");
                    console.log(url);
                    console.log(options);
                    console.log(error);
                    if (onFailure) {
                        return onFailure(error, dispatch);
                    }
                });
        }
    }


};
module.exports = Network;
