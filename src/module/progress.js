/*
 * @Author       : Evan.G
 * @Date         : 2021-06-03 14:51:09
 * @LastEditTime : 2021-06-11 16:57:11
 * @Description  : 进度条
 */

const $ = require("../utils/hopeu.js");
const { utilsHandler } = require("./utils.js");

module.exports.progressHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    let timer = null;

    function init() {
        $dom.addClass("hopeui-progress");
        let inner = document.createElement("div");
        let label = document.createElement("span");
        inner.className = "hopeui-progress-inner";
        inner.style.width = options.progress + "%";
        inner.style.height = options.height || "20px";
        label.style.lineHeight = options.height || "20px";
        label.innerText = options.progress + "%";
        inner.appendChild(label);
        if (options.isLabel && parseInt(options.height) < 20) {
            label.style.display = "none";
        }
        $dom.get(0).appendChild(inner);

        if (on.init) {
            on.init({
                ele: $dom,
                progress: obj,
                event: "init",
            });
        }
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

            if (len <= value) {
                inner.style.width = inner.offsetWidth + 1 + "px";
                label.innerHTML = len + "%";

                if (callback) {
                    let added = parseInt((inner.offsetWidth / w) * 100);
                    if (len != added) {
                        callback(added);
                    }
                }

                if (len >= value) {
                    clearInterval(timer);
                }
            } else {
                inner.style.width = inner.offsetWidth - 1 + "px";
                label.innerHTML = len + "%";
                if (callback) {
                    let added = parseInt((inner.offsetWidth / w) * 100);
                    if (len != added) {
                        callback(added);
                    }
                }
                
                if (len <= value) {
                    clearInterval(timer);
                }
            }
        }, 1);
    }, 100);

    init();

    return obj;
};
