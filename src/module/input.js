/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-20 15:27:19
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

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
        let input = $(this)[0];
        console.log($(this));
        $(this).insertAfter(`<label class="hopeui-placeholder">${$(this).attr('placeholder')}</label>`);
        if (!input.getAttribute("hope-type")) {
            input.onblur = function(e) {
                if (on.blur) {
                    on.blur({
                        targetELe: e.target,
                        value: e.target.value,
                        eventName: "blur",
                    });
                }
            };
            input.onfocus = function(e) {
                if (on.focus) {
                    on.focus({
                        targetELe: e.target,
                        value: e.target.value,
                        eventName: "focus",
                    });
                }
            };
            input.oninput = function(e) {
                if (on.input) {
                    on.input({
                        targetELe: e.target,
                        value: e.target.value,
                        eventName: "input",
                    });
                }
            };
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

                eleArr.each(function(i,thisEle) {
                    $(thisEle).val(obj[key].value);
                    utils.validation(thisEle, "pass", null, "input");
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
