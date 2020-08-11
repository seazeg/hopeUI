/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-11 16:29:08
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

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
        let textarea = $(this)[0];
        textarea.onblur = function(e) {
            if (on.blur) {
                on.blur({
                    targetELe: e.target,
                    value: e.target.value,
                    eventName: "blur",
                });
            }
        };
        textarea.onfocus = function(e) {
            if (on.focus) {
                on.focus({
                    targetELe: e.target,
                    value: e.target.value,
                    eventName: "focus",
                });
            }
        };
        textarea.oninput = function(e) {
            if (on.input) {
                on.input({
                    targetELe: e.target,
                    value: e.target.value,
                    eventName: "input",
                });
            }
        };
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

                eleArr.each(function(i,thisEle) {
                    $(thisEle).val(obj[key].value);
                    utils.validation(thisEle, "pass", null, "textarea");
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

        thisEle.each(function(i,ele) {
            ele.value = "";
        });
    };

    return obj;
};