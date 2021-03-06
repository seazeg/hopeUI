/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-28 15:37:15
 * @Description  : 文本框
 */

const $ = require("../utils/hopeu.js");
const { utils } = require("../utils/verify.js");
const { is } = require("../utils/is.js");
const { scrollbarHandler } = require("./scrollbar.js");

module.exports.suggestHandler = function ({
    ele,
    options,
    params,
    reader,
    on,
}) {
    const obj = new Object();
    let type = "input";
    let $dom = $("input[type=text]");
    if (ele) {
        utils.isSelf(ele, type)
            ? ($dom = $(ele))
            : ($dom = $(`${ele} input[type=text]`));
    }

    function getData(params, reader, obj) {
        params.data = {};
        params.data[params.searchField] = obj.prev().val();
        $.ajax(
            Object.assign(params, {
                success: function (data) {
                    if (reader) {
                        let list = reader(data);
                        let html = "";
   
                        if (list.length > 0) {
                            for (let item of list) {
                                html += `<div class="option" hope-value="${item}">${item}</div>`;
                            }
                            obj.find(".hopeui-suggest-list").html(html);
                            scrollbarHandler({
                                ele: obj,
                                options: {},
                                on: {},
                            });
                            obj.find(".option").on("click", function () {
                                let _this = $(this);
                                _this
                                    .parents(".hopeui-suggest")
                                    .addClass("hopeui-hide")
                                    .siblings('.hopeui-suggest')
                                    .val(_this.attr("hope-value"));

                                if (on.change) {
                                    on.change({
                                        targetELe: _this.get(0),
                                        value: _this.attr("hope-value"),
                                        eventName: "change",
                                    });
                                }
                            });
                        } else {
                            obj.find(".hopeui-suggest-list").html(
                                `<div class="option" hope-value="">${
                                    options.noMatchName ||
                                    "-- 没有匹配的内容 --"
                                }</div>`
                            );
                        }
                    }
                },
                error: function () {
                    obj.find(".hopeui-suggest-list").html(
                        `<div class="option" hope-value="">${
                            options.noMatchName ||
                            "-- 没有匹配的内容 --"
                        }</div>`
                    );
                },
            })
        );
    }

    $dom.each(function () {
        let $this = $(this);
        if (!$this.attr("hope-type")) {
            if (is.ie() == 8) {
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
                $this.next().click(function () {
                    $(this).addClass("hopeui-hide").prev().focus();
                });

                $this.blur(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this.siblings('.hopeui-placeholder').removeClass("hopeui-hide");
                    }
                });

                $this.focus(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this.siblings('.hopeui-placeholder').addClass("hopeui-hide");
                    }
                });
            }

            $this
                .after(
                    `
                    <div class="hopeui-suggest hopeui-anim hopeui-anim-upbit hopeui-scrollbar hopeui-hide">
                        <div class="hopeui-scrollbar-box hopeui-suggest-list">
                         
                        </div>
                    </div>
                `
                )
                .parent()
                .addClass("hopeui-relative")
                .find(".hopeui-suggest")
                .css("top", $this.height() + 3);

            $this.on('blur',function (){
                if (on.blur) {
                    on.blur({
                        targetELe: $(this).get(0),
                        value: $(this).val(), 
                        eventName: "blur",
                    });
                }
            })
            $this.on('focus',function (){
                if (on.focus) {
                    on.focus({
                        targetELe: $(this).get(0),
                        value: $(this).val(), 
                        eventName: "focus",
                    });
                }
            })
            $this.on('input propertychange',function (){
                if (!is.empty($(this).val())) {
                    getData(params, reader, $this.next());
                    $this.siblings('.hopeui-suggest').removeClass("hopeui-hide");
                } else {
                    $this.siblings('.hopeui-suggest').addClass("hopeui-hide");
                }

                if (on.input) {
                    on.input({
                        targetELe: $(this).get(0),
                        value: $(this).val(), 
                        eventName: "input",
                    });
                }
            })


            //点击select区域外关闭下拉列表
            $(document).on("click", function (e) {
                $this.next().addClass("hopeui-hide");
                //下拉列表关闭回调
                if (on.close) {
                    on.close(e);
                }
            });
        }
    });

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    return obj;
};
