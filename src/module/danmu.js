/*
 * @Author       : Evan.G
 * @Date         : 2021-06-02 15:03:18
 * @LastEditTime : 2021-09-17 17:33:17
 * @Description  : 弹幕
 */

const $ = require("../utils/hopeu.js");
const {
    is
} = require("../utils/is.js");
const {
    utilsHandler
} = require("./utils.js");

module.exports.danmuHandler = function ({
    ele,
    options,
    on
}) {
    const obj = new Object();
    let $dom = $(ele);

    let CHANNEL_COUNT = options.channel || 3; //通道数
    let MAX_DM_COUNT = Math.ceil(
        utilsHandler.deepClone(options.data).length / CHANNEL_COUNT
    ); //通道内最多弹幕条数

    let domPool = [];
    let danmuPool = utilsHandler.deepClone(options.data);
    let hasPosition = [];
    let colorList = options.bgColor || ["#111"];
    let unit = "px";
    let isMask = options.isMask;
    let spacing = options.spacing;
    let maskColor = options.maskColor || {
        left: "#fff",
        right: "#fff",
    };
    let timer = null;
    let animationT = null;

    init($dom);

    function init(wrapper) {
        // 先new一些span 重复利用这些DOM
        hasPosition = [];
        domPool = [];
        danmuPool = utilsHandler.deepClone(options.data);

        wrapper.addClass("hopeui-danmu");
        for (let j = 0; j < CHANNEL_COUNT; j++) {
            let doms = [];
            for (let i = 0; i < MAX_DM_COUNT; i++) {
                // 要全部放进wrapper
                let dom = document.createElement("div");
                dom.appendChild(document.createElement("i"));
                let bg = document.createElement("span");
                bg.style.background =
                    colorList[getRangeRandomNum(0, colorList.length - 1)];

                bg.style.opacity = options.opacity || 0.4;
                dom.appendChild(bg);
                dom.setAttribute("data-channel", j);
                dom.setAttribute("data-start", wrapper.get(0).clientWidth);
                wrapper.get(0).appendChild(dom);

                // 初始化dom的位置 通过设置className
                dom.className = "hopeui-danmu-start hopeui-danmu-item";

                dom.style.top =
                    j * (spacing || 1.2) * dom.clientHeight + 10 + unit;
                dom.style.left = wrapper.get(0).clientWidth + unit;
                if (is.ie() > 9) {
                    $(dom)
                        .off()
                        .on("transitionend", function (e) {
                            var target = e.target;
                            target.className =
                                "hopeui-danmu-start hopeui-danmu-item";
                            target.style.transition = null;
                            target.style.left =
                                wrapper.get(0).clientWidth + unit;
                            domPool[target.getAttribute("data-channel")].push(
                                target
                            );
                        });
                }

                doms.push(dom);
            }
            domPool.push(doms);
        }
        // hasPosition 标记每个通道目前是否有位置
        for (let i = 0; i < CHANNEL_COUNT; i++) {
            hasPosition[i] = true;
        }

        if (isMask && is.ie() > 9) {
            wrapper
                .append(
                    `<div class="hopeui-danmu-leftMask" style="background-image: linear-gradient(to right, ${maskColor.left}, transparent);"></div>`
                )
                .append(
                    `<div class ="hopeui-danmu-rightMask" style="background-image: linear-gradient(to left, ${maskColor.right}, transparent);"></div>`
                );
        }
        timer = setInterval(function () {
            let channel = getChannel();
            if ( /*danmuPool.length &&*/ channel != -1) {
                let dom = domPool[channel].shift();
                let danmu = danmuPool.shift();
                shootDanmu(dom, danmu, channel);
            }
        }, 1);
    }

    obj.close = function () {
        clearInterval(timer);
        timer = null;
        $dom.children(".hopeui-danmu-item").off();
        $dom.children().remove();
    };

    obj.open = function () {
        if (!timer) {
            init($dom);
        }
    };

    obj.hide = function () {
        if (!$dom.hasClass("hopeui-danmu-close")) {
            $dom.addClass("hopeui-danmu-close");
        }
    };

    obj.show = function () {
        if ($dom.hasClass("hopeui-danmu-close")) {
            $dom.removeClass("hopeui-danmu-close");
        }
    };

    function getChannel() {
        for (let i = 0; i < CHANNEL_COUNT; i++) {
            if (hasPosition[i] && domPool[i].length) return i;
        }
        return -1;
    }

    function shootDanmu(dom, text, channel) {
        if (text) {
            dom.children[0].innerHTML = text;
        }
        if (!dom.children[0].innerHTML) {
            dom.style.display = "none";
        }

        dom.className = "hopeui-danmu-end hopeui-danmu-item";

        if (is.ie() > 9) {
            dom.style.transition = `left ${options.speed + $(dom).width()/ 60|| 7}s linear`;
            dom.style.left = "-" + dom.clientWidth + unit;
        } else {
            animation(dom, "-" + dom.clientWidth, function () {
                dom.style.left = dom.getAttribute("data-start") + unit;
                domPool[channel].push(dom);
            });
        }

        hasPosition[channel] = false;
        setTimeout(
            function () {
                hasPosition[channel] = true;
            },
            is.ie() > 9 ? (options.speed + $(dom).width()/ 60) * 1000: 300 * 100
        );
    }

    function getRangeRandomNum(min, max, returnType) {
        return returnType == "float" ?
            min + Math.random() * (max - min) :
            Math.floor(min + Math.random() * (max + 1 - min));
    }

    function animation(dom, end, callback) {
        animationT = setInterval(function () {
            if (parseInt(dom.style.left) > end) {
                dom.style.left = parseInt(dom.style.left) - 1 + unit;
            } else {
                clearInterval(animationT);
                if (callback) {
                    callback();
                }
            }
        }, 1);
    }

    return obj;
};