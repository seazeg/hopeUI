/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-11 11:54:30
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");


module.exports.selectorHandler = function({ ele, options, on }) {
    const obj = new Object();
    let type = "select";
    let $dom = $("select");
    if (ele) {
        utils.isSelf(ele, type) ? ($dom = $(ele)) : ($dom = $(`${ele} select`));
    }

    if(!Array.from){
        Array.from = function(iterable){
            // IE(包括IE11)没有这个方法,用[].slice.call(new Uint8Array..代替
            return [].slice.call(new Uint8Array(iterable));
        }
    }
    
    Array.from($dom).forEach(function(selector) {
        //模板初始化
        let newEle, items;
        let template = `<div class="hopeui-form-select"><div class="hopeui-select-title"><input type="text" placeholder="${selector.children[0].innerText}" readonly value="" hope-value="" hope-type="selector" class="hopeui-input"/><i class="hopeui-edge"></i></div><div class="hopeui-select-list hopeui-anim hopeui-anim-upbit" name="${selector.name}">`;

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
                $(".hopeui-form-selected").removeClass("hopeui-form-selected");
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

    obj.val = function(params) {
        if (params) {
            //值拆分成数组
            Object.keys(params).forEach(function(key) {
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
                            params[key].value.split(",")[i]
                        ) {
                            handle(thisEle, $(thisEle).next(), $(this));
                        }
                    });

                    utils.validation(thisEle, "pass", null, "select-one");
                });
            });
        }
    };

    obj.clear = function() {
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
    };

    return obj;
};
