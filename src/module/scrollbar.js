/*
 * @Author       : Evan.G
 * @Date         : 2020-08-24 13:49:24
 * @LastEditTime : 2021-08-11 17:50:07
 * @Description  : 自定义滚动条
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.scrollbarHandler = function ({ ele, options, on }) {
    // if ($(ele).find(".hopeui-scrollbar-bar").length <= 0) {
    const obj = new Object();
    let $dom = null;
    let listTemp = $(ele).addClass("hopeui-scrollbar").html();
    let listWidth = $(ele).outerWidth();
    let scrollY = 0;
    // if (options && options.height) {

    //     $(ele).css("height", options.height + "px");
    // }

    if ($(ele).find(".hopeui-scrollbar-box").length <= 0) {
        $(ele).html(
            `<div class="hopeui-scrollbar-box ${
                is.ie() <= 11 ? "ieFix" : ""
            }">${listTemp}</div>`
        );
    } else {
        $dom = $(ele)
            .addClass("hopeui-scrollbar")
            .children()
            .addClass("hopeui-scrollbar-box")
            .get(0);
    }

    $(ele)
        .find(".hopeui-scrollbar-box")
        .css("width", listWidth + 20 + "px");


    if ($(ele).find(".hopeui-scrollbar-bar").length > 0) {
        $(ele).find(".hopeui-scrollbar-bar").remove();
    }

    let $bar = $('<span class="hopeui-scrollbar-bar"></span>').insertAfter(
        $(ele).children()
    );
    $dom = $(ele).children();

    if ($dom.get(0).scrollHeight < 200) {
        let highTotal = 0;
        $(ele)
            .find(".option")
            .each(function () {
                highTotal += $(this).height() || 0;
            });
        $(ele).css("height", highTotal + 15);
    } else {
        if ((options && options.height) || $(ele).height()) {
            $(ele).css("height", options.height);
        } else {
            $(ele).css("height", ($(ele).find(".option").eq(0).height() || 200) + 'px');
        }
    }

    let rate = $dom.get(0).clientHeight / $dom.get(0).scrollHeight;

    let barHeight = rate * $dom.get(0).clientHeight;

    if (rate < 1) {
        $bar.css("height", barHeight + "px");
        if (options && options.autoHideBar) {
            $bar.css({
                opacity: 0,
            });
        }
    } else {
        $bar.css({
            display: "none",
        });
    }

    $dom.off().on("scroll", function () {
        let distance = this.scrollTop * rate;
        if (options && options.autoHideBar) {
            $bar.css({
                opacity: 1,
            });
            autoHideBar(distance, $bar);
        }

        $bar.css("top", distance + "px");

        if (on && on.scroll) {
            on.scroll({
                max: $dom.get(0).clientHeight - barHeight,
                distance: distance,
                eventName: "scroll",
            });
        }
    });

    $bar.css("top", $dom.get(0).scrollTop * rate + "px");

    let darg = (obj, content) => {
        obj.onmousedown = function (e) {
            //鼠标按下事件

            let oe = e || window.event;
            let _this = this;
            let startY = oe.clientY - _this.offsetTop;
            document.onmousemove = function (e) {
                //鼠标移动事件
                let oe = e || window.event;
                if (
                    (parseFloat(_this.style.top) >= 0 &&
                        parseFloat(_this.style.top) <=
                            content.offsetHeight - _this.offsetHeight) ||
                    !_this.style.top
                ) {
                    _this.style.top = oe.clientY - startY + "px";

                    if (
                        parseFloat(_this.style.top) >=
                        content.offsetHeight - _this.offsetHeight
                    ) {
                        _this.style.top =
                            content.offsetHeight - _this.offsetHeight + "px";
                    } else if (parseFloat(_this.style.top) < 0) {
                        _this.style.top = 0;
                    }
                    content.scrollTop = parseFloat(_this.style.top) / rate;
                }
            };

            document.onmouseup = function () {
                //鼠标松开事件
                document.onmousemove = null;
                document.onmouseup = null;
                if (_this.releaseCapture) {
                    //debug释放鼠标捕获
                    _this.releaseCapture();
                }
            };
            if (_this.setCapture) {
                //debug设置鼠标捕获
                _this.setCapture();
            }
            return false;
        };
    };

    darg($bar.get(0), $dom.get(0));

    function autoHideBar(y, $bar) {
        scrollY = y;
        setTimeout(() => {
            if (y == scrollY) {
                $bar.css({
                    opacity: 0,
                });
            } else {
                $bar.css({
                    opacity: 1,
                });
            }
        }, 500);
    }

    if (on && on.init) {
        on.init({
            ele: $(ele).get(0),
        });
    }

    obj.setDistance = function (distance, callback) {
        $bar.css("top", distance + "px");
        $dom.get(0).scrollTop = parseFloat(distance) / rate;
        if (callback) {
            callback();
        }
    };

    return obj;
    // }
};
