/**
 * @flow
 *
 */
'use strict';
const Network = require('../utils/Network');

//灭菌锅记录
function queryRecord(params): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: 'queryRecord',
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

function upload(con): ThunkAction {
    return (dispatch, getState) => {
        let conf = {
            url: con.url,
            method: 'POST',
            params: con.params,
        };

        let onSuccess = (data, dispatch) => {
            return Promise.resolve(data);
        };

        let onFailure = (error, dispatch) => {
            return Promise.reject(error);
        };
        return dispatch(Network.upload(conf, onSuccess, onFailure))
    }
}
module.exports = {
    queryRecord,
    upload,
};
