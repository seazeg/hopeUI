/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-04-20 20:19:44
 * @Description  : 文本框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");
const { is } = require("../utils/is.js");

module.exports.inputHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=text],input[type=password]");
    if (ele) {
        // $dom = $(`input${ele}`);
        $dom = $(ele);
    }

    $dom.each(function () {
        let $this = $(this);

        if (options && options.extendContent && options.extendContentLocation) {
            if (options.extendContentLocation == "left") {
                let newBox = $(
                    '<div class="hopeui-relative"></div>'
                ).insertBefore($this);
                $this.appendTo(newBox);
                newBox.css("width", $this.get(0).offsetWidth);
                $this
                    .before(options.extendContent)
                    .prev()
                    .addClass("hopeui-input-content-left");

                let eConWidth = $(this).prev().get(0).offsetWidth;
                $(this).css("padding-left", eConWidth + 10 + "px");
            } else {
                let newBox = $(
                    '<div class="hopeui-relative hopeui-input-warp"></div>'
                ).insertAfter($this);
                $this.appendTo(newBox);
                newBox.css("width", $this.get(0).offsetWidth);
                $this
                    .after(options.extendContent)
                    .next()
                    .addClass("hopeui-input-content-right");

                let eConWidth = $(this).next().get(0).offsetWidth;
                $(this).css("padding-right", eConWidth + 10 + "px");
            }
        }

        if (is.ie() <= 9) {
            let isHide = "";
            if ($this.val()) {
                isHide = "hopeui-hide";
            }
            $this
                .after(
                    `<label class="hopeui-placeholder ${isHide}">${
                        $this.attr("placeholder") || ""
                    }</label>`
                )
                .parent()
                .css("position", "relative");

            $this.next().css({
                lineHeight: $this.css("height") + 2,
                paddingLeft: $this.css("paddingLeft") + 1,
            });

            if (!$this.attr("readonly")) {
                $this.next().click(function () {
                    $(this).addClass("hopeui-hide").prev().focus();
                });

                $this.blur(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this.next().removeClass("hopeui-hide");
                    }
                });

                $this.focus(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this.next().addClass("hopeui-hide");
                    }
                });
            }
        }

        if (is.ie() <= 11) {
            if ($this.attr("readonly")) {
                $this.attr("unselectable", "on");
            }
        }

        $this.on("blur", function () {
            if (on && on.blur) {
                on.blur({
                    targetELe: $(this).get(0),
                    value: $(this).val(),
                    eventName: "blur",
                });
            }
        });
        $this.on("focus", function () {
            if (on && on.focus) {
                on.focus({
                    targetELe: $(this).get(0),
                    value: $(this).val(),
                    eventName: "focus",
                });
            }
        });
        $this.on("input propertychange", function () {
            if (on && on.input) {
                on.input({
                    targetELe: $(this).get(0),
                    value: $(this).val(),
                    eventName: "input",
                });
            }
        });
    });

    obj.val = function (value, callback) {
        if (value) {
            let eleArr = $dom;
            eleArr.each(function (i, thisEle) {
                $(thisEle).val(value);
                utils.validation(thisEle, "pass", null, "input");
                if (is.ie() <= 9) {
                    $(thisEle)
                        .next(".hopeui-placeholder")
                        .addClass("hopeui-hide");
                }
            });

            if (callback) {
                callback();
            }
        }
    };
    obj.clear = function (callback) {
        let thisEle = $dom;
        thisEle.each(function (i, ele) {
            ele.value = "";
            if (is.ie() <= 9) {
                $(this)
                    .next(".hopeui-placeholder")
                    .removeClass("hopeui-hide");
            }
        });
        if (callback) {
            callback();
        }
    };

    if (on && on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    return obj;
};
