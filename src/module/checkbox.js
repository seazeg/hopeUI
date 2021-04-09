/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-04-09 16:41:06
 * @Description  : 复选框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

module.exports.checkboxHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=checkbox]");

    if (ele) {
        $dom = $(ele)
    }

    $dom.each(function () {
        let newEle,
            checkbox = $(this)[0];
        let template = `<div class="hopeui-noUserSelect hopeui-form-checkbox"><span>${checkbox.value}</span><i class="hopeui-icon hopeui-icon-ok"></i></div>`;

        $(checkbox).addClass("hopeui-hide");

        newEle = $(template).insertAfter(checkbox);

        if ($(this).attr("disabled")) {
            newEle.addClass("hopeui-checkbox-disabled");
        } else {
            newEle.on("click", function (e) {
                // if (e.stopPropagation) {
                //     e.stopPropagation();
                // } else if (window.event) {
                //     window.event.cancelBubble = true;
                // }
                handle(checkbox, newEle);
                //点击回调
                if (on && on.change) {
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
        }
    });

    if (on && on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    obj.val = function (value,callback) {
        if (value) {
                $dom.each(function (i, thisEle) {
                    value.split(",").forEach(function (val) {
                        if ($(thisEle).val() == val) {
                            handle(thisEle, $(thisEle).next(), true);
                        }
                    });
                    utils.validation(thisEle, "pass", null, "checkbox");
                });
  
            if(callback){
                callback()
            }
        }
    };

    obj.clear = function (callback) {
        $dom.each(function (i, ele) {
            ele.checked = false;
            $(ele).next().removeClass("hopeui-form-checked");
        });
        if(callback){
            callback()
        }
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
