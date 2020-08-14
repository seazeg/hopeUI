/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-14 17:34:09
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.tabHandler = function({ ele, options, on }) {
    const $dom = $(ele),
        obj = new Object(),
        domWidth = $(ele).width();

    if (options.slideSwitch && supportCss3("transform")) {
        $dom.find(".hopeui-tab-content")
            .width(domWidth)
            .addClass("hopeui-tab-switch");
        $dom.find(".hopeui-tab-inner").width(
            $dom.find(".hopeui-tab-item").length * domWidth
        );
        $dom.find(".hopeui-tab-item").width(domWidth);

        let startX,
            endX,
            moveX,
            moveDistance,
            targetIndex,
            switchDistance = domWidth; //点击开始坐标，点击结束坐标，移动时坐标，移动位移距离
        $dom.find(".hopeui-tab-item").on("touchstart", function(e) {
            e.preventDefault();
            startX = e.changedTouches[0].pageX;
            targetIndex = $(this).index();
        });

        $dom.find(".hopeui-tab-item").on("touchmove", function(e) {
            e.preventDefault();
            moveX = e.changedTouches[0].pageX;
            moveDistance = moveX - startX;

            if (moveDistance > 500) {
                moveDistance = 500;
            } else if (moveDistance < -500) {
                moveDistance = -500;
            }
        });

        $dom.find(".hopeui-tab-item").on("touchend", function(e) {
            e.preventDefault();
            endX = e.changedTouches[0].pageX;
            let tranRight = endX - startX;

            if (tranRight < 0) {
                switchDistance = domWidth * (targetIndex + 1);
                $dom.find("li")
                    .eq(targetIndex + 1)
                    .addClass("hopeui-tab-this")
                    .siblings()
                    .removeClass("hopeui-tab-this");
                if (
                    switchDistance !=
                    domWidth * $dom.find(".hopeui-tab-item").length
                ) {
                    $(".hopeui-tab-inner").css({
                        transform: `translateX(${-switchDistance}px)`,
                        transition: "all .5s",
                    });
                }
            } else if (tranRight > 0) {
                switchDistance = domWidth * (targetIndex - 1);
                $dom.find("li")
                    .eq(targetIndex - 1)
                    .addClass("hopeui-tab-this")
                    .siblings()
                    .removeClass("hopeui-tab-this");

                if (switchDistance >= 0) {
                    $(".hopeui-tab-inner").css({
                        transform: `translateX(${-switchDistance}px)`,
                        transition: "all .5s",
                    });
                }
            }
        });

        $dom.find("li").on("click", function(e) {
            $(this)
                .addClass("hopeui-tab-this")
                .siblings()
                .removeClass("hopeui-tab-this");

            switchDistance = domWidth * $(this).index();

            $dom.find(".hopeui-tab-inner").css({
                transform: `translateX(${-switchDistance}px)`,
                transition: "all .5s",
            });

            if (on.change) {
                on.change({
                    index: $(this).index(),
                    targetEle: this,
                    targetEleContent: $(this)
                        .parent().parent()
                        .siblings(".hopeui-tab-content")[0],
                    eventName: "change",
                });
            }
        });
    } else {
        $dom.find(".hopeui-tab-item")
            .eq(0)
            .addClass("hopeui-show");

        $dom.find("li").on("click", function(e) {
            $(this)
                .addClass("hopeui-tab-this")
                .siblings()
                .removeClass("hopeui-tab-this");

            $(this)
                .parents(".hopeui-tab-title")
                .siblings(".hopeui-tab-content")
                .find(".hopeui-tab-item")
                .eq($(this).index())
                .addClass("hopeui-show")
                .siblings()
                .removeClass("hopeui-show");

            if (on.change) {
                on.change({
                    index: $(this).index(),
                    targetEle: this,
                    targetEleContent: $(this)
                        .parents(".hopeui-tab-title")
                        .siblings(".hopeui-tab-content")[0],
                    eventName: "change",
                });
            }
        });
    }

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    return obj;
};

function supportCss3(style) {
    var prefix = ["webkit", "Moz", "ms", "o"],
        i,
        humpString = [],
        htmlStyle = document.documentElement.style,
        _toHumb = function(string) {
            return string.replace(/-(\w)/g, function($0, $1) {
                return $1.toUpperCase();
            });
        };
    for (i in prefix) humpString.push(_toHumb(prefix[i] + "-" + style));
    humpString.push(_toHumb(style));
    for (i in humpString) if (humpString[i] in htmlStyle) return true;
    return false;
}
