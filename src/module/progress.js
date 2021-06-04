/*
 * @Author       : Evan.G
 * @Date         : 2021-06-03 14:51:09
 * @LastEditTime : 2021-06-04 11:16:34
 * @Description  : 进度条
 */

const $ = require("../utils/hopeu.js");
const { utilsHandler } = require("../module/utils.js");
const { is } = require("../utils/is.js");

module.exports.progressHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    init();
    function init() {
        $dom.addClass("hopeui-progress");
        let inner = document.createElement("div");
        let label = document.createElement("span");
        inner.className = "hopeui-progress-inner";
        inner.style.width = options.progress + "%";
        inner.style.height = options.height || "20px";
        if (is.ie() > 9) {
            inner.style.transition = `width ${options.speed/10}s`;
        }
        label.style.lineHeight = options.height || "20px";
        label.innerText = options.progress + "%";
        if (options.isLabel && parseInt(options.height) >= 20) {
            inner.appendChild(label);
        }
        $dom.get(0).appendChild(inner);
    }
    obj.setProgress = function (value, callback) {
        let inner = $dom.children(".hopeui-progress-inner");
        let label = inner.children("span");

        const timer = setInterval(function () {
            let start = parseInt(inner.get(0).style.width);
            if (start < value) {
                if (start != value) {
                    if (is.ie() <= 9) {
                        inner.css("width", start + 1 + "%");
                    }

                    label.text(start + 1 + "%");
                } else {
                    clearInterval(timer);
                    if (callback) {
                        callback();
                    }
                }
            } else {
                if (start != value) {
                    if (is.ie() <= 9) {
                        inner.css("width", start - 1 + "%");
                    }
                    label.text(start - 1 + "%");
                } else {
                    clearInterval(timer);
                    if (callback) {
                        callback();
                    }
                }
            }
        }, options.speed);
        if (is.ie() > 9) {
            inner.css("width", value + "%");
        }
    };

    return obj;
};
