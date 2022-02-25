/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2022-02-10 11:01:04
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
        $dom = $(ele);
    }
    function getData(params, reader, obj) {
        // params.data = {};
        // params.data[options.searchField] = obj.prev().val();
        if (on && on.sendBefore) {
            // params.data[options.searchField] = on.sendBefore({
            //     value: obj.prev().val(),
            //     eventName: "sendBefore",
            // });
            params.data = on.sendBefore({
                value: obj.prev().val(),
                eventName: "sendBefore",
            });
        }
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
                                options: {
                                    autoHideBar:
                                        (options && options.autoHideBar) ||
                                        false,
                                    height: (options && options.height) || null,
                                },
                                on: {},
                            });
                            obj.find(".option").on("click", function () {
                                let _this = $(this);
                                _this
                                    .parents(".hopeui-suggest")
                                    .addClass("hopeui-hide")
                                    .prev()
                                    .val(_this.attr("hope-value"));

                                if (on && on.change) {
                                    on.change({
                                        targetEle: _this.get(0),
                                        value: _this.attr("hope-value"),
                                        eventName: "change",
                                    });
                                }
                            });
                        } else {
                            obj.find(".hopeui-suggest-list")
                                .html(
                                    `<div class="option" hope-value="">${
                                        options.noMatchName ||
                                        "-- 没有匹配的内容 --"
                                    }</div>`
                                )
                                .parent()
                                .css("height", "auto");
                        }
                    }
                },
                error: function () {
                    obj.find(".hopeui-suggest-list")
                        .html(
                            `<div class="option" hope-value="">${
                                options.noMatchName || "-- 没有匹配的内容 --"
                            }</div>`
                        )
                        .parent()
                        .css("height", "auto");
                },
            })
        );
    }

    $dom.each(function () {
        let $this = $(this);
        if (!$this.attr("hope-type")) {
            if (is.ie() <= 9 || (options && !options.noPlaceholderMode)) {
                $this
                    .after(
                        `<label class="hopeui-placeholder">${
                            $this.attr("placeholder") || ""
                        }</label>`
                    )
                    .parent()
                    .css("position", "relative");

                $this.siblings(".hopeui-placeholder").css({
                    lineHeight: $this.css("height") + 2,
                    paddingLeft: $this.css("paddingLeft") + 1,
                });
                $this.siblings(".hopeui-placeholder").click(function () {
                    $(this).addClass("hopeui-hide").siblings("input").focus();
                });

                $this.blur(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this
                            .siblings(".hopeui-placeholder")
                            .removeClass("hopeui-hide");
                    }
                });

                $this.focus(function () {
                    let _this = $(this);
                    if (!_this.val()) {
                        _this
                            .siblings(".hopeui-placeholder")
                            .addClass("hopeui-hide");
                    }
                });
                $this.attr("placeholder", "");
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

            if (options && options.isFirstData) {
                getData(params, reader, $this.next());
            }

            $this.on("blur", function () {
                if (on && on.blur) {
                    on.blur({
                        targetEle: $(this).get(0),
                        value: $(this).val(),
                        eventName: "blur",
                    });
                }
            });
            $this.on("focus", function () {
                if (on && on.focus) {
                    on.focus({
                        targetEle: $(this).get(0),
                        value: $(this).val(),
                        eventName: "focus",
                    });
                }
            });
            $this.on("keyup", function () {
                if (!is.empty($(this).val())) {
                    getData(params, reader, $this.next());
                    $this
                        .siblings(".hopeui-suggest")
                        .removeClass("hopeui-hide");
                } else {
                    $this.siblings(".hopeui-suggest").addClass("hopeui-hide");
                }

                if (on && on.input) {
                    on.input({
                        object: obj,
                        targetEle: $(this).get(0),
                        value: $(this).val(),
                        eventName: "input",
                    });
                }
            });

            //点击select区域外关闭下拉列表
            $(document).on("click", function (e) {
                $this.next().addClass("hopeui-hide");
                // $this.siblings('.hopeui-placeholder').addClass("hopeui-hide");
                //下拉列表关闭回调
                if (on && on.close) {
                    on.close(e);
                }
            });

            obj.open = function (callback) {
                getData(params, reader, $this.next());
                $this.siblings(".hopeui-suggest").removeClass("hopeui-hide");
                if (callback) {
                    callback();
                }
            };
        }
    });

    if (on && on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    return obj;
};
