import {Alert} from 'react-native';
const Util = {
        showToast(text) {
            global.toastRef && global.toastRef.show(text);
        },

        /**
         * 检验字符串是否是手机号
         * @param string    字符串
         * @returns {boolean}
         */
        validatePhone(string) {
            if (string === null || string === '') {
                return false;
            }
            const reg = /^[1][3-9]+\d{9}/;
            return reg.test(string);
        },

        /**
         * 检验字符串是否是Email地址
         * @param string    字符串
         * @returns {boolean}
         */
        validateEmail(string) {
            if (string === null || string === '') {
                return false;
            }
            const reg = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;
            return reg.test(string);
        },

        /**
         * 检验字符串是否是密码
         * 以字母开头，长度在6~16之间，只能包含字符、数字和下划线
         * @param string    字符串
         * @returns {boolean}
         */
        validatePassword(string) {
            if (string === null || string === '') {
                return false;
            }
            const reg = /^[a-zA-Z]\w{5,15}$/;
            return reg.test(string);
        },

        /**
         * 时间格式化处理
         * yyyy-MM-dd hh:mm:ss
         */
        dateFta: (fmt, long) => {
            if (!long) {
                return "";
            }
            var date = new Date(long); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
            var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
            return Y + M + D + h + m + s;
        },
    /**
     * 时间格式化处理
     * MM-dd hh:mm:ss
     */
    dateFtk: (fmt, long) => {
        if (!long) {
            return "";
        }
        var date = new Date(long); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
        var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
        var m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':';
        var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
        return M + D + h + m + s;
    },

        /**
         * 时间格式化处理
         * MM-dd hh:mm
         */
        dateFtb(fmt, long) {
            if (!long) {
                return "";
            }
            var date = new Date(long); //时间戳为10位需*1000，时间戳为13位的话不需乘1000
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
            var h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':';
            var m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
            var str = M + D + h + m;
            return str;
        },

        /**
         * 时间格式化处理
         * hh:mm
         */
        dateFtc(fmt, long) {
            var date = new Date(long);
            var sd = date.getHours() + ""; //小时
            var mm = date.getMinutes() + "";

            if (mm.length == 1) {
                mm = "0" + mm
            }
            if (sd.length == 1) {
                sd = "0" + sd
            }
            if (mm == 0) {
                return sd + ":00"
            }
            return sd + ":" + mm
        },

        /**
         * 时间格式化处理
         * yyy-MM-dd
         */
        dateFtd(fmt, long) {
            var date = new Date(long);
            var mm = date.getMonth() + 1 + "";
            var dd = date.getDate() + "";
            if (mm.length == 1) {
                mm = "0" + mm
            }
            if (dd.length == 1) {
                dd = "0" + dd
            }
            return date.getFullYear() + "-" + mm + "-" + dd
        },

        NVL(str, def) {
            if (str === undefined || str === null) {
                return def;
            }
            return str;
        },

        /**
         * 显示带单个按钮的对话框
         */
        showOneButton(title = '', message = '', positive = "", onPositive) {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: positive, onPress: () => {
                            onPositive && onPositive();
                        }
                    },
                ],
                {cancelable: false}
            );
        },

        /**
         * 显示带两个按钮的对话框
         */
        showTwoButton(title = '', message = '', positive ="", onPositive, negative = "", onNegative) {
            Alert.alert(
                title,
                message,
                [
                    {
                        text: negative, onPress: () => {
                            onNegative && onNegative();
                        }
                    },
                    {
                        text: positive, onPress: () => {
                            onPositive && onPositive();
                        }
                    },
                ],
                {cancelable: false}
            )
        },


};
module.exports = Util;