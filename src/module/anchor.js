/*
 * @Author       : Evan.G
 * @Date         : 2021-07-02 16:34:29
 * @LastEditTime : 2021-07-02 18:13:25
 * @Description  : 锚点定位
 */

const $ = require("../utils/hopeu.js");

module.exports.anchorHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    let anchorObj = {};
    let timer = null;
    let distance = 0;

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            function animation(start, end, speed) {
                timer = setInterval(function () {
                    distance = start + distance;
                    if (start < end) {
                        distance = distance + 100;
                        $("html,body").scrollTop(distance);
                        if (distance >= end) {
                            clearInterval(timer);
                        }
                    } else {
                        distance = distance - 100;
                        $("html,body").scrollTop(distance);
                        if (distance <=end) {
                            clearInterval(timer);
                            distance = 0;
                        }
                    }
                 
                }, 10);
            }
            $("[hope-anchor-value]").each(function () {
                let _this = $(this);
                let value = _this.attr("hope-anchor-value");
                anchorObj[value] = {
                    top: _this.offset().top,
                    offset: options.offset || 0,
                    value: value,
                };
            });

            $dom.find("[hope-anchor-key]").on("click", function () {
                let _this = $(this);
                let value = _this.attr("hope-anchor-key");
                let temp = anchorObj[value];
                animation(
                    $("html,body").scrollTop(),
                    temp.top - temp.offset,
                    500
                );
            });
        }
    };

    return obj;
};
