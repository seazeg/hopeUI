/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-26 16:54:30
 * @Description  : 加载更多
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

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
        pageMapping = options.pageMapping || "pageNo";

    function getData(params, reader, nextPage) {
        $.ajax(
            Object.assign(params, {
                success: function (data) {
                    if (reader) {
                        let { pageNo, pageSize, totalNumber } = reader(data);
                        let totalPage = Math.ceil(totalNumber / pageSize);
                        let nextPage = pageNo + 1;
                        let loadHTML = `<div class="hopeui-loadmore" hope-pageNo="${nextPage}"><span class="hopeui-loadmore-tag hopeui-btn">${loadBtnName}</span></div>`;
                        if (pageNo > 1) {
                            $dom.html(
                                '<div class="hopeui-loadmore"><i class="hopeui-anim hopeui-anim-rotate hopeui-icon hopeui-icon-loading hopeui-anim-loop"></i></div>'
                            );
                        }

                        if (totalPage > pageNo) {
                            $dom.html(loadHTML);
                            $dom.find('.hopeui-loadmore-tag').on("click", function () {
                                params.url = `../../assets/page/list${nextPage}.json`;
                                params.data[pageMapping] = nextPage;
                                getData(params, reader);
                            });
                        } else {
                            $dom.html("");
                        }

                        if (on.loaded) {
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

    obj.next = function () {
        let nextPage = +$dom.children().attr("hope-pageNo");
        params.url = `../../assets/page/list${nextPage}.json`;
        params.data[pageMapping] = nextPage;
        getData(params, reader);
    };
    return obj;
};
