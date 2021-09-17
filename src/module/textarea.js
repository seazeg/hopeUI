/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-09-17 15:24:17
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
        // $dom = $(`textarea${ele}`);
        $dom = $(ele);
    }

    $dom.each(function () {
        let $this = $(this);
        let remainWords = null;

        // if (options && options.remainingWords) {
        let newBox = $('<div class="hopeui-form-warp"></div>').insertBefore(
            $this
        );
        $this.appendTo(newBox);
        if (options && options.remainingWords) {
            $this.after(
                `<div class="hopeui-textarea-words"><i class="remain">0</i>/<i class="max">${$this.attr(
                    "maxlength" || 1000
                )}</i></div>`
            );
            remainWords = $this.next(".hopeui-textarea-words");
        }
        let warp = $('<div class="hopeui-relative"></div>').insertBefore(
            newBox
        );
        newBox.appendTo(warp);

        if (is.ie() <= 9 || (options && !options.noPlaceholderMode)) {
            let isHide = "";
            if ($this.val()) {
                isHide = "hopeui-hide";
            }
            $this
                .after(
                    `<label class="hopeui-placeholder ${isHide}"">${
                        $this.attr("placeholder") || ""
                    }</label>`
                )
                .parent()
                .css("position", "relative");

            // $this.next().css({
            //     lineHeight: $this.css("height") + 2,
            //     paddingLeft: $this.css("paddingLeft") + 1,
            // });
            $this.siblings(".hopeui-placeholder").click(function () {
                $(this).addClass("hopeui-hide").siblings("textarea").focus();
            });

            $this.blur(function () {
                let _this = $(this);
                if (!_this.val()) {
                    _this
                        .siblings(".hopeui-placeholder")
                        .removeClass("hopeui-hide");
                }
            });

            $this.focus(function () {
                let _this = $(this);
                if (!_this.val()) {
                    _this
                        .siblings(".hopeui-placeholder")
                        .addClass("hopeui-hide");
                }
            });
            $this.attr("placeholder", "");
        }

        $this.on("blur", function () {
            let _this = $(this);
            if (_this.val()) {
                utils.validation(_this.get(0), "pass", null, "textarea");
            }
            if (on && on.blur) {
                on.blur({
                    targetEle: _this.get(0),
                    value: _this.val(),
                    eventName: "blur",
                });
            }
        });
        $this.on("focus", function () {
            if (on && on.focus) {
                on.focus({
                    targetEle: $(this).get(0),
                    value: $(this).val(),
                    eventName: "focus",
                });
            }
        });
        $this.on("keyup", function () {
            if (remainWords) {
                let max = remainWords.children(".max").text();
                if ($(this).val().length <= max) {
                    remainWords.children(".remain").text($(this).val().length);
                }
            }
            if (on && on.input) {
                on.input({
                    targetEle: $(this).get(0),
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
                if (is.ie() <= 9 || (options && !options.noPlaceholderMode)) {
                    $(thisEle)
                        .siblings(".hopeui-placeholder")
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
        utils.validation(thisEle.get(0), "pass", null, "textarea");
        thisEle.each(function (i, ele) {
            ele.value = "";
            if (is.ie() <= 9 || (options && !options.noPlaceholderMode)) {
                $(this)
                    .siblings(".hopeui-placeholder")
                    .removeClass("hopeui-hide");
            }
        });
        if (callback) {
            callback();
        }
    };

    return obj;
};
