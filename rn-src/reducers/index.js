/**
 *@author: meekoMa
 *@date: 18/11/17 15:58:17
 *@desc:  action传达需要操作的信息，reducer根据这个信息来做对应操作的方法，reducer一般为简单的处理函数，
 * 通过传入旧的state和只是操作的action来更新
 */
'use strict';
module.exports = {
    login: require('./login'),
};
