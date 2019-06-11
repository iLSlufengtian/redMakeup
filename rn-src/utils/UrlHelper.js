/**
 *
 *
 * @providesModule UrlHelper
 * @flow
 */
'use strict';
const appConfig = {
    // DOMAIN: 'https://ilab.qzwjtest.ilabservice.cloud/api/v2/', //开发板地址
    // DOMAIN: 'http://192.168.43.179:8901/api/v2/', //开发板地址
    // DOMAIN: 'https://qz.qzwj.ilabservice.cloud/api/v2/', //正式板地址
    DOMAIN: 'https://qz.qzwjtest.ilabservice.cloud/api/v2/',

};

const urlMap = {
    //登录注册
    "login": "unsecure/login", // 登录  POST
    "me":"secure/customer/me",
    "queryRecord": "secure/customer/event",//查询灭菌锅消毒记录 get
    "queryEvents": "secure/customer/weijian/events/data",//查询灭菌锅消毒记录 get
    "modifyPassword":"secure/customer/me/modify/password",
    "statsWeijian":"secure/customer/weijian/event/stats/status?statsDuration=7",  //首页数据 卫监 get
    "statsClinic":"secure/customer/weijian/department/{id}/stats?statsDuration=7",  //首页数据 诊所 get
    "readEvent":"secure/customer/weijian/event/{id}/user/read",//是否查看事件 put
};

const UrlHelper = {
    //Todo 各方法的注释以后添加
    restReplace: function (url, params) {
        Object.keys(params)
            .sort()
            .forEach(function (key) {
                let reg = new RegExp("{\\s*" + key + "\\s*}", "gi");
                url = url.replace(reg, params[key]);
            });
        return url;
    },

    toQueryString: function (obj) {
        return obj ?
            Object.keys(obj).map(function (key) {
                let val = obj[key];
                if (Array.isArray(val)) {
                    return val.map(function (val2) {
                        return key + '=' + UrlHelper.NVL(val2, '');
                    }).join('&');
                }
                return key + '=' + UrlHelper.NVL(val, '');
            }).join('&') :
            '';
    },

    NVL: function (str, def) {
        if (str === undefined || str === null) {
            return def;
        }
        return str;
    },

    toQuerySpring: function (obj, url) {
        let res = url;
        obj ? Object.keys(obj)
            .map(function (key) {
                let val = obj[key];
                let sd = "{" + key + "}";
                let index = res.indexOf(sd);
                if (index != -1) {
                    res = res.replace(sd, encodeURIComponent(val));
                }
            }) : '';
        return res;
    },

    getTureUrl: (url) => {
        return appConfig.DOMAIN + url;
    },

    getUrl: (key) => {
        let url = urlMap[key];
        return appConfig.DOMAIN + url;
    },

    getUrlWithParams: (key, params) => {
        let url = urlMap[key];
        let paramStr = '';
        if (params) {
            paramStr = UrlHelper.toQueryString(params);
            paramStr = ((url.indexOf('?') > -1)
                ? '&'
                : '?') + paramStr;
        }
        return appConfig.DOMAIN + url + paramStr;
    },

    getSprWithParams: (key, params) => {
        let url = urlMap[key];
        let paramStr = '';
        if (params) {
            paramStr = UrlHelper.toQuerySpring(params, url);
        }
        let sd = appConfig.DOMAIN + paramStr;
        return sd
    },
};
module.exports = UrlHelper;

