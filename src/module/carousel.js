/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-03 11:30:49
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const Hope_carousel = require("../utils/carousel.core.js");

module.exports.carouselHandler = function ({ ele, options, on }) {
    let opt = Object.assign(options || {}, on || {});
    let obj = [];
    if ($(ele).length > 1) {
        Array.from($(ele)).forEach(function (item, index) {
            obj.push(new Hope_carousel(ele, opt, index));
        });
    } else {
        obj = new Hope_carousel(ele, opt, 0);
    }
    return obj;
};
