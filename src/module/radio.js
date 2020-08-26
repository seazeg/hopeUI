/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-26 14:30:52
 * @Description  : 单选框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

module.exports.radioHandler = function({ ele, options, on }) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=radio]");
    if (ele) {
        utils.isSelf(ele, type)
            ? ($dom = $(ele))
            : ($dom = $(`${ele} input[type=radio]`));
    }

    $dom.each(function() {
        let newEle,
            radio = $(this)[0];
        let template = `<div class="hopeui-noUserSelect hopeui-form-radio ${
            radio.checked ? "hopeui-form-radioed" : ""
        }"><i class="hopeui-anim hopeui-icon">${
            radio.checked ? "&#xe643;" : "&#xe63f;"
        }</i><span>${radio.getAttribute("title")}</span></div>`;

        $(radio).addClass("hopeui-hide");

        newEle = $(template).insertAfter(radio);

        newEle.on("click", function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            handle(radio, newEle);
            //点击回调
            if (on.change) {
                on.change({
                    original: radio,
                    targetEle: radio.nextSibling,
                    name: radio.name,
                    value: radio.value,
                    status: radio.checked,
                    eventName: "change",
                });
            }
        });
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
                    obj[key].value.split(",").forEach(function(val) {
                        if ($(thisEle).val() == val) {
                            handle(thisEle, $(thisEle).next(), true);
                        }
                    });
                    utils.validation(thisEle, "pass", null, "radio");
                });
            });
        }
    };
    obj.clear = function() {
        let thisEle = $(`input[type=radio]`);
        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(`${ele} input[type=radio]`));
        }

        handle(
            thisEle[0],
            $(thisEle)
                .eq(0)
                .next()
        );
    };

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    /**
     * @description: 选择辅助方法
     * @param {original:dom对象} 原始元素
     * @param {targetELe:$对象} 目标虚拟元素
     * @return:
     */
    function handle(original, targetEle) {
        $(targetEle)
            .siblings(".hopeui-form-radio")
            .each(function() {
                let _this = $(this);
                if (_this.hasClass("hopeui-form-radioed")) {
                    original.checked = true;

                    _this.removeClass("hopeui-form-radioed");
                    _this
                        .children("i")
                        .removeClass("hopeui-anim-scaleSpring")
                        .html("&#xe63f;");

                    $(targetEle).addClass("hopeui-form-radioed");
                    $(targetEle)
                        .children("i")
                        .addClass("hopeui-anim-scaleSpring")
                        .html("&#xe643;");
                } else {
                    original.checked = true;
                    $(targetEle).addClass("hopeui-form-radioed");
                    $(targetEle)
                        .children("i")
                        .addClass("hopeui-anim-scaleSpring")
                        .html("&#xe643;");
                }
            });
    }

    return obj;
};
