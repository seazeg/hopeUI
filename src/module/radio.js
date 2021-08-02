/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-08-02 11:45:46
 * @Description  : 单选框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

module.exports.radioHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=radio]");

    if (ele) {
        // $dom = $(`input[type=radio]${ele}`);
        $dom = $(ele);
    }
    $dom.each(function () {
        let newEle,
            radio = $(this)[0];
        let template = `<div class="hopeui-noUserSelect hopeui-form-radio ${
            radio.checked ? "hopeui-form-radioed" : ""
        }"><i class="hopeui-anim hopeui-icon">${
            radio.checked ? "&#xe643;" : "&#xe63f;"
        }</i><span>${radio.getAttribute("title")}</span></div>`;

        $(radio).addClass("hopeui-hide");

        newEle = $(template).insertAfter(radio);

        if ($(this).attr("disabled")) {
            newEle.addClass("hopeui-radio-disabled");
        } else {
            newEle.on("click", function (e) {
                // if (e.stopPropagation) {
                //     e.stopPropagation();
                // } else if (window.event) {
                //     window.event.cancelBubble = true;
                // }
                handle(radio, newEle);
                //点击回调
                utils.validation(radio, "pass", null, "radio");
                if (on && on.change) {
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
        }
    });

    obj.val = function (value, callback) {
        if (value) {
            let eleArr = $dom;

            eleArr.each(function (i, thisEle) {
                value.split(",").forEach(function (val) {
                    if ($(thisEle).val() == val) {
                        handle(thisEle, $(thisEle).next(), true);
                    }
                });
                utils.validation(thisEle, "pass", null, "radio");
            });

            if (callback) {
                callback();
            }
        }
    };
    obj.clear = function (callback) {
        let thisEle = $dom;
        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(`${ele} input[type=radio]`));
        }

        handle(thisEle[0], $(thisEle).eq(0).next());
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

    /**
     * @description: 选择辅助方法
     * @param {original:dom对象} 原始元素
     * @param {targetELe:$对象} 目标虚拟元素
     * @return:
     */
    function handle(original, targetEle) {
        $(targetEle)
            .siblings(".hopeui-form-radio")
            .each(function () {
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
