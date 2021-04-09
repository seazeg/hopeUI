/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-04-09 17:06:56
 * @Description  : 多行文本框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");
const { is } = require("../utils/is.js");

module.exports.textareaHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let type = "textarea";
    let $dom = $("textarea");
    if (ele) {
        $dom = $(ele)
    }

    $dom.each(function () {
        let $this = $(this);
        let remainWords = null;

        if (options && options.remainingWords) {
            let newBox = $('<div class="hopeui-relative"></div>').insertBefore(
                $this
            );
            $this.appendTo(newBox);
            $this.after(
                `<div class="hopeui-textarea-words"><i class="remain">0</i>/<i class="max">${$this.attr(
                    "maxlength" || 1000
                )}</i></div>`
            );
            remainWords = $this.next(".hopeui-textarea-words");
        }

        if (is.ie() <= 9) {
            $this
                .after(
                    `<label class="hopeui-placeholder">${
                        $this.attr("placeholder") || ""
                    }</label>`
                )
                .parent()
                .css("position", "relative");

            $this.next().css({
                lineHeight: $this.css("height") + 2,
                paddingLeft: $this.css("paddingLeft") + 1,
            });
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
            if (remainWords) {
                let max = remainWords.children(".max").text();
                if ($(this).val().length <= max) {
                    remainWords.children(".remain").text($(this).val().length);
                }
            }
            if (on && on.input) {
                on.input({
                    targetELe: $(this).get(0),
                    value: $(this).val(),
                    eventName: "input",
                });
            }
        });
    });

    if (on && on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    obj.val = function (value, callback) {
        if (value) {
                let eleArr = $dom;
                eleArr.each(function (i, thisEle) {
                    $(thisEle).val(value);
                    utils.validation(thisEle, "pass", null, "textarea");
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

    return obj;
};
