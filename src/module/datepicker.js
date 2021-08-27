/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-08-27 16:53:59
 * @Description  : 日期时间选择器
 */

const Hope_datepicker = require("../utils/datepicker.core.js");
const Hope_mobile_datepicker = require("../utils/datepicker.mobile.core.js");
const { scrollbarHandler } = require("./scrollbar.js");
const { is } = require("../utils/is.js");

module.exports.datepickerHandler = function ({ ele, options, on }) {
    let obj = new Object();
    if (is.phone()) {
        let info = {
            start: options.mobileStart || 1920,
            end: options.mobileEnd || 2070,
            select: options.mobileSelectDate, //|| [2021, 8, 16, 1],
            title: options.mobileTitle || "日期选择",
            type: options.type || "date",
        };
        let mobileObj = Hope_mobile_datepicker.selectDate(ele, info, function (
            data
        ) {
            let format = options.format || "yyyy-MM-dd HH:mm:ss";
            let res = format
                .replace("yyyy", data.year || "2021")
                .replace("MM", data.month || "01")
                .replace("dd", data.day || "01")
                .replace("HH", data.hour || "00")
                .replace("mm", "00")
                .replace("ss", "00");

            $(ele).val(res);
            if (on && on.change) {
                on.change(data);
            }
        });

        obj.set = function (position) {
            var infoData = {}, now = new Date();

            if (!info.start || !info.end || info.end < info.start) {
                infoData.start = now.getFullYear() - 60;
                infoData.end = now.getFullYear();
            } else {
                infoData.start = info.start;
                infoData.end = info.end;
            }
            infoData.select = [
                position[0] - infoData.start,
                position[1] - 1,
                position[2] - 1,
                position[3],
            ];

            position.forEach(function (item,index) {
                mobileObj.locatePostion(index, infoData.select[index]);
            });
        };
    } else {
        obj = Hope_datepicker(ele, options, on, {
            scrollbarHandler: scrollbarHandler,
        });
    }

    return obj;
};
