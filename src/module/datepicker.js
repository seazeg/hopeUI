/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-08 13:44:01
 * @Description  :
 */

const Hope_datepicker = require("../utils/datepicker.core.js");
const { scrollbarHandler } = require("./scrollbar.js");

module.exports.datepickerHandler = function ({ ele, options, on }) {
    const obj = new Object();
    Hope_datepicker(ele, options, on, { scrollbarHandler: scrollbarHandler });

    return obj;
};
