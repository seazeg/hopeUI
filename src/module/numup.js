/*
 * @Author       : Evan.G
 * @Date         : 2020-12-17 14:48:09
 * @LastEditTime : 2020-12-17 15:24:28
 * @Description  : 数字自增效果
 */

const $ = require("../utils/hopeu.js");

module.exports.numupHandler = function ({ ele, options, on }) {
    const obj = new Object();
    options = options || {};

    let $dom = $(ele),
        time = options.time || +$dom.attr("hopeui-numup-time") || 2000, //总时间--毫秒为单位
        finalNum = options.num || +$dom.attr("hopeui-numup-num"), //要显示的真实数值
        speed = options.speed || +$dom.attr("hopeui-numup-speed") || 100, //调速器，改变regulator的数值可以调节数字改变的速度
        step = finalNum / (time / speed),
        count = 0,
        initial = 0;

    let timer = setInterval(function () {
        count = count + step;

        if (count >= finalNum) {
            clearInterval(timer);
            count = finalNum;
            if (on.end) {
                on.end({
                    ele: $dom.get(0),
                    event: "timeEnd",
                });
            }
        }

        let t = Math.floor(count);
        if (t == initial) return;
        initial = t;
        $dom.html(getFormatCurrency(initial));
    }, 30);

    return obj;
};

function getFormatCurrency(value) {
    return value
        .toString()
        .split("")
        .reverse()
        .join("")
        .replace(/(\d{3}(?=\d)(?!\d+\.|$))/g, "$1,")
        .split("")
        .reverse()
        .join("");
}
