/*
 * @Author       : Evan.G
 * @Date         : 2020-07-14 10:02:59
 * @LastEditTime : 2020-07-27 16:37:48
 * @Description  : 表单控件组
 */
import { utils } from "../utils/verify.js";
import { hopeu } from "../utils/hopeu.js";

class FormControls {
    constructor(config) {
        this.config = config || {};
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
            toggle: (toggle = null),
            change: (change = null),
            close: (close = null),
        },
    }) {
        let _this = this;
        let $dom = [];
        if (!ele) {
            $dom = utils.$("select");
        } else {
            if (utils.$(ele)) {
                $dom.push(utils.$(ele));
            } else {
                $dom = utils.$("select");
            }
        }
        $dom.forEach(function (selector) {
            //模板初始化
            let newEle, items;
            let template = `
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

            Array.from(selector.children).forEach(function (item, i) {
                if (item.tagName.toLowerCase() == "optgroup") {
                    template += `<div class="groupTitle" hope-group=${i}>${item.getAttribute(
                        "label"
                    )}</div>`;

                    Array.from(item.children).forEach(function (groupOpt, ii) {
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

            template += `</div>`;
            utils.addClass(selector, "hopeui-hide");

            newEle = utils.insertAfter(selector, {
                template: template,
                rootClass: "hopeui-form-select",
            });

            items = newEle.querySelectorAll(".option");

            //单击后下拉列表事件
            newEle.onclick = function (e) {
                e.stopPropagation();
                if (utils.hasClass(newEle, "hopeui-form-selected")) {
                    utils.removeClass(newEle, "hopeui-form-selected");
                } else {
                    utils.$(".hopeui-form-select").forEach(function (select) {
                        utils.removeClass(select, "hopeui-form-selected");
                    });
                    utils.addClass(newEle, "hopeui-form-selected");
                }
                //打开列表回调
                if (on.toggle) {
                    on.toggle();
                }
            };

            //绑定自定义option的点击事件
            items.forEach(function (item, i) {
                item.onclick = function (e) {
                    e.stopPropagation();
                    handle(selector, newEle, items, {
                        obj: item,
                        idx: i,
                    });
                    // if (!i) {
                    //     utils.validation(selector, "pass", null, "select-one");
                    // }else{

                    // }
                    //选中options后回调
                    if (on.change) {
                        on.change({
                            originalParentEle: selector,
                            virtualParentEle: selector.nextSibling,
                            targetEle: e.target,
                            label: e.target.innerText,
                            value: e.target.getAttribute("hope-value"),
                            name: e.target.parentNode.getAttribute("name"),
                            group: e.target.getAttribute("hope-group"),
                            groupSort: e.target.getAttribute("hope-group-sort"),
                        });
                    }
                };
            });

            //点击select区域外关闭下拉列表
            document.addEventListener("click", function (e) {
                utils.removeClass(newEle, "hopeui-form-selected");
                //下拉列表关闭回调
                if (on.close) {
                    on.close();
                }
            });
        });

        /**
         * @description: 选择辅助方法
         * @param {original} 原始元素
         * @param {targetELe} 目标虚拟元素
         * @param {optEles} 目标虚拟元素集合
         * @param {optEles} 目标虚拟元素内选中选项
         * @return:
         */
        function handle(original, targetELe, optEles, optEle) {
            let input = targetELe.querySelector("input");

            utils.removeClass(optEles, "hopeui-select-this");
            utils.addClass(optEle.obj, "hopeui-select-this");
            utils.removeClass(targetELe, "hopeui-form-selected");

            input.setAttribute(
                "hope-value",
                optEle.obj.getAttribute("hope-value")
            );
            if (optEle.obj.getAttribute("hope-value")) {
                input.value = optEle.obj.innerText;
            } else {
                input.value = "";
            }

            if (optEle.obj.getAttribute("hope-group")) {
                original.children[
                    optEle.obj.getAttribute("hope-group")
                ].children[
                    optEle.obj.getAttribute("hope-group-sort")
                ].selected = true;
            } else {
                original.children[optEle.idx].selected = true;
            }
            original.value = original.selectedOptions[0].value;
        }

        return {
            val: function (value, name) {
                if (value) {
                    let thisEle = utils.$(`select[name=${name}]`);
                    //值拆分成数组
                    value.split(",").forEach(function (val, i) {
                        //当前真是select的虚拟话元素位
                        let opts = thisEle[i].nextSibling.querySelectorAll(
                                ".option"
                            ),
                            idx = 0;
                        //内选项集合
                        opts.forEach(function (opt, j) {
                            if (opt.getAttribute("hope-value") == val) {
                                idx = j;
                            }
                        });
                        handle(thisEle[i], thisEle[i].nextSibling, opts, {
                            obj: opts[idx],
                            idx: idx,
                        });
                    });
                    thisEle.forEach(function (ele) {
                        utils.validation(ele, "pass", null, "select-one");
                    });
                }
            },
            clear: function () {
                let thisEle = utils.$(`select`);
                thisEle.forEach(function (ele) {
                    handle(
                        ele,
                        ele.nextSibling,
                        ele.nextSibling.querySelectorAll(".option"),
                        {
                            obj: ele.nextSibling.querySelectorAll(".option")[0],
                            idx: 0,
                        }
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
            change: (change = null),
        },
    }) {
        let _this = this;
        let $dom = [];
        if (!ele) {
            $dom = utils.$("input[type=checkbox]");
        } else {
            if (utils.$(ele)) {
                $dom.push(utils.$(ele));
            } else {
                $dom = utils.$("checkbox");
            }
        }

        $dom.forEach(function (checkbox) {
            let newEle;
            let template = `
                        <span>${checkbox.value}</span><i class="hopeui-icon hopeui-icon-ok"></i>
                    `;

            utils.addClass(checkbox, "hopeui-hide");

            newEle = utils.insertAfter(checkbox, {
                template: template,
                rootClass: "hopeui-noUserSelect hopeui-form-checkbox",
            });

            newEle.onclick = function (e) {
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
                    });
                }
            };
        });

        /**
         * @description: 选择辅助方法
         * @param {original} 原始元素
         * @param {targetELe} 目标虚拟元素
         * @param {single} 是否只选择不取消选择
         * @return:
         */
        function handle(original, targetEle, single) {
            if (utils.hasClass(targetEle, "hopeui-form-checked") && !single) {
                original.checked = false;
                utils.removeClass(targetEle, "hopeui-form-checked");
            } else {
                original.checked = true;
                utils.addClass(targetEle, "hopeui-form-checked");
            }
        }

        return {
            val: function (value, name) {
                if (value) {
                    let thisEle = utils.$(`input[name=${name}]`);
                    value.split(",").forEach(function (val, i) {
                        let idx = 0;
                        thisEle.forEach(function (ele, j) {
                            if (ele.value == val) {
                                idx = j;
                            }
                        });
                        handle(thisEle[idx], thisEle[idx].nextSibling, true);
                    });
                    thisEle.forEach(function (ele) {
                        utils.validation(ele, "pass", null, "checkbox");
                    });
                }
            },
            clear: function () {
                let thisEle = utils.$("input[type=checkbox]");
                thisEle.forEach(function (ele) {
                    ele.checked = false;
                    utils.removeClass(ele.nextSibling, "hopeui-form-checked");
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
            change: (change = null),
        },
    }) {
        let _this = this;
        let $dom = [];
        if (!ele) {
            $dom = utils.$("input[type=radio]");
        } else {
            if (utils.$(ele)) {
                $dom.push(utils.$(ele));
            } else {
                $dom = utils.$("radio");
            }
        }

        $dom.forEach(function (radio) {
            let newEle;
            let template = `
                            <i class="hopeui-anim hopeui-icon">${
                                radio.checked ? "&#xe643;" : "&#xe63f;"
                            }</i><span>${radio.getAttribute("title")}</span>
                        `;

            utils.addClass(radio, "hopeui-hide");

            newEle = utils.insertAfter(radio, {
                template: template,
                rootClass: `hopeui-noUserSelect hopeui-form-radio ${
                    radio.checked ? "hopeui-form-radioed" : ""
                }`,
            });

            newEle.onclick = function (e) {
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
                    });
                }
            };
        });

        /**
         * @description: 选择辅助方法
         * @param {original} 原始元素
         * @param {targetELe} 目标虚拟元素
         * @return:
         */
        function handle(original, targetEle) {
            utils
                .siblings(targetEle, ".hopeui-form-radio")
                .forEach(function (bro) {
                    if (utils.hasClass(bro, "hopeui-form-radioed")) {
                        original.checked = true;

                        utils.removeClass(bro, "hopeui-form-radioed");
                        utils.removeClass(
                            bro.childNodes[1],
                            "hopeui-anim-scaleSpring"
                        );

                        bro.childNodes[1].innerHTML = "&#xe63f;";

                        utils.addClass(targetEle, "hopeui-form-radioed");
                        utils.addClass(
                            targetEle.childNodes[1],
                            "hopeui-anim-scaleSpring"
                        );
                        targetEle.childNodes[1].innerHTML = "&#xe643;";
                    } else {
                        original.checked = true;
                        utils.addClass(targetEle, "hopeui-form-radioed");
                        utils.addClass(
                            targetEle.childNodes[1],
                            "hopeui-anim-scaleSpring"
                        );
                        targetEle.childNodes[1].innerHTML = "&#xe643;";
                    }
                });
        }

        return {
            val: function (value, name) {
                let thisEle = utils.$(`input[name=${name}]`);
                value.split(",").forEach(function (val, i) {
                    let idx = 0;
                    thisEle.forEach(function (ele, j) {
                        if (ele.value == val) {
                            idx = j;
                        }
                    });
                    handle(thisEle[idx], thisEle[idx].nextSibling);
                });
                thisEle.forEach(function (ele) {
                    utils.validation(ele, "pass", null, "radio");
                });
            },
            clear: function () {
                let thisEle = utils.$("input[type=radio]");
                handle(thisEle[0], thisEle[0].nextSibling);
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
            blur: (blur = null),
            focus: (focus = null),
            input: (input = null),
        },
    }) {
        let _this = this;
        let $dom = [];
        if (!ele) {
            $dom = utils.$("input[type=text],input[type=password]");
        } else {
            if (utils.$(ele)) {
                $dom.push(utils.$(ele));
            } else {
                $dom = utils.$("input");
            }
        }

        $dom.forEach(function (input) {
            input.onblur = function (e) {
                if (on.blur) {
                    on.blur({
                        targetELe: e.target,
                        value: e.target.value,
                    });
                }
            };
            input.onfocus = function (e) {
                if (on.focus) {
                    on.focus({
                        targetELe: e.target,
                        value: e.target.value,
                    });
                }
            };
            input.oninput = function (e) {
                if (on.input) {
                    on.input({
                        targetELe: e.target,
                        value: e.target.value,
                    });
                }
            };
        });

        return {
            val: function (value, name) {
                let thisEle = utils.$(`input[name=${name}]`);
                thisEle[0].value = value;
                thisEle.forEach(function (ele) {
                    utils.validation(ele, "pass", null, "input");
                });
            },
            clear: function () {
                let thisEle = utils.$("input[type=text],input[type=password]");
                thisEle = Array.from(thisEle).filter(function (item) {
                    if (item.getAttribute("hope-type") != "selector") {
                        return item;
                    }
                });
                thisEle.forEach(function (ele) {
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
            blur: (blur = null),
            focus: (focus = null),
            input: (input = null),
        },
    }) {
        let _this = this;
        let $dom = [];
        if (!ele) {
            $dom = utils.$("textarea");
        } else {
            if (utils.$(ele)) {
                $dom.push(utils.$(ele));
            } else {
                $dom = utils.$("input");
            }
        }

        $dom.forEach(function (input) {
            input.onblur = function (e) {
                if (on.blur) {
                    on.blur({
                        targetELe: e.target,
                        value: e.target.value,
                    });
                }
            };
            input.onfocus = function (e) {
                if (on.focus) {
                    on.focus({
                        targetELe: e.target,
                        value: e.target.value,
                    });
                }
            };
            input.oninput = function (e) {
                if (on.input) {
                    on.input({
                        targetELe: e.target,
                        value: e.target.value,
                    });
                }
            };
        });

        return {
            val: function (value, name) {
                let thisEle = utils.$(`textarea[name=${name}]`);
                thisEle[0].value = value;
                thisEle.forEach(function (ele) {
                    utils.validation(ele, "pass", null, "textarea");
                });
            },
            clear: function () {
                let thisEle = utils.$(`textarea`);
                thisEle.forEach(function (ele) {
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
        let _this = this;
        //初始化控件组
        let formControls = {
            selector: this.selector({
                on: controls.selector.on,
            }),
            checkbox: this.checkbox({
                on: controls.checkbox.on,
            }),
            radio: this.radio({
                on: controls.radio.on,
            }),
            input: this.input({
                on: controls.input.on,
            }),
            textarea: this.textarea({
                on: controls.textarea.on,
            }),
        };

        //form事件绑定
        let $dom = [];
        if (!ele) {
            $dom = utils.$("form");
        } else {
            if (utils.$(ele)) {
                $dom.push(utils.$(ele));
            } else {
                $dom = utils.$("form");
            }
        }
        $dom.forEach(function (form) {
            form.onsubmit = function (e) {
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

                        items.eles.forEach(function (ele, i) {
                            //校验
                            if (items.required) {
                                //不为空
                                obj.name = ele.name;
                                obj.value += `${ele.value},`;
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
                                obj.value += `${ele.value},`;
                                utils.validation(ele, "pass", null, items.type);
                            }
                        });

                        obj.value = obj.value
                            .substring(0, obj.value.length - 1)
                            .trim();
                        if (obj.name) {
                            formParams.push(obj);
                            // utils.validation(obj, "pass", null, items.type);
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

        return {
            val: function (obj) {
                Object.keys(obj).forEach(function (key) {
                    formControls[obj[key].type].val(obj[key].value, key);
                });
            },
            clear: function () {
                Object.keys(formControls).forEach(function (key) {
                    formControls[key].clear();
                });
            },
        };
    }
}

export const formControls = FormControls;
