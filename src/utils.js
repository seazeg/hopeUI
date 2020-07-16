/*
 * @Author       : Evan.G
 * @Date         : 2020-07-15 15:10:41
 * @LastEditTime : 2020-07-16 10:21:04
 * @Description  :
 */

class Utils {
    constructor() {}

    isPC() {
        return !/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent);
    }
    hasClass(ele, cls) {
        return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(ele.className);
    }

    addClass(ele, cls) {
        if (!this._utils().hasClass(ele, cls)) {
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
                if (_this._utils().hasClass(el, cls)) {
                    el.className = el.className.replace(
                        new RegExp("(\\s|^)" + cls + "(\\s|$)"),
                        ""
                    );
                }
            });
        } else {
            if (_this._utils().hasClass(ele, cls)) {
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
}

export { Utils };
