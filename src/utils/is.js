/*
 * @Author       : Evan.G
 * @Date         : 2020-08-18 16:04:09
 * @LastEditTime : 2021-07-30 10:25:22
 * @Description  : 基础判断类
 */
module.exports.is = {
    phone() {
        return /phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone/i.test(
            window.navigator.userAgent
        );
    },
    landscape() {
        return (
            document.documentElement.clientWidth >
            document.documentElement.clientHeight
        );
    },
    ie() {
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
    os() {
        let agent = navigator.userAgent.toLowerCase();
        let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        let res = null;
        if (agent.indexOf("win") >= 0) {
            res = "win";
        }
        if (isMac) {
            res = "mac";
        }
        return res;
    },
    supportCss3(style) {
        let prefix = ["webkit", "Moz", "ms", "o"],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function (string) {
                return string.replace(/-(\w)/g, function ($0, $1) {
                    return $1.toUpperCase();
                });
            };
        for (i in prefix) humpString.push(_toHumb(prefix[i] + "-" + style));
        humpString.push(_toHumb(style));
        for (i in humpString)
            if (humpString[i] in htmlStyle) return true;
        return false;
    },
    stopBubble(e) {
        if (e && e.stopPropagation) {
            e.stopPropagation();
        } else {
            window.event.cancelBubble = true;
        }
    },
    stopDefault(e) {
        if (e && e.preventDefault) {
            e.preventDefault();
        } else {
            window.event.returnValue = false;
        }
        return false;
    },
    noPer(str) {
        return !str.includes("%");
    },
    empty(str) {
        return typeof str == "undefined" || str == null || (str == "" && typeof str == 'string') ?
            true :
            false;
    }
};