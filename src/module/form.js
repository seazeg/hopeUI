/*
 * @Author       : Evan.G
 * @Date         : 2020-07-14 10:02:59
 * @LastEditTime : 2020-08-10 11:21:49
 * @Description  : 表单控件组
 */

//todo: 1.联动调用问题 2.事件回调绑定方式 3.响应式布局

import { hopeu as $ } from "../utils/hopeu.js";
import { verify as utils } from "../utils/verify.js";

class FormControls {
    constructor(config) {
        this.form = this.form;
        this.selector = this.selector;
        this.radio = this.radio;
        this.checkbox = this.checkbox;
        this.textarea = this.textarea;
        this.input = this.input;
    }

    /**
     * @description: 下拉框
     * @param {type}
     * @return:
     */
    selector({
        ele: ele = null,
        options: options = null,
        on: on = {
            init: null,
            toggle: null,
            change: null,
            close: null,
        },
    }) {
        let type = "select";
        let $dom = $("select");
        if (ele) {
            utils.isSelf(ele, type)
                ? ($dom = $(ele))
                : ($dom = $(`${ele} select`));
        }

        $dom.forEach(function(selector) {
            //模板初始化
            let newEle, items;
            let template = `
                <div class="hopeui-form-select">
                    <div class="hopeui-select-title">
                        <input
                            type="text"
                            placeholder="${selector.children[0].innerText}"
                            readonly
                            value=""
                            hope-value=""
                            hope-type="selector"
                            class="hopeui-input"
                        />
                        <i class="hopeui-edge"></i>
                    </div>
                    <div class="hopeui-select-list hopeui-anim hopeui-anim-upbit" name="${selector.name}">`;

            Array.from(selector.children).forEach(function(item, i) {
                if (item.tagName.toLowerCase() == "optgroup") {
                    template += `<div class="groupTitle" hope-group=${i}>${item.getAttribute(
                        "label"
                    )}</div>`;

                    Array.from(item.children).forEach(function(groupOpt, ii) {
                        template += `<div class="option group" hope-group=${i} hope-group-sort=${ii} hope-value="${groupOpt.value}">${groupOpt.innerText}</div>`;
                    });
                } else {
                    if (item.value) {
                        template += `<div class="option" hope-value="${item.value}">${item.innerText}</div>`;
                    } else {
                        template += `<div class="option hopeui-select-tips" hope-value="${item.value}">${item.innerText}</div>`;
                    }
                }
            });

            template += `</div></div>`;

            $(selector).addClass("hopeui-hide");
            newEle = $(template).insertAfter(selector);

            //单击后下拉列表事件
            newEle.on("click", function(e) {
                e.stopPropagation();
                if ($(this).hasClass("hopeui-form-selected")) {
                    $(this).removeClass("hopeui-form-selected");
                } else {
                    $(".hopeui-form-selected").removeClass(
                        "hopeui-form-selected"
                    );
                    $(this).addClass("hopeui-form-selected");
                }
                //打开列表回调
                if (on.toggle) {
                    on.toggle();
                }
            });

            //绑定自定义option的点击事件
            newEle.find(".option").on("click", function(e) {
                e.stopPropagation();
                let _this = $(this);
                handle(selector, newEle, _this);
                //选中options后回调
                if (on.change) {
                    on.change({
                        originalParentEle: selector,
                        virtualParentEle: selector.nextSibling,
                        targetEle: e.target,
                        label: _this.text(),
                        value: _this.attr("hope-value"),
                        name: _this.parent().attr("name"),
                        group: _this.attr("hope-group"),
                        groupSort: _this.attr("hope-group-sort"),
                        eventName: "change",
                    });
                }
            });

            //点击select区域外关闭下拉列表
            document.addEventListener("click", function(e) {
                $(newEle).removeClass("hopeui-form-selected");
                //下拉列表关闭回调
                if (on.close) {
                    on.close(e);
                }
            });

            if (on.init) {
                on.init({
                    ele: $dom[0],
                    eventName: "init",
                });
            }
        });

        /**
         * @description: 选择辅助方法
         * @param {original:dom对象} 原始元素
         * @param {targetELe:$对象} 目标虚拟元素
         * @param {optEle:$对象} 目标虚拟元素内选中选项
         * @return:
         */
        function handle(original, targetELe, optEle) {
            let input = targetELe.find("input");
            targetELe.find(".option").removeClass("hopeui-select-this");
            optEle.addClass("hopeui-select-this");
            targetELe.removeClass("hopeui-form-selected");
            input.attr("hope-value", optEle.attr("hope-value"));
            if (optEle.attr("hope-value")) {
                input.val(optEle.text());
            } else {
                input.val("");
            }

            if (optEle.attr("hope-group")) {
                original.children[optEle.attr("hope-group")].children[
                    optEle.attr("hope-group-sort")
                ].selected = true;
            } else {
                $(original)
                    .children("option")
                    .eq(optEle.index())[0].selected = true;
            }

            original.value = original.selectedOptions[0].value;
        }

        return {
            val: function(obj) {
                if (obj) {
                    //值拆分成数组
                    Object.keys(obj).forEach(function(key) {
                        let eleArr = $(`select[name=${key}]`);
                        if (ele) {
                            utils.isSelf(ele, type)
                                ? (eleArr = $(ele))
                                : (eleArr = $(`${ele} select[name=${key}]`));
                        }

                        eleArr.forEach(function(thisEle, i) {
                            let opts = $(thisEle)
                                .next()
                                .find(".option");
                            //内选项集合
                            opts.each(function(index) {
                                if (
                                    $.trim($(this).attr("hope-value")) ==
                                    obj[key].value.split(",")[i]
                                ) {
                                    handle(thisEle, $(thisEle).next(), $(this));
                                }
                            });

                            utils.validation(
                                thisEle,
                                "pass",
                                null,
                                "select-one"
                            );
                        });
                    });
                }
            },
            clear: function() {
                let thisEle = $(`select`);
                if (ele) {
                    utils.isSelf(ele, type)
                        ? (thisEle = $(ele))
                        : (thisEle = $(`${ele} select`));
                }
                thisEle.forEach(function(ele) {
                    handle(
                        ele,
                        $(ele).next(),
                        $(ele)
                            .next()
                            .find(".option")
                            .eq(0)
                    );
                });
            },
        };
    }

    /**
     * @description: 多选框
     * @param {type}
     * @return:
     */
    checkbox({
        ele: ele = null,
        options: options = null,
        on: on = {
            init: null,
            change: null,
        },
    }) {
        let type = "input";
        let $dom = $("input[type=checkbox]");

        if (ele) {
            utils.isSelf(ele, type)
                ? ($dom = $(ele))
                : ($dom = $(`${ele} input[type=checkbox]`));
        }

        $dom.forEach(function(checkbox) {
            let newEle;
            let template = `
                <div class="hopeui-noUserSelect hopeui-form-checkbox">
                    <span>${checkbox.value}</span><i class="hopeui-icon hopeui-icon-ok"></i>
                </div>
                    `;

            $(checkbox).addClass("hopeui-hide");

            newEle = $(template).insertAfter(checkbox);

            newEle.on("click", function(e) {
                e.stopPropagation();
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

        return {
            val: function(obj) {
                if (obj) {
                    Object.keys(obj).forEach(function(key) {
                        let eleArr = $(`input[name=${key}]`);

                        if (ele) {
                            utils.isSelf(ele, type)
                                ? (eleArr = $(ele))
                                : (eleArr = $(`${ele} input[name=${key}]`));
                        }

                        eleArr.forEach(function(thisEle, i) {
                            obj[key].value.split(",").forEach(function(val) {
                                if ($(thisEle).val() == val) {
                                    handle(thisEle, $(thisEle).next(), true);
                                }
                            });
                            utils.validation(thisEle, "pass", null, "checkbox");
                        });
                    });
                }
            },
            clear: function() {
                let thisEle = $(`input[type=checkbox]`);
                if (ele) {
                    utils.isSelf(ele, type)
                        ? (thisEle = $(ele))
                        : (thisEle = $(`${ele} input[type=checkbox]`));
                }
                thisEle.forEach(function(ele) {
                    ele.checked = false;
                    $(ele)
                        .next()
                        .removeClass("hopeui-form-checked");
                });
            },
        };
    }

    /**
     * @description: 单选框
     * @param {type}
     * @return:
     */
    radio({
        ele: ele = null,
        options: options = null,
        on: on = {
            init: null,
            change: null,
        },
    }) {
        let type = "input";
        let $dom = $("input[type=radio]");
        if (ele) {
            utils.isSelf(ele, type)
                ? ($dom = $(ele))
                : ($dom = $(`${ele} input[type=radio]`));
        }

        $dom.forEach(function(radio) {
            let newEle;
            let template = `
                    <div class="hopeui-noUserSelect hopeui-form-radio ${
                        radio.checked ? "hopeui-form-radioed" : ""
                    }">
                            <i class="hopeui-anim hopeui-icon">${
                                radio.checked ? "&#xe643;" : "&#xe63f;"
                            }</i><span>${radio.getAttribute(
                "title"
            )}</span></div>
                        `;

            $(radio).addClass("hopeui-hide");

            newEle = $(template).insertAfter(radio);

            newEle.on("click", function(e) {
                e.stopPropagation();
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

        return {
            val: function(obj) {
                if (obj) {
                    Object.keys(obj).forEach(function(key) {
                        let eleArr = $(`input[name=${key}]`);
                        if (ele) {
                            utils.isSelf(ele, type)
                                ? (eleArr = $(ele))
                                : (eleArr = $(`${ele} input[name=${key}]`));
                        }

                        eleArr.forEach(function(thisEle, i) {
                            obj[key].value.split(",").forEach(function(val) {
                                if ($(thisEle).val() == val) {
                                    handle(thisEle, $(thisEle).next(), true);
                                }
                            });
                            utils.validation(thisEle, "pass", null, "radio");
                        });
                    });
                }

                // thisEle.forEach(function (ele) {
                //     utils.validation(ele, "pass", null, "radio");
                // });
            },
            clear: function() {
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
            },
        };
    }

    /**
     * @description: 文本框
     * @param {type}
     * @return:
     */

    input({
        ele: ele = null,
        options: options = null,
        on: on = {
            init: null,
            blur: null,
            focus: null,
            input: null,
        },
    }) {
        let type = "input";
        let $dom = $("input[type=text],input[type=password]");
        if (ele) {
            utils.isSelf(ele, type)
                ? ($dom = $(ele))
                : ($dom = $(
                      `${ele} input[type=text],${ele} input[type=password]`
                  ));
        }

        $dom.forEach(function(input) {
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

        if (on.init) {
            on.init({
                ele: $dom[0],
                eventName: "init",
            });
        }

        return {
            val: function(obj) {
                if (obj) {
                    Object.keys(obj).forEach(function(key) {
                        let eleArr = $(`input[name=${key}]`);

                        if (ele) {
                            utils.isSelf(ele, type)
                                ? (eleArr = $(ele))
                                : (eleArr = $(`${ele} input[name=${key}]`));
                        }

                        eleArr.forEach(function(thisEle, i) {
                            $(thisEle).val(obj[key].value);
                            utils.validation(thisEle, "pass", null, "input");
                        });
                    });
                }
            },
            clear: function() {
                let thisEle = $(
                    `${ele} input[type=text],${ele} input[type=password]`
                );

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
            },
        };
    }

    /**
     * @description: 长文本框
     * @param {type}
     * @return:
     */
    textarea({
        ele: ele = null,
        options: options = null,
        on: on = {
            init: null,
            blur: null,
            focus: null,
            input: null,
        },
    }) {
        let type = "textarea";
        let $dom = $("textarea");
        if (ele) {
            utils.isSelf(ele, type)
                ? ($dom = $(ele))
                : ($dom = $(`${ele} textarea`));
        }

        $dom.forEach(function(textarea) {
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

        return {
            val: function(obj) {
                if (obj) {
                    Object.keys(obj).forEach(function(key) {
                        let eleArr = $(`textarea[name=${key}]`);
                        if (ele) {
                            utils.isSelf(ele, type)
                                ? (eleArr = $(ele))
                                : (eleArr = $(`${ele} textarea[name=${key}]`));
                        }

                        eleArr.forEach(function(thisEle, i) {
                            $(thisEle).val(obj[key].value);
                            utils.validation(thisEle, "pass", null, "textarea");
                        });
                    });
                }
            },
            clear: function() {
                let thisEle = $(`textarea`);

                if (ele) {
                    utils.isSelf(ele, type)
                        ? (thisEle = $(ele))
                        : (thisEle = $(`${ele} textarea`));
                }

                thisEle.forEach(function(ele) {
                    ele.value = "";
                });
            },
        };
    }

    /**
     * @description: 表单功能函数
     * @param {type}
     * @return:
     */
    form({
        ele: ele = null,
        options: options = null,
        on: on = {
            init: null,
            submit: null,
        },
        controls: controls = {
            selector: (selector = {
                on: (on = {
                    change: null,
                    toggle: null,
                }),
            }),
            checkbox: (checkbox = {
                on: (on = {
                    change: null,
                }),
            }),
            radio: (radio = {
                on: (on = {
                    change: null,
                }),
            }),
        },
        verify: verify = {},
    }) {
        //初始化控件组
        let formControls = {
            selector: this.selector({
                ele: ele,
                on: controls.selector.on,
            }),
            checkbox: this.checkbox({
                ele: ele,
                on: controls.checkbox.on,
            }),
            radio: this.radio({
                ele: ele,
                on: controls.radio.on,
            }),
            input: this.input({
                ele: ele,
                on: controls.input.on,
            }),
            textarea: this.textarea({
                ele: ele,
                on: controls.textarea.on,
            }),
        };

        //form事件绑定
        let $dom = $("form");
        if (ele) {
            $dom = $(ele);
        }
        $dom.forEach(function(form) {
            form.onsubmit = function(e) {
                e.stopPropagation();
                let sortArr = {},
                    formParams = [],
                    status = true;
                for (let item of e.target) {
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
                }

                //校验区域
                Object.keys(sortArr).forEach(function(key) {
                    let items = sortArr[key];
                    //单选和多选判断
                    if (items.type == "checkbox" || items.type == "radio") {
                        let obj = {
                            name: "",
                            value: "",
                        };

                        items.eles.forEach(function(ele, i) {
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
                                    utils.validation(
                                        ele,
                                        "pass",
                                        null,
                                        items.type
                                    );
                                }
                            } else {
                                obj.name = ele.name;
                                if (ele.checked) {
                                    obj.value += `${ele.value},`;
                                }
                                utils.validation(ele, "pass", null, items.type);
                            }
                        });

                        obj.value = obj.value
                            .substring(0, obj.value.length - 1)
                            .trim();
                        if (items.required) {
                            if (obj.value) {
                                formParams.push(obj);
                            }
                        }
                    } else {
                        let obj = {
                            name: "",
                            value: "",
                        };

                        items.eles.forEach(function(ele, i) {
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
                                    utils.validation(
                                        ele,
                                        "pass",
                                        null,
                                        items.type
                                    );
                                }
                            } else {
                                obj.name = ele.name;
                                if (ele.value) {
                                    obj.value += `${ele.value},`;
                                }
                                utils.validation(ele, "pass", null, items.type);
                            }
                        });

                        obj.value = obj.value
                            .substring(0, obj.value.length - 1)
                            .trim();

                        if (items.required) {
                            if (obj.value) {
                                formParams.push(obj);
                            }
                        }
                    }
                });

                //提交回调
                if (on.submit) {
                    on.submit({
                        objectParams: formParams,
                        stringParams: utils.deserialization(formParams),
                        status: status,
                    });
                }
                return false;
            };
        });

        if (on.init) {
            on.init({
                ele: $dom[0],
                eventName: "init",
            });
        }

        return {
            val: function(obj) {
                Object.keys(obj).forEach(function(key) {
                    formControls[obj[key].type].val({
                        [key]: obj[key],
                    });
                });
            },
            clear: function() {
                Object.keys(formControls).forEach(function(key) {
                    formControls[key].clear();
                });
            },
        };
    }
}

export const formControls = FormControls;
