/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-26 14:50:55
 * @Description  : 加载更多
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.loadmoreHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    let loadBtnName = options.loadBtnName;

    function getData(params, reader) {
        $.ajax(
            Object.assign(params, {
                success: function (data) {
                    if (reader) {
                        //pageNo:当前页面页码,pageSize:页面内容数量,totalNumber:内容总数,totalPage:总共页数
                        let { pageNo, pageSize, totalNumber } = reader(data);
                        let totalPage = Math.ceil(totalNumber / pageSize);
                        let pageHTML = `<div class="hopeui-pager">`;
                    }
                },
                error: function () {},
            })
        );
    }
    getData(params, reader);
    return obj;
};
