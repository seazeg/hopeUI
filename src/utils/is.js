/*
 * @Author       : Evan.G
 * @Date         : 2020-08-18 16:04:09
 * @LastEditTime : 2020-08-24 10:00:40
 * @Description  : is类
 */
module.exports.is = {
    phone() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(
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
        let Sys = {};
        let ua = navigator.userAgent.toLowerCase();
        let ie_version = null;
        if (window.ActiveXObject) {
            Sys.ie = ua.match(/msie ([\d.]+)/)[1];
            //获取版本
            if (Sys.ie.indexOf("7") > -1) {
                ie_version = 7;
            }
            if (Sys.ie.indexOf("8") > -1) {
                ie_version = 8;
            }
            if (Sys.ie.indexOf("9") > -1) {
                ie_version = 9;
            }
            if (Sys.ie.indexOf("10") > -1) {
                ie_version = 10;
            }
            if (Sys.ie.indexOf("11") > -1) {
                ie_version = 11;
            }
        }
        return ie_version;
    },
    os() {
        let agent = navigator.userAgent.toLowerCase();
        let isMac = /macintosh|mac os x/i.test(navigator.userAgent);
        let res = null;
        if (agent.indexOf("win32") >= 0 || agent.indexOf("wow32") >= 0) {
            res = "win";
        }
        if (agent.indexOf("win64") >= 0 || agent.indexOf("wow64") >= 0) {
            res = "win";
        }
        if (isMac) {
            res = "mac";
        }
        return res;
    },
    supportCss3(style) {
        var prefix = ["webkit", "Moz", "ms", "o"],
            i,
            humpString = [],
            htmlStyle = document.documentElement.style,
            _toHumb = function(string) {
                return string.replace(/-(\w)/g, function($0, $1) {
                    return $1.toUpperCase();
                });
            };
        for (i in prefix) humpString.push(_toHumb(prefix[i] + "-" + style));
        humpString.push(_toHumb(style));
        for (i in humpString) if (humpString[i] in htmlStyle) return true;
        return false;
    },
    noPer(str) {
        return !str.includes("%");
    },
};
