/*
 * @Author       : Evan.G
 * @Date         : 2020-07-14 10:02:59
 * @LastEditTime : 2020-07-24 10:58:08
 * @Description  : hopeUI框架
 */

class HopeControls {
    constructor(config) {
        this.utils = this._utils();
        this.config = config;
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
            $dom = _this.utils.$("select");
        } else {
            if (_this.utils.$(ele)) {
                $dom.push(_this.utils.$(ele));
            } else {
                $dom = _this.utils.$("select");
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
            _this.utils.addClass(selector, "hopeui-hide");

            newEle = _this.utils.insertAfter(selector, {
                template: template,
                rootClass: "hopeui-form-select",
            });

            items = newEle.querySelectorAll(".option");

            //单击后下拉列表事件
            newEle.onclick = function (e) {
                e.stopPropagation();
                if (_this.utils.hasClass(newEle, "hopeui-form-selected")) {
                    _this.utils.removeClass(newEle, "hopeui-form-selected");
                } else {
                    _this.utils
                        .$(".hopeui-form-select")
                        .forEach(function (select) {
                            _this.utils.removeClass(
                                select,
                                "hopeui-form-selected"
                            );
                        });
                    _this.utils.addClass(newEle, "hopeui-form-selected");
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
                    //     _this.utils.validation(selector, "pass", null, "select-one");
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
                _this.utils.removeClass(newEle, "hopeui-form-selected");
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

            _this.utils.removeClass(optEles, "hopeui-select-this");
            _this.utils.addClass(optEle.obj, "hopeui-select-this");
            _this.utils.removeClass(targetELe, "hopeui-form-selected");

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
                    let thisEle = _this.utils.$(`select[name=${name}]`);
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
                        _this.utils.validation(ele, "pass", null, "select-one");
                    });
                }
            },
            clear: function () {
                let thisEle = _this.utils.$(`select`);
                thisEle.forEach(function (ele) {
                    handle(
                        ele,
                        ele.nextSibling,
                        ele.nextSibling.querySelectorAll(".option"), {
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
            $dom = _this.utils.$("input[type=checkbox]");
        } else {
            if (_this.utils.$(ele)) {
                $dom.push(_this.utils.$(ele));
            } else {
                $dom = _this.utils.$("checkbox");
            }
        }

        $dom.forEach(function (checkbox) {
            let newEle;
            let template = `
                        <span>${checkbox.value}</span><i class="hopeui-icon hopeui-icon-ok"></i>
                    `;

            _this.utils.addClass(checkbox, "hopeui-hide");

            newEle = _this.utils.insertAfter(checkbox, {
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
            if (
                _this.utils.hasClass(targetEle, "hopeui-form-checked") &&
                !single
            ) {
                original.checked = false;
                _this.utils.removeClass(targetEle, "hopeui-form-checked");
            } else {
                original.checked = true;
                _this.utils.addClass(targetEle, "hopeui-form-checked");
            }
        }

        return {
            val: function (value, name) {
                if (value) {
                    let thisEle = _this.utils.$(`input[name=${name}]`);
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
                        _this.utils.validation(ele, "pass", null, "checkbox");
                    });
                }
            },
            clear: function () {
                let thisEle = _this.utils.$("input[type=checkbox]");
                thisEle.forEach(function (ele) {
                    ele.checked = false;
                    _this.utils.removeClass(
                        ele.nextSibling,
                        "hopeui-form-checked"
                    );
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
            $dom = _this.utils.$("input[type=radio]");
        } else {
            if (_this.utils.$(ele)) {
                $dom.push(_this.utils.$(ele));
            } else {
                $dom = _this.utils.$("radio");
            }
        }

        $dom.forEach(function (radio) {
            let newEle;
            let template = `
                            <i class="hopeui-anim hopeui-icon">${
                                radio.checked ? "&#xe643;" : "&#xe63f;"
                            }</i><span>${radio.getAttribute("title")}</span>
                        `;

            _this.utils.addClass(radio, "hopeui-hide");

            newEle = _this.utils.insertAfter(radio, {
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
            _this.utils
                .siblings(targetEle, ".hopeui-form-radio")
                .forEach(function (bro) {
                    if (_this.utils.hasClass(bro, "hopeui-form-radioed")) {
                        original.checked = true;

                        _this.utils.removeClass(bro, "hopeui-form-radioed");
                        _this.utils.removeClass(
                            bro.childNodes[1],
                            "hopeui-anim-scaleSpring"
                        );

                        bro.childNodes[1].innerHTML = "&#xe63f;";

                        _this.utils.addClass(targetEle, "hopeui-form-radioed");
                        _this.utils.addClass(
                            targetEle.childNodes[1],
                            "hopeui-anim-scaleSpring"
                        );
                        targetEle.childNodes[1].innerHTML = "&#xe643;";
                    }
                });
        }

        return {
            val: function (value, name) {
                let thisEle = _this.utils.$(`input[name=${name}]`);
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
                    _this.utils.validation(ele, "pass", null, "radio");
                });
            },
            clear: function () {
                let thisEle = _this.utils.$("input[type=radio]");
                handle(thisEle[0], thisEle[0].nextSibling, true);
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
            $dom = _this.utils.$("input[type=text],input[type=password]");
        } else {
            if (_this.utils.$(ele)) {
                $dom.push(_this.utils.$(ele));
            } else {
                $dom = _this.utils.$("input");
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
                let thisEle = _this.utils.$(`input[name=${name}]`);
                thisEle[0].value = value;
                thisEle.forEach(function (ele) {
                    _this.utils.validation(ele, "pass", null, "input");
                });
            },
            clear: function () {
                let thisEle = _this.utils.$(
                    "input[type=text],input[type=password]"
                );
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
            $dom = _this.utils.$("textarea");
        } else {
            if (_this.utils.$(ele)) {
                $dom.push(_this.utils.$(ele));
            } else {
                $dom = _this.utils.$("input");
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
                let thisEle = _this.utils.$(`textarea[name=${name}]`);
                thisEle[0].value = value;
                thisEle.forEach(function (ele) {
                    _this.utils.validation(ele, "pass", null, "textarea");
                });
            },
            clear: function () {
                let thisEle = _this.utils.$(`textarea`);
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
            $dom = _this.utils.$("form");
        } else {
            if (_this.utils.$(ele)) {
                $dom.push(_this.utils.$(ele));
            } else {
                $dom = _this.utils.$("form");
            }
        }
        $dom.forEach(function (form) {
            form.onsubmit = function (e) {
                e.stopPropagation();
                let sortArr = {},
                    formParams = [];
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
                                //不为空
                                obj.name = ele.name;
                                if (ele.checked) {
                                    obj.value += `${ele.value},`;
                                }
                            } else {
                                obj.name = ele.name;
                                if (ele.checked) {
                                    obj.value += `${ele.value},`;
                                }
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
                                if (ele.value) {
                                    //不为空
                                    obj.name = ele.name;
                                    obj.value += `${ele.value},`;
                                    // 自定义校验
                                    if (verify[ele.name]) {
                                        if (!verify[ele.name](ele.value)) {
                                            _this.utils.validation(
                                                ele,
                                                "pass",
                                                null,
                                                items.type
                                            );
                                        } else {
                                            _this.utils.validation(
                                                ele,
                                                "error",
                                                verify[ele.name](ele.value),
                                                items.type
                                            );
                                        }
                                    } else {
                                        _this.utils.validation(
                                            ele,
                                            "pass",
                                            null,
                                            items.type
                                        );
                                    }
                                } else {
                                    _this.utils.validation(
                                        ele,
                                        "error",
                                        "内容不能为空",
                                        items.type
                                    );
                                }
                            } else {
                                obj.name = ele.name;
                                obj.value += `${ele.value},`;
                                _this.utils.validation(
                                    ele,
                                    "pass",
                                    null,
                                    items.type
                                );
                            }
                        });

                        obj.value = obj.value
                            .substring(0, obj.value.length - 1)
                            .trim();
                        if (obj.name) {
                            formParams.push(obj);
                            // _this.utils.validation(obj, "pass", null, items.type);
                        }
                    }
                });

                //提交回调
                if (on.submit) {
                    on.submit({
                        objectParams: formParams,
                        stringParams: _this.utils.deserialization(formParams),
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

    /**
     * @description: 工具类
     * @param {type}
     * @return:
     */
    _utils() {
        return {
            $: (ele) => {
                if (document.querySelectorAll(ele).length > 0) {
                    return document.querySelectorAll(ele);
                } else {
                    return document.querySelector(ele);
                }
            },
            on: (evt, fn) => {
                let eventArr = evt.split(" ");
                for (var i = 0; i < this.elments.length; i++) {
                    for (var j = 0; j < eventArr.length; j++) {
                        _this.utils.addEvent(eventArr[j], this.elements[i], fn);
                    }
                }
            },
            addEvent(eventName, obj, fn) {
                function CallFn(e) {
                    var ev = e || window.event;
                    fn.call(obj, ev);
                }
                if (obj.addEventListener) {
                    // 非 IE 浏览器；
                    obj.addEventListener(eventName, CallFn, false);
                } else {
                    // IE 浏览器
                    obj.attachEvent("on" + eventName, CallFn);
                }
            },
            validation(ele, rule, prompt, type) {
                let obj = ele,
                    bro = ele;
                if (type == "select-one") {
                    bro = this.siblings(ele, ".hopeui-form-select")[0];

                    obj = bro.childNodes[1].childNodes[1];
                }
                switch (rule) {
                    case "error":
                        this.addClass(obj, "hopeui-form-error");
                        if (
                            this.siblings(bro, ".hopeui-form-error-prompt")
                            .length <= 0
                        ) {
                            this.insertAfter(bro, {
                                template: `<i class="hopeui-icon hopeui-icon-close-fill"></i>${prompt}`,
                                rootClass: `hopeui-form-error-prompt`,
                            });
                        } else {
                            this.siblings(
                                bro,
                                ".hopeui-form-error-prompt"
                            )[0].innerHTML = ` <i class="hopeui-icon hopeui-icon-close-fill"></i>${prompt}`;
                        }

                        break;
                    case "pass":
                        this.removeClass(obj, "hopeui-form-error");
                        this.removeELe(
                            this.siblings(bro, ".hopeui-form-error-prompt")[0]
                        );
                    default:
                        break;
                }
            },
            deserialization(obj) {
                if (obj) {
                    let res = "";
                    for (let item of obj) {
                        res += item.name + "=" + item.value + "&";
                    }
                    return res.substring(0, res.length - 1);
                }
            },
            isPC: () => {
                return !/(iPhone|iPad|iPod|iOS|Android)/i.test(
                    navigator.userAgent
                );
            },
            hasClass: (ele, cls) => {
                return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(
                    ele.className
                );
            },
            addClass: (ele, cls) => {
                if (!this.utils.hasClass(ele, cls)) {
                    if (ele.className) {
                        ele.className += " " + cls;
                    } else {
                        ele.className += cls;
                    }
                }
            },
            removeClass: (ele, cls) => {
                let _this = this;
                if (ele.length > 0 && ele.tagName != "SELECT") {
                    ele.forEach(function (el) {
                        if (_this.utils.hasClass(el, cls)) {
                            el.className = el.className.replace(
                                new RegExp("(\\s|^)" + cls + "(\\s|$)"),
                                ""
                            );
                        }
                    });
                } else {
                    if (_this.utils.hasClass(ele, cls)) {
                        ele.className = ele.className.replace(
                            new RegExp("(\\s|^)" + cls + "(\\s|$)"),
                            ""
                        );
                    }
                }
            },
            siblings: (ele, tag) => {
                let nodes = [];
                let previ = ele.previousSibling;
                while (previ) {
                    if (previ.nodeType === 1) {
                        if (tag.includes(".")) {
                            if (
                                previ.className.includes(tag.replace(".", ""))
                            ) {
                                nodes.push(previ);
                            }
                        } else {
                            if (previ.tagName == tag.toUpperCase()) {
                                nodes.push(previ);
                            }
                        }
                    }
                    previ = previ.previousSibling;
                }
                nodes.reverse();
                let nexts = ele.nextSibling;
                while (nexts) {
                    if (nexts.nodeType === 1) {
                        if (tag.includes(".")) {
                            if (
                                nexts.className.includes(tag.replace(".", ""))
                            ) {
                                nodes.push(nexts);
                            }
                        } else {
                            if (nexts.tagName == tag.toUpperCase()) {
                                nodes.push(nexts);
                            }
                        }
                    }
                    nexts = nexts.nextSibling;
                }
                return nodes;
            },
            insertAfter: (targetEle, templateParams) => {
                let ele = document.createElement("div");
                ele.className = templateParams.rootClass;
                ele.innerHTML = templateParams.template;
                targetEle.after(ele);
                return ele;
            },
            removeELe: (targetEle) => {
                if (targetEle) {
                    targetEle.parentNode.removeChild(targetEle);
                }
            },
        };
    }
}