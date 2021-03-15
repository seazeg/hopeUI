/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-03-15 16:28:05
 * @Description  : 下拉框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");
const { is } = require("../utils/is.js");
const { scrollbarHandler } = require("./scrollbar.js");

module.exports.selectorHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let type = "select";
    let $dom = $("select");
    if (ele) {
        utils.isSelf(ele, type) ? ($dom = $(ele)) : ($dom = $(`${ele} select`));
    }

    function core() {
        $dom.each(function () {
            //模板初始化
            let newEle,
                selector = $(this)[0];
            let template = `<div class="hopeui-form-select"><div class="hopeui-select-title"><input type="selectText" placeholder="${
                selector.children[0].innerText
            }" unselectable="on" ${
                options && options.searchMode ? "" : "readonly"
            } value="" hope-value="" hope-type="selector" class="hopeui-input"/><i class="hopeui-edge ${
                (options && options.switchIcon) || "hopeui-default-switchIcon"
            }"></i></div><div class="hopeui-select-list hopeui-anim hopeui-anim-upbit" name="${
                selector.name
            }"><div class="hopeui-scrollbar-box ">`;
            let tempSelectedVal = {
                value: "",
                label: "",
            };
            reset($(this));
            $(this)
                .children()
                .each(function (i, item) {
                    item = $(this)[0];
                    if (item.tagName.toLowerCase() == "optgroup") {
                        template += `<div class="groupTitle" hope-group=${i}>${item.getAttribute(
                            "label"
                        )}</div>`;

                        $(this)
                            .children()
                            .each(function (ii, groupOpt) {
                                groupOpt = $(this)[0];

                                if (groupOpt.selected) {
                                    template += `<div class="option group hopeui-select-this" hope-group=${i} hope-group-sort=${ii} hope-value="${groupOpt.value}">${groupOpt.innerText}</div>`;
                                    tempSelectedVal = {
                                        value: groupOpt.value,
                                        label: groupOpt.innerText,
                                    };
                                } else {
                                    template += `<div class="option group" hope-group=${i} hope-group-sort=${ii} hope-value="${groupOpt.value}">${groupOpt.innerText}</div>`;
                                }
                            });
                    } else {
                        if (item.selected) {
                            template += `<div class="option hopeui-select-this" hope-value="${item.value}" >${item.innerText}</div>`;
                            tempSelectedVal = {
                                value: item.value,
                                label: item.innerText,
                            };
                        } else {
                            template += `<div class="option" hope-value="${item.value}">${item.innerText}</div>`;
                        }
                    }
                });

            template += `</div></div></div>`;

            newEle = $(template).insertAfter(selector);

            if (tempSelectedVal.value) {
                newEle
                    .find("input")
                    .val(tempSelectedVal.label)
                    .attr("hope-value", tempSelectedVal.val);
            }

            if (!is.phone()) {
                $(selector).addClass("hopeui-hide");
            } else {
                $(selector)
                    .addClass("hopeui-select-phone")
                    .parent()
                    .addClass("hopeui-relative");
                $(selector).on("change", function (e) {
                    newEle.find("input").val($(this).val());
                });
            }

            if (is.ie() <= 9) {
                let $this = newEle.find("input");
                let isHide = "";
                if ($this.val()) {
                    isHide = "hopeui-hide";
                }

                $this
                    .after(
                        `<label class="hopeui-placeholder ${isHide}">${
                            $this.attr("placeholder") || ""
                        }</label>`
                    )
                    .parent()
                    .css("position", "relative");

                $this.next().css({
                    lineHeight: $this.css("height") + 2,
                    paddingLeft: $this.css("paddingLeft") + 1,
                });
            }

            //单击后下拉列表事件
            newEle.off().on("click", function (e) {
                if (!is.phone()) {
                    let oe = e || window.event;
                    if (oe.stopPropagation) {
                        oe.stopPropagation();
                    } else if (window.event) {
                        oe.cancelBubble = true;
                    }

                    if (!$(oe.target).hasClass("hopeui-scrollbar-bar")) {
                        if ($(this).hasClass("hopeui-form-selected")) {
                            $(this).removeClass("hopeui-form-selected");
                        } else {
                            $(".hopeui-form-selected").removeClass(
                                "hopeui-form-selected"
                            );
                            $(this).addClass("hopeui-form-selected");

                            scrollbarHandler({
                                ele: newEle.children(".hopeui-select-list"),
                                options: {
                                    autoHideBar:
                                        (options && options.autoHideBar) || false,
                                },
                                on: {},
                            });
                            
                        }

                     

                        //打开列表回调
                        if (on && on.toggle) {
                            on.toggle({
                                name: $(this)
                                    .children(".hopeui-select-list")
                                    .attr("name"),
                                eventName: "toggle",
                            });
                        }
                    }
                }
            });

            if (options && options.searchMode) {
                newEle
                    .find("input[hope-type=selector]")
                    .on("keyup", function (e) {
                        if (!is.phone()) {
                            let list = $(this)
                                .parent()
                                .next(".hopeui-select-list")
                                .find(".option");
                            let inputValue = $(e.target).val();
                            newEle.removeClass("hopeui-hide");
                            list.each(function () {
                                if (!$(this).text().includes(inputValue)) {
                                    $(this).addClass("hopeui-hide");
                                } else {
                                    $(this).removeClass("hopeui-hide");
                                }
                            });

                            scrollbarHandler({
                                ele: newEle.children(".hopeui-select-list"),
                                options: {
                                    autoHideBar:
                                        (options && options.autoHideBar) ||
                                        false,
                                },
                                on: {},
                            });

                            //打开列表回调
                            if (on && on.input) {
                                on.input({
                                    ele: $(this).get(0),
                                    value: $(this).val(),
                                    eventName: "input",
                                });
                            }
                        }
                    });
            }

            //绑定自定义option的点击事件
            newEle.find(".option").on("click", function (e) {
                if (e.stopPropagation) {
                    e.stopPropagation();
                } else if (window.event) {
                    window.event.cancelBubble = true;
                }

                let _this = $(this);
                handle(selector, newEle, _this);
                if (is.ie() <= 9) {
                    if (newEle.find("input").val()) {
                        newEle
                            .find("input")
                            .next(".hopeui-placeholder")
                            .addClass("hopeui-hide");
                    } else {
                        newEle
                            .find("input")
                            .next(".hopeui-placeholder")
                            .removeClass("hopeui-hide");
                    }
                }
                //选中options后回调
                if (on && on.change) {
                    on.change({
                        originalParentEle: selector,
                        virtualParentEle: selector.nextSibling,
                        targetEle: e.target,
                        label: _this.text(),
                        value: _this.attr("hope-value"),
                        name: _this.parents(".hopeui-select-list").attr("name"),
                        group: _this.attr("hope-group"),
                        groupSort: _this.attr("hope-group-sort"),
                        eventName: "change",
                    });
                }
            });

            if (is.phone()) {
                $(this).on("change", function (e) {
                    newEle
                        .find(".hopeui-input")
                        .val(
                            $(this)
                                .find("option")
                                .eq($(this).get(0).selectedIndex)
                                .text()
                        );
                    if (on && on.change) {
                        on.change({
                            originalParentEle: selector,
                            virtualParentEle: null,
                            targetEle: e.target,
                            label: $(this)
                                .find("option")
                                .eq($(this).get(0).selectedIndex)
                                .text(),
                            value: $(this).val(),
                            eventName: "change",
                        });
                    }
                });
            }

            //点击select区域外关闭下拉列表
            $(document).on("click", function (e) {
                $(newEle).removeClass("hopeui-form-selected");
                //下拉列表关闭回调
                if (on && on.close) {
                    on.close(e);
                }
            });

            if (on && on.init) {
                on.init({
                    self: obj,
                    ele: $dom[0],
                    eventName: "init",
                });
            }
        });

        function reset(dom) {
            if (dom.next().hasClass("hopeui-form-select")) {
                dom.next().remove();
            }
        }
    }

    obj.val = function (obj) {
        if (obj) {
            //值拆分成数组
            Object.keys(obj).forEach(function (key) {
                let eleArr = $(`select[name=${key}]`);
                if (ele) {
                    utils.isSelf(ele, type)
                        ? (eleArr = $(ele))
                        : (eleArr = $(`${ele} select[name=${key}]`));
                }

                eleArr.each(function (i, thisEle) {
                    let opts = $(this).next().find(".option");
                    //内选项集合
                    opts.each(function (index) {
                        if (
                            $.trim($(this).attr("hope-value")) ==
                            obj[key].value.split(",")[i]
                        ) {
                            handle(thisEle, $(thisEle).next(), $(this));
                        }
                    });

                    utils.validation(thisEle, "pass", null, "select-one");

                    if (is.ie() <= 9) {
                        $(thisEle)
                            .next()
                            .find("input")
                            .next(".hopeui-placeholder")
                            .addClass("hopeui-hide");
                    }
                });
            });
        }
    };

    obj.clear = function (callback) {
        let thisEle = $(`select`);
        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(`${ele} select`));
        }
        thisEle.each(function (i, ele) {
            handle(ele, $(this).next(), $(this).next().find(".option").eq(0));

            if (is.ie() <= 9) {
                $(this)
                    .next()
                    .find("input")
                    .next(".hopeui-placeholder")
                    .removeClass("hopeui-hide");
            }
        });
        if (callback) {
            callback();
        }
    };

    obj.update = function (callback) {
        core();
        if (callback) {
            callback();
        }
    };

    obj.set = function (type, val, callback) {
        $dom.find("option").each(function () {
            let _this = $(this);
            if (type == "value") {
                if (_this.attr("value") == val) {
                    _this.get(0).selected = true;
                } else {
                    _this.get(0).selected = false;
                }
            } else {
                if (_this.text() == val) {
                    _this.get(0).selected = true;
                } else {
                    _this.get(0).selected = false;
                }
            }
        });
        core();
        if (callback) {
            callback();
        }
    };

    //首次初始化
    core();

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

        // original.value = original.selectedOptions[0].value; //?????
    }

    return obj;
};
