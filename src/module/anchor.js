/*
 * @Author       : Evan.G
 * @Date         : 2021-07-02 16:34:29
 * @LastEditTime : 2021-07-05 11:30:26
 * @Description  : 锚点定位
 */

const $ = require("../utils/hopeu.js");

module.exports.anchorHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    let anchorObj = {};

    function scrollAnimation(currentY, targetY) {
        // 获取当前位置方法
        let needScrollTop = targetY - currentY;
        let _currentY = currentY;
        setTimeout(() => {
            // 一次调用滑动帧数，每次调用会不一样
            const dist = Math.ceil(needScrollTop / 10);
            _currentY += dist;
            window.scrollTo(_currentY, currentY);
            // 如果移动幅度小于十个像素，直接移动，否则递归调用，实现动画效果
            if (needScrollTop > 10 || needScrollTop < -10) {
                scrollAnimation(_currentY, targetY);
            } else {
                window.scrollTo(_currentY, targetY);
            }
        }, 10);
    }

    document.onreadystatechange = function () {
        if (document.readyState == "complete") {
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
                scrollAnimation(
                    document.documentElement.scrollTop ||
                        document.body.scrollTop,
                    temp.top - temp.offset
                );
            });
        }
    };

    return obj;
};
