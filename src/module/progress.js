/*
 * @Author       : Evan.G
 * @Date         : 2021-06-03 14:51:09
 * @LastEditTime : 2021-06-10 15:25:20
 * @Description  : 进度条
 */

const $ = require("../utils/hopeu.js");
const { utilsHandler } = require("./utils.js");

module.exports.progressHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    let temp = null;
    let timer = null;
    init();
    function init() {
        $dom.addClass("hopeui-progress");
        let inner = document.createElement("div");
        let label = document.createElement("span");
        inner.className = "hopeui-progress-inner";
        inner.style.width = options.progress + "%";
        inner.style.height = options.height || "20px";
        label.style.lineHeight = options.height || "20px";
        label.innerText = options.progress + "%";
        if (options.isLabel && parseInt(options.height) >= 20) {
            inner.appendChild(label);
        }
        $dom.get(0).appendChild(inner);
    }
    obj.setProgress = utilsHandler.throttle(function (value, callback) {
        let w = $dom.width();
        let inner = $dom.children(".hopeui-progress-inner").get(0);
        let label = $dom
            .children(".hopeui-progress-inner")
            .children("span")
            .get(0);
        // if (temp != value) {
        //     temp = value;
        //     clearInterval(timer);
        // }else{
        //     clearInterval(timer);
        // }
        clearInterval(timer);
        timer = setInterval(function () {
            let len = parseInt((inner.offsetWidth / w) * 100);
            if (len < value) {
                inner.style.width = inner.offsetWidth + 1 + "px";
                label.innerHTML = len + "%";

                if (callback) {
                    if (len != inner.getAttribute("hope-progress-value")) {
                        callback(len);
                    }
                }
                inner.setAttribute(
                    "hope-progress-value",
                    parseInt((inner.offsetWidth / w) * 100)
                );
                if (len >= value) {
                    clearInterval(timer);
                }
            } else {
                inner.style.width = inner.offsetWidth - 1 + "px";
                label.innerHTML = len + "%";
                if (callback) {
                    if (len != inner.getAttribute("hope-progress-value")) {
                        callback(len);
                    }
                }
                inner.setAttribute(
                    "hope-progress-value",
                    parseInt((inner.offsetWidth / w) * 100)
                );
                if (len <= value) {
                    clearInterval(timer);
                }
            }

        
        }, 1);
    }, 100);

    return obj;
};
