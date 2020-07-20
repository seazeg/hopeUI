/*
 * @Author       : Evan.G
 * @Date         : 2020-07-14 10:02:59
 * @LastEditTime : 2020-07-20 16:24:33
 * @Description  :
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
            let newEle, items, input;
            let template = `
                    <div class="hopeui-select-title">
                        <input
                            type="text"
                            placeholder="${selector.children[0].innerText}"
                            readonly
                            value=""
                            hope-value=""
                            class="hopeui-input"
                        />
                        <i class="hopeui-edge"></i>
                    </div>
                    <div class="hopeui-select-list hopeui-anim hopeui-anim-upbit">`;

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
            input = newEle.querySelector("input");
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
                    _this.utils.removeClass(items, "hopeui-select-this");
                    _this.utils.addClass(item, "hopeui-select-this");
                    _this.utils.removeClass(newEle, "hopeui-form-selected");

                    input.setAttribute(
                        "hope-value",
                        item.getAttribute("hope-value")
                    );
                    if (item.getAttribute("hope-value")) {
                        input.value = item.innerText;
                    } else {
                        input.value = "";
                    }

                    if (e.target.getAttribute("hope-group")) {
                        selector.children[
                            e.target.getAttribute("hope-group")
                        ].children[
                            e.target.getAttribute("hope-group-sort")
                        ].selected = true;
                    } else {
                        selector.children[i].selected = true;
                    }

                    //选中options后回调
                    if (on.change) {
                        on.change({
                            label: item.innerText,
                            value: item.getAttribute("hope-value"),
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
                if (_this.utils.hasClass(newEle, "hopeui-form-checked")) {
                    checkbox.checked = false;
                    _this.utils.removeClass(newEle, "hopeui-form-checked");
                } else {
                    checkbox.checked = true;
                    _this.utils.addClass(newEle, "hopeui-form-checked");
                }

                //点击回调
                if (on.change) {
                    on.change({
                        ele: checkbox,
                        value: checkbox.value,
                        status: checkbox.checked,
                    });
                }
            };
        });
    }

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
                _this.utils
                    .siblings(newEle, ".hopeui-form-radio")
                    .forEach(function (bro, i) {
                        if (_this.utils.hasClass(bro, "hopeui-form-radioed")) {
                            radio.checked = true;

                            _this.utils.removeClass(bro, "hopeui-form-radioed");
                            _this.utils.removeClass(
                                bro.childNodes[1],
                                "hopeui-anim-scaleSpring"
                            );

                            bro.childNodes[1].innerHTML = "&#xe63f;";

                            _this.utils.addClass(newEle, "hopeui-form-radioed");
                            _this.utils.addClass(
                                newEle.childNodes[1],
                                "hopeui-anim-scaleSpring"
                            );
                            newEle.childNodes[1].innerHTML = "&#xe643;";
                        }
                    });

                //点击回调
                if (on.change) {
                    on.change({
                        ele: radio,
                        value: radio.value,
                        status: radio.checked,
                    });
                }
            };
        });
    }

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
    }) {
        let _this = this;
        //初始化控件组
        this.selector({
            on: controls.selector.on,
        });
        this.checkbox({
            on: controls.checkbox.on,
        });
        this.radio({
            on: controls.radio.on,
        });

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
                            sortArr[item.name] = [];
                            sortArr[item.name].push(item);
                            sortArr[item.name].type = item.type;
                        } else {
                            sortArr[item.name].push(item);
                            sortArr[item.name].type = item.type;
                        }
                    }
                }

                Object.keys(sortArr).forEach(function (key) {
                    let items = sortArr[key];
                    if (items.type == "checkbox" || items.type == "radio") {
                        let obj = {
                            name: "",
                            value: "",
                        };

                        items.forEach(function (ele, i) {
                            if (ele.value) {
                                obj.name = ele.name;
                                if (ele.checked) {
                                    obj.value += `${ele.value},`;
                                }
                            } else {
                            }
                        });

                        if (obj.value) {
                            obj.value = obj.value
                                .substring(0, obj.value.length - 1)
                                .trim();
                            formParams.push(obj);
                            _this.utils.verify(items[0], "pass");
                        }
                    } else {
                        if (items.length > 1) {
                            let obj = {
                                name: "",
                                value: "",
                            };
                            items.forEach(function (ele, i) {
                                if (ele.value) {
                                    obj.name = ele.name;
                                    obj.value += `${ele.value},`;
                                } else {
                                    //校验
                                    if (items.type == "select-one") {
                                        let obj = _this.utils.siblings(
                                            ele,
                                            ".hopeui-form-select"
                                        )[0].childNodes[1].childNodes[1];
                                        _this.utils.verify(obj, "blank");
                                    } else {
                                        _this.utils.verify(ele, "blank");
                                    }
                                }
                            });
                            if (obj.value) {
                                obj.value = obj.value
                                    .substring(0, obj.value.length - 1)
                                    .trim();
                                formParams.push(obj);
                                _this.utils.verify(items[0], "pass");
                            }
                        } else {
                            //校验
                            if (items[0].value) {
                                formParams.push({
                                    name: items[0].name,
                                    value: items[0].value.trim(),
                                });
                                _this.utils.verify(items[0], "pass");
                            } else {
                                if (items.type == "select-one") {
                                    let obj = _this.utils.siblings(
                                        items[0],
                                        ".hopeui-form-select"
                                    )[0].childNodes[1].childNodes[1];
                                    _this.utils.verify(obj, "blank");
                                } else {
                                    _this.utils.verify(items[0], "blank");
                                }
                            }
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
    }

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
            verify(obj, rule) {
                switch (rule) {
                    case "blank":
                        this.addClass(obj, "hopeui-form-error");
                        break;
                    case "pass":
                        this.removeClass(obj, "hopeui-form-error");
                    default:
                        break;
                }
            },
            isRequired(obj) {
                return !!obj.getAttribute("hope-verify");
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
        };
    }
}
