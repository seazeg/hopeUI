/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-06-16 15:10:43
 * @Description  : 日期时间选择器
 */

const Hope_datepicker = require("../utils/datepicker.core.js");
const Hope_mobile_datepicker = require("../utils/datepicker.mobile.core.js");
const { scrollbarHandler } = require("./scrollbar.js");
const { is } = require("../utils/is.js");

module.exports.datepickerHandler = function ({ ele, options, on }) {
    const obj = new Object();
    if (is.phone()) {
        Hope_mobile_datepicker.selectDate(
            ele,
            {
                start: options.mobileStart || 1920,
                end: options.mobileEnd || 2070,
                select: options.mobileSelectDate || [2021, 6, 16],
                title: options.mobileTitle || "日期选择",
            },
            function (data) {
                if (on && on.change) {
                    on.change(data);
                }
            }
        );
    } else {
        Hope_datepicker(ele, options, on, {
            scrollbarHandler: scrollbarHandler,
        });
    }

    return obj;
};
