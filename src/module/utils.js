/*
 * @Author       : Evan.G
 * @Date         : 2021-01-12 14:28:18
 * @LastEditTime : 2021-08-11 10:09:21
 * @Description  : 常用工具函数
 */

// const $ = require("../utils/hopeu.js");

module.exports.utilsHandler = {
    //判断是什么浏览器
    isBrowser: function () {
        let userAgent = window.navigator.userAgent;
        if (userAgent.match(/UBrowser/i)) {
            return "UC";
        } else if (userAgent.match(/MicroMessenger/i)) {
            return "Weixin";
        } else if (userAgent.match(/QQBrowser/i)) {
            return "QQ";
        } else if (userAgent.match(/Firefox/i)) {
            return "Firefox";
        } else if (userAgent.match(/Chrome/i)) {
            return "Chrome";
        } else if (userAgent.match(/Safari/i)) {
            return "Safari";
        } else if (userAgent.match(/Opera/i)) {
            return "Opera";
        } else if (this.getIE() != 999 && this.getIE() != "edge") {
            return "Ie" + this.getIE();
        } else if (this.getIE() == "edge") {
            return "Edge";
        } else {
            return "None";
        }
    },
    //判断是否为空
    isEmpty: function (value) {
        return typeof value == "undefined" || value == null || value == "" ?
            true :
            false;
    },
    //判断是否为空对象
    isEmptyObject: function (value) {
        return !Object.keys(value).length;
    },
    //判断是否为ios
    isIos: function () {
        return !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    },
    //判断是否为android
    isAndroid: function () {
        return (
            navigator.userAgent.indexOf("Android") > -1 ||
            navigator.userAgent.indexOf("Linux") > -1
        );
    },
    //判断是否为pc端
    isPC: function () {
        let flag = true;
        let userAgentInfo = navigator.userAgent;
        let Agents = [
            "Android",
            "iPhone",
            "SymbianOS",
            "Windows Phone",
            "iPad",
            "iPod",
        ];
        for (let i = 0; i < Agents.length; i++) {
            if (userAgentInfo.indexOf(Agents[i]) > 0) {
                flag = false;
                break;
            }
        }
        return flag;
    },
    //判断是否为闰年
    isLeapYear: function (value) {
        return value % 400 == 0 || (value % 4 == 0 && value % 100 != 0);
    },
    //判断校验身份证信息
    isCardID: function (value) {
        let format = /^(([1][1-5])|([2][1-3])|([3][1-7])|([4][1-6])|([5][0-4])|([6][1-5])|([7][1])|([8][1-2]))\d{4}(([1][9]\d{2})|([2]\d{3}))(([0][1-9])|([1][0-2]))(([0][1-9])|([1-2][0-9])|([3][0-1]))\d{3}[0-9xX]$/;
        if (Object.prototype.toString.call(value).slice(8, -1) === "Number") {
            value = new String(value);
        }
        //初步校验-号码规则校验
        if (!format.test(value)) {
            return false;
        }
        //二级校验-区位码校验
        let year = value.substr(6, 4), //身份证年
            month = value.substr(10, 2), //身份证月
            day = value.substr(12, 2), //身份证日
            time = Date.parse(month + "-" + day + "-" + year), //身份证日期时间戳
            nowtime = Date.parse(new Date().toString()), //当前时间戳
            nowday = new Date(year, month, 0).getDate(); //身份证当月天数
        if (time > nowtime || day > nowday) {
            return false;
        }
        //三级校验-校验码判断 {https://jingyan.baidu.com/article/7f41ececff944a593d095c8c.html}
        let c = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //系数
        let b = ["1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2"]; //校验码对照表
        let idArr = value.split("");
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += parseInt(idArr[i]) * c[i];
        }
        if (idArr[17].toUpperCase() != b[sum % 11].toUpperCase()) {
            return false;
        }
        return true;
    },
    //num-数字 en-英文 chn-中文 lower-小写 upper-大写 phone-手机号码 tel-座机 url-网址 ip-IP地址 date-日期格式 email-邮箱 postal-邮政编码
    isVerify: function (type, value) {
        switch (type) {
            case "num":
                return /^[0-9]$/.test(value);
            case "en":
                return /^[a-zA-Z]+$/.test(value);
            case "chn":
                return /^[\u4E00-\u9FA5]+$/.test(value);
            case "lower":
                return /^[a-z]+$/.test(value);
            case "upper":
                return /^[A-Z]+$/.test(value);
            case "phone":
                return /^1[3|4|5|6|7|8|9][0-9]{9}$/.test(value);
            case "tel":
                return /^0\d{2,3}-\d{7,8}(-\d{1,6})?$/.test(value);
            case "url":
                return /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/.test(
                    value
                );
            case "ip":
                return /([0-9]{1,3}\.{1}){3}[0-9]{1,3}/.test(value);
            case "date":
                return (
                    /^(\d{4})\-(\d{2})\-(\d{2}) (\d{2})(?:\:\d{2}|:(\d{2}):(\d{2}))$/.test(
                        value
                    ) || /^(\d{4})\-(\d{2})\-(\d{2})$/.test(value)
                );
            case "email":
                return /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/.test(value);
            case "postal":
                return /[1-9]\d{5}(?!\d)/.test(value);
            default:
                return false;
        }
    },
    //获取IE版本
    getIE: function () {
        let userAgent = navigator.userAgent;
        let isIE =
            userAgent.indexOf("compatible") > -1 &&
            userAgent.indexOf("MSIE") > -1;
        let isEdge = userAgent.indexOf("Edge") > -1 && !isIE;
        let isIE11 =
            userAgent.indexOf("Trident") > -1 &&
            userAgent.indexOf("rv:11.0") > -1;
        if (isIE) {
            let reIE = new RegExp("MSIE (\\d+\\.\\d+);");
            reIE.test(userAgent);
            let fIEVersion = parseFloat(RegExp["$1"]);
            if (fIEVersion == 7) {
                return 7;
            } else if (fIEVersion == 8) {
                return 8;
            } else if (fIEVersion == 9) {
                return 9;
            } else if (fIEVersion == 10) {
                return 10;
            } else {
                return 6;
            }
        } else if (isEdge) {
            return "edge";
        } else if (isIE11) {
            return 11;
        } else {
            return 999;
        }
    },
    //获取url中指定参数值
    getQueryParam: function (param) {
        let r = window.location.search
            .substr(1)
            .match(new RegExp("(^|&)" + param + "=([^&]*)(&|$)")); //search,查询？后面的参数，并匹配正则
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return null;
        }
    },
    //url地址参数序列化
    parseQueryParam: function (url) {
        url = url == null ? window.location.href : url;
        let search = url.substring(url.lastIndexOf("?") + 1);
        if (!search) {
            return {};
        }
        return JSON.parse(
            '{"' +
            decodeURIComponent(search)
            .replace(/"/g, '\\"')
            .replace(/&/g, '","')
            .replace(/=/g, '":"') +
            '"}'
        );
    },
    //url参数对象反序列化
    stringfyQueryParam: function (paramObj) {
        if (!paramObj) return "";
        let temp = [];
        for (let key in paramObj) {
            let value = paramObj[key];
            if (value instanceof Array) {
                for (let i = 0; i < value.length; ++i) {
                    temp.push(
                        encodeURIComponent(key + "[" + i + "]") +
                        "=" +
                        encodeURIComponent(value[i])
                    );
                }
                continue;
            }
            temp.push(
                encodeURIComponent(key) +
                "=" +
                encodeURIComponent(paramObj[key])
            );
        }
        return temp.join("&");
    },
    //向url中追加参数
    updateQueryStringParameter: function (uri, key, value) {
        if (!value) {
            return uri;
        }
        let re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        let separator = uri.indexOf("?") !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, "$1" + key + "=" + value + "$2");
        } else {
            return uri + separator + key + "=" + value;
        }
    },
    //获取滚动条的位置坐标
    getScrollPosition: function (ele) {
        return {
            x: el.pageXOffset !== undefined ? el.pageXOffset : el.scrollLeft,
            y: el.pageYOffset !== undefined ? el.pageYOffset : el.scrollTop,
        };
    },
    //格式化日期
    formatDate: function (date, type) {
        if (arguments.length === 0) return null;
        if ((date + "").length === 10) {
            date = Number(date) * 1000;
        }
        let format = type || "yyyy-MM-dd hh:mm:ss",
            tempdate;
        if (typeof date === "object") {
            tempdate = date;
        } else {
            tempdate = new Date(date);
        }

        let formatObj = {
            yyyy: tempdate.getFullYear(),
            MM: tempdate.getMonth() + 1,
            dd: tempdate.getDate(),
            hh: tempdate.getHours(),
            mm: tempdate.getMinutes(),
            ss: tempdate.getSeconds(),
        };
        return format.replace(/(yyyy|MM|dd|hh|mm|ss)+/g, (result, key) => {
            let value = formatObj[key];
            if (result.length > 0 && value < 10) {
                value = "0" + value;
            }
            return value || 0;
        });
    },
    //生成指定范围的随机数
    getRangeRandomNum: function (min, max, returnType) {
        return returnType == "float" ?
            min + Math.random() * (max - min) :
            Math.floor(min + Math.random() * (max + 1 - min));
    },
    //格式化成货币格式
    getFormatCurrency: function (value) {
        return value
            .split("")
            .reverse()
            .join("")
            .replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,")
            .split("")
            .reverse()
            .join("");
    },
    //随机生成不重复的GUID
    guid: function (value) {
        let guid = "";
        for (let i = 1; i <= 32; i++) {
            let n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (i == 8 || i == 12 || i == 16 || i == 20) guid += "-";
        }
        return guid;
    },
    //随机生成色值
    getRandomColor: function () {
        return (
            "#" +
            (function (color) {
                return (color += "0123456789abcdef" [
                        Math.floor(Math.random() * 16)
                    ]) && color.length == 6 ?
                    color :
                    arguments.callee(color);
            })("")
        );
    },
    //密码强度校验
    checkPassword: function (str) {
        let level = 0;
        if (str.length < 6) {
            return level;
        }
        if (/[0-9]/.test(str)) {
            level++;
        }
        if (/[a-z]/.test(str)) {
            level++;
        }
        if (/[A-Z]/.test(str)) {
            level++;
        }
        if (/[\.|-|_]/.test(str)) {
            level++;
        }
        return level;
    },
    //一次执行函数
    once: function (func) {
        let ran, result;
        return function () {
            if (ran) {
                return result;
            }
            ran = true;
            result = func.apply(this, arguments);
            func = null;
            return result;
        };
    },
    //防抖函数
    debounce: function (func, wait) {
        let timer = null;
        let self = this;
        return function () {
            let args = arguments;
            timer && clearTimeout(timer);
            timer = setTimeout(function () {
                func.apply(self, args);
            }, wait);
        };
    },
    //节流函数
    throttle: function (func, wait) {
        let isExecute = false;
        let self = this;
        return function () {
            var args = Array.prototype.slice.apply(arguments);
            if (isExecute) {
                return;
            }
            isExecute = true;
            setTimeout(function () {
                func.apply(self, args);
                isExecute = false;
            }, wait);
        };
    },
    //过滤html操作符(防XSS)
    filterHtmlCode: function (str) {
        const tag = {
            "<": "&lt;",
            ">": "&gt;",
            "&": "&amp;",
            "(": "&#40;",
            ")": "&#41;",
            " ": "&nbsp;",
            '"': "&quot;",
            "'": "&#39;",
        };
        return str.replace(/[<>&|() '"]/g, function (chr) {
            return tag[chr];
        });
    },
    //反转义操作符
    restoreHtmlCode: function (str) {
        let s = "";
        if (str.length === 0) {
            return "";
        }
        s = str.replace(/&amp;/g, "&");
        s = s.replace(/&lt;/g, "<");
        s = s.replace(/&gt;/g, ">");
        s = s.replace(/&nbsp;/g, " ");
        s = s.replace(/&#39;/g, "\'");
        s = s.replace(/&quot;/g, "\"");
        s = s.replace(/&#40;/g, "(");
        s = s.replace(/&#41;/g, ")")
        return s;
    },
    //获取相对路径的绝对路径
    getAbsoluteUrl: function (url) {
        let a;
        if (!a) a = document.createElement("a");
        a.href = url;
        return a.href;
    },
    //深度拷贝
    deepClone: function (o) {
        if (typeof o === 'string' || typeof o === 'number' || typeof o === 'boolean' || typeof o === 'undefined') {
            return o
        } else if (Array.isArray(o)) {
            var _arr = []
            o.forEach(item => {
                _arr.push(item)
            })
            return _arr
        } else if (typeof o === 'object') {
            var _o = {}
            for (let key in o) {
                _o[key] = deepClone(o[key])
            }
            return _o
        }
    },
    //赋予元素拖拽功能
    drag: function (obj) {
        obj.onmousedown = function (e) {
            //鼠标按下事件

            let oe = e || window.event;
            let _this = this.parentNode.parentNode;
            let startX = oe.clientX - _this.offsetLeft;
            let startY = oe.clientY - _this.offsetTop;
            document.onmousemove = function (e) {
                //鼠标移动事件
                let oe = e || window.event;
                _this.style.left = oe.clientX - startX + "px";
                _this.style.top = oe.clientY - startY + "px";
            };

            document.onmouseup = function () {
                //鼠标松开事件
                document.onmousemove = null;
                document.onmouseup = null;
                if (_this.releaseCapture) {
                    //debug释放鼠标捕获
                    _this.releaseCapture();
                }
            };
            if (_this.setCapture) {
                //debug设置鼠标捕获
                _this.setCapture();
            }
            return false;
        };
    }
};