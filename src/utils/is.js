/*
 * @Author       : Evan.G
 * @Date         : 2020-08-18 16:04:09
 * @LastEditTime : 2020-08-21 14:12:31
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
    noPer(str){
        return !str.includes("%")
    }
};
