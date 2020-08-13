/*
 * @Author       : Evan.G
 * @Date         : 2020-08-12 17:02:59
 * @LastEditTime : 2020-08-13 14:50:42
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.pagerHandler = function({ ele, options, params, reader, on }) {
    const obj = new Object();
    let $dom = $(ele);

    (function getData(params, reader) {
        $.ajax({
            ...params,
            success: function(data) {
                if (reader) {
                    //pageNo:当前页面页码
                    //pageSize:页面内容数量
                    //totalNumber:内容总数
                    //totalPage:总共页数
                    let { pageNo, pageSize, totalNumber } = reader(data);
                    let totalPage = Math.ceil(totalNumber / pageSize);
                    let prevName = options.prevName || "上一页",
                        nextName = options.nextName || "下一页";
                    let pageHTML = `<div class="hopeui-pager">`;
                    if (pageNo == 1) {
                        pageHTML += `<span class="hopeui-pager-prev hopeui-pager-disabled">${prevName}</span>`;
                    } else {
                        pageHTML += `<span class="hopeui-pager-prev">${prevName}</span>`;
                    }

                    if (
                        pageNo - Math.floor(options.omit / 2) > 2 &&
                        pageNo + Math.floor(options.omit / 2) < totalPage - 1
                    ) {
                        pageHTML += `<span class="hopeui-pager-num" hopeui-num="1">1</span>`;
                        pageHTML += `<i class="hopeui-pager-omit">...</i>`;

                        for (
                            let i = pageNo - Math.floor(options.omit / 2);
                            i <= pageNo + Math.floor(options.omit / 2);
                            i++
                        ) {
                            if (pageNo == i) {
                                pageHTML += `<span class="hopeui-pager-num hopeui-pager-cur" hopeui-num="${i}">${i}</span>`;
                            } else {
                                pageHTML += `<span class="hopeui-pager-num" hopeui-num="${i}">${i}</span>`;
                            }
                        }

                        pageHTML += `<i class="hopeui-pager-omit">...</i>`;
                        pageHTML += `<span class="hopeui-pager-num" hopeui-num="${totalPage}">${totalPage}</span>`;
                    } else if (pageNo <= options.omit) {
                        for (let i = 1; i <= options.omit; i++) {
                            if (pageNo == i) {
                                pageHTML += `<span class="hopeui-pager-num hopeui-pager-cur" hopeui-num="${i}">${i}</span>`;
                            } else {
                                pageHTML += `<span class="hopeui-pager-num" hopeui-num="${i}">${i}</span>`;
                            }
                        }

                        pageHTML += `<i class="hopeui-pager-omit">...</i>`;
                        pageHTML += `<span class="hopeui-pager-num" hopeui-num="${totalPage}">${totalPage}</span>`;
                    } else if (
                        totalPage - pageNo <=
                        options.omit - Math.floor(options.omit / 2)
                    ) {
                        pageHTML += `<span class="hopeui-pager-num" hopeui-num="1">1</span>`;
                        pageHTML += `<i class="hopeui-pager-omit">...</i>`;
                        for (
                            let i = totalPage - options.omit + 1;
                            i <= totalPage;
                            i++
                        ) {
                            if (pageNo == i) {
                                pageHTML += `<span class="hopeui-pager-num hopeui-pager-cur" hopeui-num="${i}">${i}</span>`;
                            } else {
                                pageHTML += `<span class="hopeui-pager-num" hopeui-num="${i}">${i}</span>`;
                            }
                        }
                    }

                    if (pageNo == totalPage) {
                        pageHTML += `<span class="hopeui-pager-next hopeui-pager-disabled">${nextName}</span>`;
                    } else {
                        pageHTML += `<span class="hopeui-pager-next">${nextName}</span>`;
                    }
                    pageHTML += `</div>`;

                    $dom.html(pageHTML);

                    $dom.find(".hopeui-pager-num").on("click", function() {
                        if (pageNo != $(this).attr("hopeui-num")) {
                            params.url = `/assets/page/list${$(this).attr(
                                "hopeui-num"
                            )}.json`;
                            params.data[options.pageMapping] = $(this).attr("hopeui-num");
                            getData(params, reader);
                            if (on.jump) {
                                on.jump({
                                    type: "number",
                                    targetEle: $(this)[0],
                                    pageNo: $(this).attr("hopeui-num"),
                                });
                            }
                        }
                    });

                    $dom.find(".hopeui-pager-prev").on("click", function() {
                        if (pageNo > 1) {
                            pageNo = pageNo - 1;
                            params.url = `/assets/page/list${pageNo}.json`;
                            params.data[options.pageMapping] = pageNo;
                            getData(params, reader);
                            if (on.jump) {
                                on.jump({
                                    type: "prev",
                                    targetEle: $(this)[0],
                                    pageNo: pageNo,
                                });
                            }
                        }
                    });

                    $dom.find(".hopeui-pager-next").on("click", function() {
                        if (pageNo < totalPage) {
                            pageNo = pageNo + 1;
                            params.url = `/assets/page/list${pageNo}.json`;
                            params.data[options.pageMapping] = pageNo;
                            getData(params, reader);
                            if (on.jump) {
                                on.jump({
                                    type: "next",
                                    targetEle: $(this)[0],
                                    pageNo: pageNo,
                                });
                            }
                        }
                    });
                }
            },
            error: function() {},
        });
    })(params, reader);

    return obj;
};
