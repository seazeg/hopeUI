/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-06-17 18:39:15
 * @Description  : 表单
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");

module.exports.formHandler = function ({ ele, options, on, controls }) {
    const obj = new Object();
    const handlers = {
        select: function (ele, options, on) {
            return hope.selector({
                ele: ele,
                options: options,
                on: on,
            });
        },
        checkbox: function (ele, options, on) {
            return hope.checkbox({
                ele: ele,
                options: options,
                on: on,
            });
        },
        radio: function (ele, options, on) {
            return hope.radio({
                ele: ele,
                options: options,
                on: on,
            });
        },
        input: function (ele, options, on) {
            return hope.input({
                ele: ele,
                options: options,
                on: on,
            });
        },
        textarea: function (ele, options, on) {
            return hope.textarea({
                ele: ele,
                options: options,
                on: on,
            });
        },
    };

    //form事件绑定
    let formControls = {};
    let $dom = $("form");
    if (ele) {
        $dom = $(ele);
    }
    if (!controls) {
        controls = {};
    }

    let TEMP_OBJ = {},
        TEMP_ARR = [],
        rinput = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i;
    for (let i of $dom.serializeArray()) {
        if (!TEMP_OBJ[i.name]) {
            TEMP_ARR.push(i);
            TEMP_OBJ[i.name] = true;
        }
    }

    //无contorls配置
    if (Object.keys(controls).length === 0) {
        TEMP_ARR.forEach(function ({ name, type, value }, index) {
            let label = null;
            if (type.includes("select")) {
                type = "select";
            } else if (rinput.test(type)) {
                type = "input";
            }

            if (/^(radio|checkbox|)$/i.test(type)) {
                label = "input";
            } else {
                label = type;
            }

            let newObj = handlers[type](
                `${ele} ${label}[name=${name}]`,
                null,
                null
            );
            formControls[name] = newObj;
        });
    } else {
        TEMP_ARR.forEach(function ({ name, type, value }, index) {
            let label = null;
            if (type.includes("select")) {
                type = "select";
            } else if (rinput.test(type)) {
                type = "input";
            }

            if (/^(radio|checkbox|)$/i.test(type)) {
                label = "input";
            } else {
                label = type;
            }
            if (controls[name]) {
                let cont = controls[name];
                formControls[name] = handlers[cont.type](
                    `${ele} ${label}[name=${name}]`,
                    cont.options,
                    cont.on
                );
            } else {
                formControls[name] = handlers[type](
                    `${ele} ${label}[name=${name}]`,
                    null,
                    null
                );
            }
        });
    }

    $dom.each(function () {
        let form = $(this)[0];
        form.onsubmit = function (evt) {
            evt = evt || window.event;
            if (evt.stopPropagation) {
                evt.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }
            evt.preventDefault();
            let tarEle = evt.target || evt.srcElement;
            let sortArr = {},
                formParams = [],
                status = true,
                errorList = {}
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
                    let checked = false;
                    items.eles.forEach(function (ele, i) {
                        //校验
                        if (items.required) {
                            obj.name = ele.name;
                            if (ele.checked) {
                                obj.value += `${ele.value},`;
                                checked = true;
                            }
                            if (
                                controls[ele.name] &&
                                controls[ele.name].verify
                            ) {
                                if (!controls[ele.name].verify(obj.value)) {
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
                                        controls[ele.name].verify(obj.value),
                                        items.type
                                    );
                                    checked = false;
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

                    if (!checked) {
                        status = false;
                        errorList[items.eles[0].name] = false
                    }

                    obj.value = $.trim(
                        obj.value.substring(0, obj.value.length - 1)
                    );

                    // if (items.required) {
                    // if (obj.value) {
                    formParams.push(obj);
                    // }
                    // }
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
                            } else {
                                status = false;
                                errorList[ele.name] = false
                            }
                            // 自定义校验
                            if (
                                controls[ele.name] &&
                                controls[ele.name].verify
                            ) {
                                if (!controls[ele.name].verify(ele.value)) {
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
                                        controls[ele.name].verify(ele.value),
                                        items.type
                                    );
                                    status = false;
                                    errorList[ele.name] = false
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

                    // if (items.required) {
                    // if (obj.value) {
                    formParams.push(obj);
                    // }
                    // }
                }
            });

            //提交回调
            if (on && on.submit) {
                on.submit({
                    objectParams: formParams,
                    stringParams: utils.deserialization(formParams),
                    status: status,
                    errorList: errorList,
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

    obj.val = function (obj, callback) {
        Object.keys(obj).forEach(function (key) {
            formControls[key].val(obj[key]);
        });
        if (callback) {
            callback();
        }
    };
    obj.clear = function (callback) {
        Object.keys(formControls).forEach(function (key) {
            formControls[key].clear();
        });
        if (callback) {
            callback();
        }
    };

    return obj;
};
