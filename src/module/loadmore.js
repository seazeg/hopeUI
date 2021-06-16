/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-06-16 16:59:30
 * @Description  : 流式加载
 */

const $ = require("../utils/hopeu.js");
const { scrollbarHandler } = require("./scrollbar.js");
const { utilsHandler } = require("./utils.js");

module.exports.loadmoreHandler = function ({
    ele,
    options,
    params,
    reader,
    on,
}) {
    const obj = new Object();
    let $dom = $(ele);
    let loadBtnName = options.loadBtnName,
        pageMapping = options.pageMapping || "pageNo",
        autoLoad = options.autoLoad || false,
        offset = options.offset || 10;
    $dom.append('<div class="hopeui-loadmore-box"></div>');

    function getData(params, reader) {
        if (on && on.beforeLoad) {
            on.beforeLoad({
                event: "beforeLoad",
            });
        }
        $.ajax(
            Object.assign(params, {
                success: function (data) {
                    if (reader) {
                        let { pageNo, pageSize, totalNumber } = reader(data);
                        let totalPage = Math.ceil(totalNumber / pageSize);
                        let nextPage = pageNo + 1;
                        let loadHTML = `<div class="hopeui-loadmore" hope-pageNo="${nextPage}"><span class="hopeui-loadmore-tag hopeui-btn" style="${
                            autoLoad ? "opacity:0" : ""
                        }">${loadBtnName}</span></div>`;

                        let loadBox = $dom.find(".hopeui-loadmore-box");

                        if (pageNo > 1) {
                            loadBox.html(
                                '<div class="hopeui-loadmore"><i class="hopeui-anim hopeui-anim-rotate hopeui-icon hopeui-icon-loading hopeui-anim-loop"></i></div>'
                            );
                        }

                        if (totalPage > pageNo) {
                            loadBox.html(loadHTML);
                        } else {
                            loadBox.html("");
                        }

                        scrollbarHandler({
                            ele: $(ele),
                            options: {},
                            on: {
                                scroll: utilsHandler.throttle(function (e) {
                                    if (autoLoad) {
                                        if (e.max - e.distance <= offset) {
                                            if (totalPage > pageNo) {
                                                obj.next();
                                            }
                                        }
                                    }
                                }),
                                init: function (e) {
                                    $dom.find(".hopeui-loadmore-tag").on(
                                        "click",
                                        function () {
                                            if (params.url.includes(".json")) {
                                                params.url =
                                                    params.url
                                                        .split(".")[0]
                                                        .substring(
                                                            0,
                                                            params.url.split(
                                                                "."
                                                            )[0].length - 1
                                                        ) +
                                                    nextPage +
                                                    ".json"; //测试代码
                                            }
                                            params.data[pageMapping] = nextPage;
                                            getData(params, reader);
                                        }
                                    );
                                },
                            },
                        });

                        if (on && on.loaded) {
                            on.loaded({
                                pageNo: pageNo,
                                event: "loaded",
                            });
                        }
                    }
                },
                error: function () {},
            })
        );
    }
    getData(params, reader);

    obj.next = function (callback) {
        let nextPage = +$dom.find(".hopeui-loadmore").attr("hope-pageNo");
        if (params.url.includes(".json")) {
            params.url =
                params.url
                    .split(".")[0]
                    .substring(0, params.url.split(".")[0].length - 1) +
                nextPage +
                ".json"; //测试代码
        }
        params.data[pageMapping] = nextPage;
        getData(params, reader);
        if(callback){
            callback()
        }
    };
    return obj;
};
