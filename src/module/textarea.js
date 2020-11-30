/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-11-30 15:51:57
 * @Description  : 多行文本框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");
const { is } = require("../utils/is.js");

module.exports.textareaHandler = function({ ele, options, on }) {
    const obj = new Object();
    let type = "textarea";
    let $dom = $("textarea");
    if (ele) {
        utils.isSelf(ele, type)
            ? ($dom = $(ele))
            : ($dom = $(`${ele} textarea`));
    }

    $dom.each(function() {
        let $this = $(this);
        if (is.ie() <= 9) {
            $this
                .after(
                    `<label class="hopeui-placeholder">${$this.attr(
                        "placeholder"
                    ) || "请输入"}</label>`
                )
                .parent()
                .css("position", "relative");

            $this.next().css({
                lineHeight: $this.css("height") + 2,
                paddingLeft: $this.css("paddingLeft") + 1,
            });
            $this.next().click(function() {
                $(this)
                    .addClass("hopeui-hide")
                    .prev()
                    .focus();
            });

            $this.blur(function() {
                let _this = $(this);
                if (!_this.val()) {
                    _this.next().removeClass("hopeui-hide");
                }
            });

            $this.focus(function() {
                let _this = $(this);
                if (!_this.val()) {
                    _this.next().addClass("hopeui-hide");
                }
            });
        }

        $this.on('blur',function (){
            if (on.blur) {
                on.blur({
                    targetELe: $(this).get(0),
                    value: $(this).val(), 
                    eventName: "blur",
                });
            }
        })
        $this.on('focus',function (){
            if (on.focus) {
                on.focus({
                    targetELe: $(this).get(0),
                    value: $(this).val(), 
                    eventName: "focus",
                });
            }
        })
        $this.on('input propertychange',function (){
            if (on.input) {
                on.input({
                    targetELe: $(this).get(0),
                    value: $(this).val(), 
                    eventName: "input",
                });
            }
        })
    });

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    obj.val = function(obj) {
        if (obj) {
            Object.keys(obj).forEach(function(key) {
                let eleArr = $(`textarea[name=${key}]`);
                if (ele) {
                    utils.isSelf(ele, type)
                        ? (eleArr = $(ele))
                        : (eleArr = $(`${ele} textarea[name=${key}]`));
                }

                eleArr.each(function(i, thisEle) {
                    $(thisEle).val(obj[key].value);
                    utils.validation(thisEle, "pass", null, "textarea");
                    if (is.ie() <= 9) {
                        $(thisEle)
                            .next(".hopeui-placeholder")
                            .addClass("hopeui-hide");
                    }
                });
            });
        }
    };
    obj.clear = function() {
        let thisEle = $(`textarea`);

        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(`${ele} textarea`));
        }

        thisEle.each(function(i, ele) {
            ele.value = "";
            if (is.ie() <= 9) {
                $(this).next()
                    .find("input")
                    .next(".hopeui-placeholder")
                    .removeClass("hopeui-hide");
            }
        });
    };

    return obj;
};
