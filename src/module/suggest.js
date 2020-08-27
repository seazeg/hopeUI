/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-27 16:23:18
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
        params.data = {}
        params.data[params.searchField] = obj.prev().val();
        $.ajax(
            Object.assign(params, {
                success: function (data) {
                    if (reader) {
                        let list = reader(data);
                        let html = "";
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
                                .prev()
                                .val(_this.attr("hope-value"));

                            if (on.change) {
                                on.change({
                                    targetELe: _this.get(0),
                                    value: _this.attr("hope-value"),
                                });
                            }
                        });
                    }
                },
                error: function () {},
            })
        );
    }

    $dom.each(function () {
        let $this = $(this);
        let input = $this[0];
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
                        _this.next().removeClass("hopeui-hide");
                    }
                });

                $this.focus(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this.next().addClass("hopeui-hide");
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

            input.onblur = function (e) {
                if (on.blur) {
                    on.blur({
                        targetELe: e.target,
                        value: e.target.value,
                        eventName: "blur",
                    });
                }
            };
            input.onfocus = function (e) {
                if (on.focus) {
                    on.focus({
                        targetELe: e.target,
                        value: e.target.value,
                        eventName: "focus",
                    });
                }
            };
            input.oninput = function (e) {
                if (!is.empty(e.target.value)) {
                    getData(params, reader, $this.next());
                    $this.next().removeClass("hopeui-hide");
                } else {
                    $this.next().addClass("hopeui-hide");
                }

                if (on.input) {
                    on.input({
                        targetELe: e.target,
                        value: e.target.value,
                        eventName: "input",
                    });
                }
            };
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
