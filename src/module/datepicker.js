/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-07 14:49:26
 * @Description  :
 */

const Hope_datepicker = require("../utils/datepicker.core.js");

module.exports.datepickerHandler = function ({ ele, options, on }) {
    const obj = new Object();
    Hope_datepicker(ele, options, on);

    return obj;
};
