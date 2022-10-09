/*
 * @Author       : Evan.G
 * @Date         : 2020-07-15 15:10:41
 * @LastEditTime : 2022-10-09 18:02:11
 * @Description  : 工具类
 */
const $ = require("./hopeu.js");

module.exports.utils = {
    validation(ele, rule, prompt, type) {
        let obj = ele,
            bro = ele;
        if (type == "select-one") {
            bro = $(ele).siblings(".hopeui-form-select").get(0);
            obj = bro.childNodes[0].childNodes[0];
        } else if (type == "checkbox") {
            bro = ele.parentNode.querySelectorAll(".hopeui-form-checkbox")[
                ele.parentNode.querySelectorAll(".hopeui-form-checkbox")
                    .length - 1
            ];
        } else if (type == "radio") {
            bro =
                ele.parentNode.querySelectorAll(".hopeui-form-radio")[
                    ele.parentNode.querySelectorAll(".hopeui-form-radio")
                        .length - 1
                ];
        } else if (type == "textarea") {
            bro = ele.parentNode;
        }
        switch (rule) {
            case "error":
                this.addClass(obj, "hopeui-form-error");
                if (
                    this.siblings(bro, ".hopeui-form-error-prompt").length <= 0
                ) {
                    // this.insertAfter(bro, {
                    //     template: ``,
                    //     rootClass: `hopeui-form-error-prompt`,
                    // });

                    //插入最后，暂时取消
                    // $(bro)
                    //     .parent()
                    //     .append(
                    //         `<div class="hopeui-form-error-prompt"><i class="hopeui-icon hopeui-icon-close-fill"></i><span class="hopeui-form-error-prompt-content">${prompt}</span></div>`
                    //     );
                    $(bro).after(
                        `<div class="hopeui-form-error-prompt"><i class="hopeui-icon hopeui-icon-close-fill"></i><span class="hopeui-form-error-prompt-content">${prompt}</span></div>`
                    );
                } else {
                    this.siblings(
                        bro,
                        ".hopeui-form-error-prompt"
                    )[0].innerHTML = ` <i class="hopeui-icon hopeui-icon-close-fill"></i><span class="hopeui-form-error-prompt-content">${prompt}</span>`;
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
    isPC() {
        return !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    },
    hasClass(ele, cls) {
        return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(ele.className);
    },
    addClass(ele, cls) {
        if (!this.hasClass(ele, cls)) {
            if (ele.className) {
                ele.className += " " + cls;
            } else {
                ele.className += cls;
            }
        }
    },
    removeClass(ele, cls) {
        let _this = this;
        if (ele.length > 0 && ele.tagName != "SELECT") {
            ele.forEach(function (el) {
                if (_this.hasClass(el, cls)) {
                    el.className = el.className.replace(
                        new RegExp("(\\s|^)" + cls + "(\\s|$)"),
                        ""
                    );
                }
            });
        } else {
            if (_this.hasClass(ele, cls)) {
                ele.className = ele.className.replace(
                    new RegExp("(\\s|^)" + cls + "(\\s|$)"),
                    ""
                );
            }
        }
    },
    siblings(ele, tag) {
        let nodes = [];
        let previ = ele.previousSibling;
        while (previ) {
            if (previ.nodeType === 1) {
                if (tag.includes(".")) {
                    if (previ.className.includes(tag.replace(".", ""))) {
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
                    if (nexts.className.includes(tag.replace(".", ""))) {
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
    insertAfter(targetEle, templateParams) {
        let ele = document.createElement("div");
        ele.className = templateParams.rootClass;
        ele.innerHTML = templateParams.template;
        targetEle.after(ele);
        return ele;
    },
    removeELe(targetEle) {
        if (targetEle) {
            targetEle.parentNode.removeChild(targetEle);
        }
    },
    isSelf(targetEle, typeName) {
        if (
            document.querySelector(targetEle).tagName.toLowerCase() == typeName
        ) {
            return true;
        } else {
            return false;
        }
    },
};
