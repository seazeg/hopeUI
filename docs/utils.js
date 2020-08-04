/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 14:55:35
 * @LastEditTime : 2020-08-04 15:11:37
 * @Description  :
 */

export const utils = {
    hump2Hyphen: function (s) {
        return s.replace(/([A-Z])/g, "-$1").toLowerCase();
    },
    json2css(json) {
        let _this = this;
        let css = "";
        Object.keys(json).forEach(function (key) {
            css += `${_this.hump2Hyphen(key)}:${json[key]};`;
        });
        return css;
    },
};
