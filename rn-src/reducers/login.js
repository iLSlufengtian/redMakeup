/**
 *@author: meekoMa
 *@date: 18/11/17 16:00:32
 *@desc: reducer
 */
'use strict';
type State = {
    token: string;
    remember: boolean;
    username: string;
    password: string;
    userInfo:object;
    count:number;
};

const initialState: State = {
    token: '',
    remember: false,
    username: "",
    password: "",
    userInfo:null,
    count:0
};

function login(state: State = initialState, action: Action): State {
    switch (action.type) {
        case 'login':
            return {
                ...state,
                token: action.data,
            };
            break;
        case 'logout':
            return {
                ...state,
                token:"",
                userInfo:null
            };
            break;
        case 'remember':
            return {
                ...state,
                remember: action.data,
            };
            break;
        case 'savePwd':
            return {
                ...state,
                username: action.data.username,
                password: action.data.password
            };
            break;
        case 'userInfo':
            return {
                ...state,
                userInfo:action.data
            };
            break;
        case 'count':
            return {
                ...state,
                count:action.data
            };
            break;
        default:
            return state;
    }
}

module.exports = login;
