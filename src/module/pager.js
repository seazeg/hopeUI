/*
 * @Author       : Evan.G
 * @Date         : 2020-08-12 17:02:59
 * @LastEditTime : 2020-08-13 17:37:19
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.pagerHandler = function({ ele, options, params, reader, on }) {
    const obj = new Object();
    let $dom = $(ele);
    let prevName = options.prevName || "上一页",
        nextName = options.nextName || "下一页",
        pageMapping = options.pageMapping || "pageNo";

    /**
     * @description:
     * @param {params} ajax参数
     * @param {reader} 获取调用端返回的参数 pageNo, pageSize, totalNumber
     * @return {type}
     */

    function getData(params, reader) {
        $.ajax(
            Object.assign(params, {
                success: function(data) {
                    if (reader) {
                        //pageNo:当前页面页码,pageSize:页面内容数量,totalNumber:内容总数,totalPage:总共页数
                        let { pageNo, pageSize, totalNumber } = reader(data);
                        let totalPage = Math.ceil(totalNumber / pageSize);
                        let pageHTML = `<div class="hopeui-pager">`;
                        if (pageNo == 1) {
                            pageHTML += `<span class="hopeui-pager-prev hopeui-pager-disabled">${prevName}</span>`;
                        } else {
                            pageHTML += `<span class="hopeui-pager-prev">${prevName}</span>`;
                        }

                        if (
                            pageNo - Math.floor(options.omit / 2) > 2 &&
                            pageNo + Math.floor(options.omit / 2) <
                                totalPage - 1
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

                        if (options.extend) {
                            pageHTML += `<span class="hopeui-pager-count">共 ${totalNumber} 条</span>`;

                            pageHTML += `<div class="hopeui-pager-jump">到第<input type="text" min="1" value="1">页<button type="button">确定</button></div>`;
                        }
                        pageHTML += `</div>`;

                        $dom.html(pageHTML);

                        $dom.find(".hopeui-pager-num").on("click", function() {
                            if (pageNo != $(this).attr("hopeui-num")) {
                                params.url = `../../assets/page/list${$(
                                    this
                                ).attr("hopeui-num")}.json`; //测试代码
                                params.data[pageMapping] = $(this).attr(
                                    "hopeui-num"
                                );
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
                                params.url = `../../assets/page/list${pageNo}.json`; //测试代码
                                params.data[pageMapping] = pageNo;
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
                                params.url = `../../assets/page/list${pageNo}.json`; //测试代码
                                params.data[pageMapping] = pageNo;
                                getData(params, reader);
                                if (on.jumpOver) {
                                    on.jumpOver({
                                        type: "next",
                                        targetEle: $(this)[0],
                                        pageNo: pageNo,
                                        event: "jumpOver",
                                    });
                                }
                            }
                        });

                        $dom.find(".hopeui-pager-jump")
                            .children("button")
                            .on("click", function() {
                                let number = $(this)
                                    .siblings("input")
                                    .val();
                                if (number) {
                                    params.url = `../../assets/page/list${number}.json`; //测试代码
                                    params.data[pageMapping] = number;
                                    getData(params, reader);
                                }
                            });
                    }
                },
                error: function() {},
            })
        );
    }
    getData(params, reader);
    //外部跳转方法
    obj.jump = function(number) {
        if (number) {
            params.url = `../../assets/page/list${number}.json`; //测试代码
            params.data[pageMapping] = number;
            getData(params, reader);
        }
    };
    return obj;
};
