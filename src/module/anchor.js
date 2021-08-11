/*
 * @Author       : Evan.G
 * @Date         : 2021-07-02 16:34:29
 * @LastEditTime : 2021-08-10 16:35:19
 * @Description  : 锚点定位
 */

const $ = require("../utils/hopeu.js");

module.exports.anchorHandler = function ({
    ele,
    options,
    on
}) {
    const obj = new Object();
    let $dom = $(ele);
    let anchorObj = {};
    let temp = null;

    function scrollAnimation(currentY, targetY, callback) {
        // 获取当前位置方法
        let needScrollTop = targetY - currentY;
        let _currentY = currentY;
        setTimeout(function () {
            // 一次调用滑动帧数，每次调用会不一样
            const dist = Math.ceil(needScrollTop / 10);
            _currentY += dist;
            window.scrollTo(_currentY, currentY);

            // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
            if (needScrollTop > 10 || needScrollTop < -10) {
                scrollAnimation(_currentY, targetY);
            } else {
                window.scrollTo(_currentY, targetY);
                if (on && on.jumpOver) {
                    on.jumpOver({
                        ele: temp,
                    });
                }
            }
        }, 10);
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
            $("[hope-anchor-value]").each(function () {
                let _this = $(this);
                let value = _this.attr("hope-anchor-value");
                anchorObj[value] = {
                    ele: _this.get(0),
                    top: _this.offset().top,
                    offset: options.offset || 0,
                    value: value,
                };
            });

            $dom.find("[hope-anchor-key]").on("click", function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else {
                    window.event.cancelBubble = true;
                }
                if (e.preventDefault) {
                    e.preventDefault();
                } else {
                    window.event.returnValue = false;
                }

                let _this = $(this);
                let value = _this.attr("hope-anchor-key");
                temp = anchorObj[value];
                if (temp) {
                    scrollAnimation(
                        document.documentElement.scrollTop ||
                        document.body.scrollTop,
                        temp.top - temp.offset
                    );
                } else {
                    throw new Error("No the anchor!");
                }
            });

            obj.goLocation = function (value) {
                temp = anchorObj[value];
                if (temp) {
                    scrollAnimation(
                        document.documentElement.scrollTop ||
                        document.body.scrollTop,
                        temp.top - temp.offset
                    );
                } else {
                    throw new Error("No the anchor!");
                }
            };

            if (on && on.init) {
                on.init(obj);
            }
        }
    };

    return obj;
};