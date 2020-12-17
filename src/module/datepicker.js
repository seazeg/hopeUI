/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-17 14:48:59
 * @Description  : 日期时间选择器
 */

const Hope_datepicker = require("../utils/datepicker.core.js");
const { scrollbarHandler } = require("./scrollbar.js");

module.exports.datepickerHandler = function ({ ele, options, on }) {
    const obj = new Object();
    Hope_datepicker(ele, options, on, { scrollbarHandler: scrollbarHandler });

    return obj;
};
