/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-09-04 16:37:47
 * @Description  : 文本框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");
const { is } = require("../utils/is.js");

module.exports.inputHandler = function({ ele, options, on }) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=text],input[type=password]");
    if (ele) {
        utils.isSelf(ele, type)
            ? ($dom = $(ele))
            : ($dom = $(`${ele} input[type=text],${ele} input[type=password]`));
    }

    $dom.each(function() {
        let $this = $(this);
        if (!$this.attr("hope-type")) {
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
                        _this.next().addClass("hopeui-hide")
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
        }
    });

    obj.val = function(obj) {
        if (obj) {
            Object.keys(obj).forEach(function(key) {
                let eleArr = $(`input[name=${key}]`);

                if (ele) {
                    utils.isSelf(ele, type)
                        ? (eleArr = $(ele))
                        : (eleArr = $(`${ele} input[name=${key}]`));
                }

                eleArr.each(function(i, thisEle) {
                    $(thisEle).val(obj[key].value);
                    utils.validation(thisEle, "pass", null, "input");

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
        let thisEle = $(`${ele} input[type=text],${ele} input[type=password]`);

        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(
                      `${ele} input[type=text],${ele} input[type=password]`
                  ));
        }

        thisEle = Array.from(thisEle).filter(function(item) {
            if (item.getAttribute("hope-type") != "selector") {
                return item;
            }
        });
        thisEle.forEach(function(ele) {
            ele.value = "";
            if (is.ie() <= 9) {
                $(ele)
                    .next(".hopeui-placeholder")
                    .removeClass("hopeui-hide");
            }
        });
    };

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    return obj;
};
