/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-09-30 10:33:31
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
    $dom.each(function () {
        //模板初始化
        let newEle,
            selector = $(this)[0];
        let template = `<div class="hopeui-form-select"><div class="hopeui-select-title"><input type="text" placeholder="${selector.children[0].innerText}" readonly value="" hope-value="" hope-type="selector" class="hopeui-input"/><i class="hopeui-edge"></i></div><div class="hopeui-select-list hopeui-anim hopeui-anim-upbit" name="${selector.name}"><div class="hopeui-scrollbar-box ">`;

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
                            template += `<div class="option group" hope-group=${i} hope-group-sort=${ii} hope-value="${groupOpt.value}">${groupOpt.innerText}</div>`;
                        });
                } else {
                    // if (item.value) {
                    //     template += `<div class="option" hope-value="${item.value}">${item.innerText}</div>`;
                    // } else {
                    //     template += `<div class="option hopeui-select-tips" hope-value="${item.value}">${item.innerText}</div>`;
                    // }
                    template += `<div class="option" hope-value="${item.value}">${item.innerText}</div>`;
                }
            });

        template += `</div></div></div>`;

        newEle = $(template).insertAfter(selector);
        
        if (!is.phone()) {
            $(selector).addClass("hopeui-hide");
        } else {
            $(selector).addClass("hopeui-select-phone").parent().addClass('hopeui-relative');
            $(selector).on('change',function(e){
                newEle.find("input").val($(this).val())
            })
        }

    
        if (is.ie() == 8) {
            let $this = newEle.find("input");
            $this
                .after(
                    `<label class="hopeui-placeholder">${
                        $this.attr("placeholder") || "请输入"
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
        newEle.on("click", function (e) {
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
                    }

                    scrollbarHandler({
                        ele: newEle.children(".hopeui-select-list"),
                        options: {},
                        on: {},
                    });

                    //打开列表回调
                    if (on.toggle) {
                        on.toggle();
                    }
                }
            } 
        });

        //绑定自定义option的点击事件
        newEle.find(".option").on("click", function (e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else if (window.event) {
                window.event.cancelBubble = true;
            }

            let _this = $(this);
            handle(selector, newEle, _this);
            if (is.ie() == 8) {
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

        if (is.phone()) {
            $(this).on('change',function(e){
                newEle.find('.hopeui-input').val($(this).find('option').eq($(this).get(0).selectedIndex).text())
                if (on.change) {
                    on.change({
                        targetEle: e.target,
                        label: $(this).find('option').eq($(this).get(0).selectedIndex).text(),
                        value: $(this).val(),
                        eventName: "change",
                    });
                }
            })
        }
       

        //点击select区域外关闭下拉列表
        $(document).on("click", function (e) {
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

        // original.value = original.selectedOptions[0].value; //?????
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

                    if (is.ie() == 8) {
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

    obj.clear = function () {
        let thisEle = $(`select`);
        if (ele) {
            utils.isSelf(ele, type)
                ? (thisEle = $(ele))
                : (thisEle = $(`${ele} select`));
        }
        thisEle.each(function (i, ele) {
            handle(ele, $(this).next(), $(this).next().find(".option").eq(0));

            if (is.ie() == 8) {
                $(this)
                    .next()
                    .find("input")
                    .next(".hopeui-placeholder")
                    .removeClass("hopeui-hide");
            }
        });
    };

    return obj;
};
