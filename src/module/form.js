/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-01-04 14:48:50
 * @Description  : 表单
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

module.exports.formHandler = function ({ ele, options, on, controls, verify }) {
    const obj = new Object();
    let formControls = {
        selector: hope.selector({
            ele: ele,
            options: options,
            on: controls.selector && controls.selector.on,
        }),
        checkbox: hope.checkbox({
            ele: ele,
            options: options,
            on: controls.checkbox && controls.checkbox.on,
        }),
        radio: hope.radio({
            ele: ele,
            options: options,
            on: controls.radio && controls.radio.on,
        }),
        input: hope.input({
            ele: ele,
            options: options,
            on: controls.input && controls.input.on,
        }),
        textarea: hope.textarea({
            ele: ele,
            options: options,
            on: controls.textarea && controls.textarea.on,
        }),
    };

    //form事件绑定
    let $dom = $("form");
    if (ele) {
        $dom = $(ele);
    }
    $dom.each(function () {
        let form = $(this)[0];
        form.onsubmit = function (evt) {
            evt = evt || window.event;
            let tarEle = evt.target || evt.srcElement;
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }

            let sortArr = {},
                formParams = [],
                status = true;
            Array.from(tarEle).forEach(function (item) {
                if (
                    (item.type != "submit" ||
                        item.type != "button" ||
                        item.type != "reset") &&
                    item.name
                ) {
                    if (!sortArr[item.name]) {
                        sortArr[item.name] = {};
                        sortArr[item.name].eles = [];
                        sortArr[item.name].eles.push(item);
                        sortArr[item.name].type = item.type;
                        sortArr[item.name].required = item.getAttribute(
                            "hope-verify"
                        );
                    } else {
                        sortArr[item.name].eles.push(item);
                        sortArr[item.name].type = item.type;
                        sortArr[item.name].required = item.getAttribute(
                            "hope-verify"
                        );
                    }
                }
            });

            //校验区域
            Object.keys(sortArr).forEach(function (key) {
                let items = sortArr[key];
                //单选和多选判断
                if (items.type == "checkbox" || items.type == "radio") {
                    let obj = {
                        name: "",
                        value: "",
                    };

                    items.eles.forEach(function (ele, i) {
                        //校验
                        if (items.required) {
                            obj.name = ele.name;
                            if (ele.checked) {
                                obj.value += `${ele.value},`;
                            }
                            if (verify[ele.name]) {
                                if (!verify[ele.name](obj.value)) {
                                    utils.validation(
                                        ele,
                                        "pass",
                                        null,
                                        items.type
                                    );
                                } else {
                                    utils.validation(
                                        ele,
                                        "error",
                                        verify[ele.name](obj.value),
                                        items.type
                                    );
                                    status = false;
                                }
                            } else {
                                utils.validation(ele, "pass", null, items.type);
                            }
                        } else {
                            obj.name = ele.name;
                            if (ele.checked) {
                                obj.value += `${ele.value},`;
                            }
                            utils.validation(ele, "pass", null, items.type);
                        }
                    });

                    obj.value = $.trim(
                        obj.value.substring(0, obj.value.length - 1)
                    );

                    if (items.required) {
                        // if (obj.value) {
                        formParams.push(obj);
                        // }
                    }
                } else {
                    let obj = {
                        name: "",
                        value: "",
                    };

                    items.eles.forEach(function (ele, i) {
                        //校验
                        if (items.required) {
                            //不为空
                            obj.name = ele.name;
                            if (ele.value) {
                                obj.value += `${ele.value},`;
                            }
                            // 自定义校验
                            if (verify[ele.name]) {
                                if (!verify[ele.name](ele.value)) {
                                    utils.validation(
                                        ele,
                                        "pass",
                                        null,
                                        items.type
                                    );
                                } else {
                                    utils.validation(
                                        ele,
                                        "error",
                                        verify[ele.name](ele.value),
                                        items.type
                                    );
                                    status = false;
                                }
                            } else {
                                utils.validation(ele, "pass", null, items.type);
                            }
                        } else {
                            obj.name = ele.name;
                            if (ele.value) {
                                obj.value += `${ele.value},`;
                            }
                            utils.validation(ele, "pass", null, items.type);
                        }
                    });

                    obj.value = $.trim(
                        obj.value.substring(0, obj.value.length - 1)
                    );

                    if (items.required) {
                        // if (obj.value) {
                        formParams.push(obj);
                        // }
                    }
                }
            });

            //提交回调
            if (on && on.submit) {
                on.submit({
                    objectParams: formParams,
                    stringParams: utils.deserialization(formParams),
                    status: status,
                });
            }
            return false;
        };
    });

    if (on && on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    obj.val = function (obj) {
        Object.keys(obj).forEach(function (key) {
            formControls[obj[key].type].val({
                [key]: obj[key],
            });
        });
    };
    obj.clear = function () {
        Object.keys(formControls).forEach(function (key) {
            formControls[key].clear();
        });
    };

    return obj;
};
