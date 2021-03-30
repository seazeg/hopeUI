/*
 * @Author       : Evan.G
 * @Date         : 2020-08-12 17:02:59
 * @LastEditTime : 2021-03-30 18:04:06
 * @Description  : 分页
 */

const $ = require("../utils/hopeu.js");

module.exports.pagerHandler = function ({ ele, options, params, reader, on }) {
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
                success: function (data) {
                    if (reader) {
                        //pageNo:当前页面页码,pageSize:页面内容数量,totalNumber:内容总数,totalPage:总共页数
                        let { pageNo, pageSize, totalNumber } = reader(data);
                        let totalPage = Math.ceil(totalNumber / pageSize);
                        if (totalPage == 0) {
                            totalPage = 1;
                        }
                        let pageHTML = `<div class="hopeui-pager">`;
                        if (pageNo == 1) {
                            pageHTML += `<span class="hopeui-pager-prev hopeui-pager-disabled">${prevName}</span>`;
                        } else {
                            pageHTML += `<span class="hopeui-pager-prev">${prevName}</span>`;
                        }

                        if (totalPage > 1) {
                            if (
                                pageNo - Math.floor(options.omit / 2) > 2 &&
                                pageNo + Math.floor(options.omit / 2) <
                                    totalPage - 1
                            ) {
                                pageHTML += `<span class="hopeui-pager-num" hopeui-num="1">1</span>`;
                                pageHTML += `<i class="hopeui-pager-omit">...</i>`;

                                for (
                                    let i =
                                        pageNo - Math.floor(options.omit / 2);
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
                                if (options.omit > totalPage) {
                                    for (let i = 1; i <= totalPage; i++) {
                                        if (pageNo == i) {
                                            pageHTML += `<span class="hopeui-pager-num hopeui-pager-cur" hopeui-num="${i}">${i}</span>`;
                                        } else {
                                            pageHTML += `<span class="hopeui-pager-num" hopeui-num="${i}">${i}</span>`;
                                        }
                                    }
                                } else {
                                    for (let i = 1; i <= options.omit; i++) {
                                        if (pageNo == i) {
                                            pageHTML += `<span class="hopeui-pager-num hopeui-pager-cur" hopeui-num="${i}">${i}</span>`;
                                        } else {
                                            pageHTML += `<span class="hopeui-pager-num" hopeui-num="${i}">${i}</span>`;
                                        }
                                    }
                                    if (options.omit != totalPage) {
                                        if (options.omit != totalPage - 1) {
                                            pageHTML += `<i class="hopeui-pager-omit">...</i>`;
                                        }
                                        pageHTML += `<span class="hopeui-pager-num" hopeui-num="${totalPage}">${totalPage}</span>`;
                                    }
                                }

                                // if (options.omit != totalPage ) {
                                //     if (options.omit != totalPage - 1) {
                                //         pageHTML += `<i class="hopeui-pager-omit">...</i>`;
                                //     }
                                //     pageHTML += `<span class="hopeui-pager-num" hopeui-num="${totalPage}">${totalPage}</span>`;
                                // }
                            } else if (
                                totalPage - pageNo <=
                                options.omit - Math.floor(options.omit / 2)
                            ) {
                                pageHTML += `<span class="hopeui-pager-num" hopeui-num="1">1</span>`;
                                if (options.omit != totalPage - 1) {
                                    pageHTML += `<i class="hopeui-pager-omit">...</i>`;
                                }
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
                        } else {
                            pageHTML += `<span class="hopeui-pager-num hopeui-pager-cur" hopeui-num="1">1</span>`;
                        }

                        if (pageNo == totalPage) {
                            pageHTML += `<span class="hopeui-pager-next hopeui-pager-disabled">${nextName}</span>`;
                        } else {
                            pageHTML += `<span class="hopeui-pager-next">${nextName}</span>`;
                        }

                        if (options.extend) {
                            pageHTML += `<i class="hopeui-pager-count">共 ${totalNumber} 条</i>`;

                            pageHTML += `<div class="hopeui-pager-jump">跳转到<input type="text" min="1" value="1">页<button type="button" >确定</button></div>`;
                        }
                        pageHTML += `</div>`;

                        $dom.html(pageHTML);

                        $dom.find(".hopeui-pager-num").on("click", function () {
                            let thisPageNum = parseInt($(this).attr("hopeui-num"))
                            if (pageNo != thisPageNum) {
                                if (params.url.includes(".json")) {
                                    params.url =
                                        params.url
                                            .split(".")[0]
                                            .substring(
                                                0,
                                                params.url.split(".")[0]
                                                    .length - 1
                                            ) +
                                            thisPageNum +
                                        ".json"; //测试代码
                                }
                                if(typeof params.data == "string") {
                                    let p = JSON.parse(params.data)
                                    p[pageMapping] = thisPageNum;
                                    params.data = JSON.stringify(p);
                                }else{
                                    params.data[pageMapping] = thisPageNum;
                                }
                             
                                getData(params, reader);
                                if (on && on.jumpOver) {
                                    on.jumpOver({
                                        type: "number",
                                        targetEle: $(this)[0],
                                        pageNo: thisPageNum,
                                        event: "jumpOver",
                                    });
                                }
                            }
                        });

                        $dom.find(".hopeui-pager-prev").on(
                            "click",
                            function () {
                                if (pageNo > 1) {
                                    pageNo = pageNo - 1;
                                    if (params.url.includes(".json")) {
                                        params.url =
                                            params.url
                                                .split(".")[0]
                                                .substring(
                                                    0,
                                                    params.url.split(".")[0]
                                                        .length - 1
                                                ) +
                                            pageNo +
                                            ".json"; //测试代码
                                    }
                                    if(typeof params.data == "string") {
                                        let p = JSON.parse(params.data)
                                        p[pageMapping] = pageNo;
                                        params.data = JSON.stringify(p);
                                    }else{
                                        params.data[pageMapping] = pageNo;
                                    }
                                    getData(params, reader);
                                    if (on && on.jumpOver) {
                                        on.jumpOver({
                                            type: "prev",
                                            targetEle: $(this)[0],
                                            pageNo: pageNo,
                                            event: "jumpOver",
                                        });
                                    }
                                }
                            }
                        );

                        $dom.find(".hopeui-pager-next").on(
                            "click",
                            function () {
                                if (pageNo < totalPage) {
                                    pageNo = pageNo + 1;
                                    if (params.url.includes(".json")) {
                                        params.url =
                                            params.url
                                                .split(".")[0]
                                                .substring(
                                                    0,
                                                    params.url.split(".")[0]
                                                        .length - 1
                                                ) +
                                            pageNo +
                                            ".json"; //测试代码
                                    }
                                    if(typeof params.data == "string") {
                                        let p = JSON.parse(params.data)
                                        p[pageMapping] = pageNo;
                                        params.data = JSON.stringify(p);
                                    }else{
                                        params.data[pageMapping] = pageNo;
                                    }
                                    getData(params, reader);
                                    if (on && on.jumpOver) {
                                        on.jumpOver({
                                            type: "next",
                                            targetEle: $(this)[0],
                                            pageNo: pageNo,
                                            event: "jumpOver",
                                        });
                                    }
                                }
                            }
                        );

                        $dom.find(".hopeui-pager-jump")
                            .children("button")
                            .on("click", function () {
                                let number = parseInt($(this).siblings("input").val());
                                if (number) {
                                    if (params.url.includes(".json")) {
                                        params.url =
                                            params.url
                                                .split(".")[0]
                                                .substring(
                                                    0,
                                                    params.url.split(".")[0]
                                                        .length - 1
                                                ) +
                                            number +
                                            ".json"; //测试代码
                                    }
                                    if(typeof params.data == "string") {
                                        let p = JSON.parse(params.data)
                                        p[pageMapping] = number;
                                        params.data = JSON.stringify(p);
                                    }else{
                                        params.data[pageMapping] = number;
                                    }
                                    getData(params, reader);
                                    if (on && on.jumpOver) {
                                        on.jumpOver({
                                            type: "jump",
                                            targetEle: $(this)[0],
                                            pageNo: pageNo,
                                            event: "jumpOver",
                                        });
                                    }
                                }
                            });

                        if (on && on.complete) {
                            on.complete({
                                object: obj,
                                event: "complete",
                            });
                        }
                    }
                },
                error: function () {},
            })
        );
    }
    getData(params, reader);
    //外部跳转方法
    obj.jump = function (number, callback) {
        if (number) {
            if (params.url.includes(".json")) {
                params.url =
                    params.url
                        .split(".")[0]
                        .substring(0, params.url.split(".")[0].length - 1) +
                    number +
                    ".json"; //测试代码
            }
            if(typeof params.data == "string") {
                let p = JSON.parse(params.data)
                p[pageMapping] = number;
                params.data = JSON.stringify(p);
            }else{
                params.data[pageMapping] = number;
            }
            
            getData(params, reader);
            if (callback) {
                callback(number);
            }
        }
    };

    //参数设外部置方法
    obj.set = function (obj, callback) {
        Object.keys(obj).forEach(function (key) {
            params[key] = obj[key];
        });
        
        getData(params, reader);
        if (callback) {
            callback();
        }
    };

    if (on && on.init) {
        on.init({
            object: obj,
            event: "init",
        });
    }


    return obj;
};
