/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-26 14:30:05
 * @Description  : 复选框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

module.exports.checkboxHandler = function({ ele, options, on }) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=checkbox]");

    if (ele) {
        utils.isSelf(ele, type)
            ? ($dom = $(ele))
            : ($dom = $(`${ele} input[type=checkbox]`));
    }

    $dom.each(function() {
        let newEle,
            checkbox = $(this)[0];
        let template = `<div class="hopeui-noUserSelect hopeui-form-checkbox"><span>${checkbox.value}</span><i class="hopeui-icon hopeui-icon-ok"></i></div>`;

        $(checkbox).addClass("hopeui-hide");

        newEle = $(template).insertAfter(checkbox);

        newEle.on("click", function(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            handle(checkbox, newEle);
            //点击回调
            if (on.change) {
                on.change({
                    original: checkbox,
                    targetEle: checkbox.nextSibling,
                    name: checkbox.name,
                    value: checkbox.value,
                    status: checkbox.checked,
                    eventName: "change",
                });
            }
        });
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
                    utils.validation(thisEle, "pass", null, "checkbox");
                });
            });
        }
    };

    obj.clear = function() {
        let thisEle = $(`input[type=checkbox]`);
        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(`${ele} input[type=checkbox]`));
        }
        thisEle.each(function(i, ele) {
            ele.checked = false;
            $(ele)
                .next()
                .removeClass("hopeui-form-checked");
        });
    };

    /**
     * @description: 选择辅助方法
     * @param {original:dom对象} 原始元素
     * @param {targetELe:$对象} 目标虚拟元素
     * @param {single} 是否只选择不取消选择
     * @return:
     */
    function handle(original, targetEle, single) {
        if (targetEle.hasClass("hopeui-form-checked") && !single) {
            original.checked = false;
            targetEle.removeClass("hopeui-form-checked");
        } else {
            original.checked = true;
            targetEle.addClass("hopeui-form-checked");
        }
    }

    return obj;
};
