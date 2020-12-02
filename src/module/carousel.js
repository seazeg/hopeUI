/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-02 16:33:52
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const hope_carousel = require("../utils/carousel.core.js");

module.exports.carouselHandler = function ({ ele, options, on }) {
    opt = Object.assign(options || {}, on || {});
    const obj = new hope_carousel(ele, opt);
    return obj;
};
