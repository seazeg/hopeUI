/*
 * @Author       : Evan.G
 * @Date         : 2020-07-15 15:10:41
 * @LastEditTime : 2020-07-27 15:15:42
 * @Description  : 工具类
 */
class Utils {
    constructor() {}
    $(ele) {
        if (document.querySelectorAll(ele).length > 0) {
            return document.querySelectorAll(ele);
        } else {
            return document.querySelector(ele);
        }
    }
    on(evt, fn) {
        let _this = this;
        let eventArr = evt.split(" ");
        for (var i = 0; i < this.elments.length; i++) {
            for (var j = 0; j < eventArr.length; j++) {
                _this.addEvent(eventArr[j], this.elements[i], fn);
            }
        }
    }
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
    }
    validation(ele, rule, prompt, type) {
        let obj = ele,
            bro = ele;
        if (type == "select-one") {
            bro = this.siblings(ele, ".hopeui-form-select")[0];
            obj = bro.childNodes[1].childNodes[1];
        } else if (type == "checkbox") {
            bro = ele.parentNode.querySelectorAll(".hopeui-form-checkbox")[
                ele.parentNode.querySelectorAll(".hopeui-form-checkbox")
                    .length - 1
            ];
        } else if (type == "radio") {
            bro = ele.parentNode.querySelectorAll(".hopeui-form-radio")[
                ele.parentNode.querySelectorAll(".hopeui-form-radio").length - 1
            ];
        }
        switch (rule) {
            case "error":
                this.addClass(obj, "hopeui-form-error");
                if (
                    this.siblings(bro, ".hopeui-form-error-prompt").length <= 0
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
    }
    deserialization(obj) {
        if (obj) {
            let res = "";
            for (let item of obj) {
                res += item.name + "=" + item.value + "&";
            }
            return res.substring(0, res.length - 1);
        }
    }
    isPC() {
        return !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    }
    hasClass(ele, cls) {
        return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(ele.className);
    }
    addClass(ele, cls) {
        if (!this.hasClass(ele, cls)) {
            if (ele.className) {
                ele.className += " " + cls;
            } else {
                ele.className += cls;
            }
        }
    }
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
    }
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
    }
    insertAfter(targetEle, templateParams) {
        let ele = document.createElement("div");
        ele.className = templateParams.rootClass;
        ele.innerHTML = templateParams.template;
        targetEle.after(ele);
        return ele;
    }
    removeELe(targetEle) {
        if (targetEle) {
            targetEle.parentNode.removeChild(targetEle);
        }
    }
}

export const utils = new Utils();
