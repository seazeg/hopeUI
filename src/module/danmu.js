/*
 * @Author       : Evan.G
 * @Date         : 2021-06-02 15:03:18
 * @LastEditTime : 2021-06-03 11:33:26
 * @Description  : 弹幕
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.danmuHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);

    let CHANNEL_COUNT = options.channel || 10; //通道数
    let MAX_DM_COUNT = Math.ceil(options.data.length / CHANNEL_COUNT); //通道内最多弹幕条数

    window.domPool = [];
    let danmuPool = options.data;
    let hasPosition = [];
    let colorList = options.colorList || ["#111"];

    init($dom);
    setInterval(function () {
        var channel = getChannel();
        if (/*danmuPool.length &&*/ channel != -1) {
            var dom = domPool[channel].shift();
            var danmu = danmuPool.shift();
            shootDanmu(dom, danmu, channel);
        }
    }, 1);

    function init(wrapper) {
        // 先new一些span 重复利用这些DOM
        wrapper.addClass("hopeui-danmu");
        for (var j = 0; j < CHANNEL_COUNT; j++) {
            var doms = [];
            for (var i = 0; i < MAX_DM_COUNT; i++) {
                // 要全部放进wrapper
                var dom = document.createElement("div");
                dom.appendChild(document.createElement("i"));
                var bg = document.createElement("span");
                bg.style.background =
                    colorList[getRangeRandomNum(0, colorList.length - 1)];
                bg.style.opacity = options.opacity || 0.4;
                dom.appendChild(bg);
                dom.setAttribute("data-channel", j);
                wrapper.get(0).appendChild(dom);

                // 初始化dom的位置 通过设置className
                dom.className = "hopeui-danmu-start hopeui-danmu-item";

                dom.style.top = j * 1.2 * dom.clientHeight + 10 + "px";
                dom.style.left =
                    wrapper.width() /** (j % 2 == 0 ? 1 : 1.05)*/ + "px";

                if (is.ie() > 9) {
                    dom.addEventListener("transitionend", (e) => {
                        var target = e.target;
                        target.className =
                            "hopeui-danmu-start hopeui-danmu-item";
                        target.style.transition = null;
                        target.style.left = wrapper.width() + "px";

                        domPool[target.getAttribute("data-channel")].push(
                            target
                        );
                    });
                } else {
                }

                doms.push(dom);
            }
            domPool.push(doms);
        }
        // hasPosition 标记每个通道目前是否有位置
        for (var i = 0; i < CHANNEL_COUNT; i++) {
            hasPosition[i] = true;
        }
    }

    function getChannel() {
        for (var i = 0; i < CHANNEL_COUNT; i++) {
            if (hasPosition[i] && domPool[i].length) return i;
        }
        return -1;
    }

    function shootDanmu(dom, text, channel) {
        if (text) {
            dom.children[0].innerHTML = text;
        }

        dom.className = "hopeui-danmu-end hopeui-danmu-item";

        if (is.ie() > 9) {
            dom.style.transition = `left ${options.speed || 7}s linear`;
            dom.style.left = "-" + dom.clientWidth + "px";
        } else {
            animation(dom, "-" + dom.clientWidth, function () {
                dom.style.left = $dom.width() + "px";
                domPool[channel].push(dom);
            });
        }

        hasPosition[channel] = false;

        setTimeout(function () {
            hasPosition[channel] = true;
        }, dom.clientWidth * 5);
    }

    function getRangeRandomNum(min, max, returnType) {
        return returnType == "float"
            ? min + Math.random() * (max - min)
            : Math.floor(min + Math.random() * (max + 1 - min));
    }

    function animation(dom, end, callback) {
        var timer = setInterval(function () {
            if (parseInt(dom.style.left) > end) {
                dom.style.left = parseInt(dom.style.left) - 1 + "px";
            } else {
                clearInterval(timer);
                if (callback) {
                    callback();
                }
            }
        }, 1);
    }
    return obj;
};
