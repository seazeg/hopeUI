/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-09-08 10:23:46
 * @Description  :
 */

export const viewinfo = {
    html: `
<div class="docs-content" style="width:300px">
    <div id="pagelist2"></div>
    <div id="loadmore"></div>
</div>
    `,
    js: `
var loadmore = hope.loadmore({
    ele: "#loadmore",
    options: {
        loadBtnName: '加载多多'
    },
    params: {
        url: '/mock/list1.json',
        dataType: "json",
        type: 'get',
        data: {
            pageNo: 1,
            pageSize: 20
        }
    },
    reader: function (res) {
        var data = res.data;
        var template = '';
        for (var i = 0; i < data.length; i++) {
            template += "<p>" + data[i].goodsName + "|" + data[i].goodsStar + "</p>"
        }
        $('#pagelist2').append(template);
        return {
            pageNo: res.pageNo,
            pageSize: res.pageSize,
            totalNumber: res.totalNumber
        }
    },
    on: {
        loaded: function (e) {
            console.log(e);
        }
    }
})
    `,
};
