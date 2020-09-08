/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-09-08 10:19:59
 * @Description  :
 */

export const viewinfo = {
    general: `
    <div id="pagelist"></div>
    <div id="pager">
    </div>
    `,
    generalJS:`
    var mypager = hope.pager({
        ele: "#pager",
        options: {
            omit: 5, //最多保留多少按钮,奇数
            hideNum: true,
            pageMapping: "pageNo", //当前页码字段的映射，默认pageNo
        },
        params: {
            url: "/mock/list1.json",
            dataType: "json",
            type: "get",
            data: {
                pageNo: 1,
                pageSize: 20,
            },
        },
        reader: function(res) {
            var data = res.data;
            var template = "";
            for (var i = 0; i < data.length; i++) {
                template +=
                    "<p>" +
                    data[i].goodsName +
                    "|" +
                    data[i].goodsStar +
                    "</p>";
            }
            $("#pagelist").html(template);
            return {
                pageNo: res.pageNo,
                pageSize: res.pageSize,
                totalNumber: res.totalNumber,
            };
        },
        on: {
            jumpOver: function(e) {
                console.log(e);
            },
        },
    });
    `,
    extend: `
    <div id="pagelist2"></div>
    <div id="pager2">
    </div>
    `,
    extendJS:`
    var mypager2 = hope.pager({
        ele: "#pager2",
        options: {
            omit: 5, //最多保留多少按钮,必须奇数
            prevName: "prev",
            nextName: "next",
            hideNum: true,
            pageMapping: "pageNo", //当前页码字段的映射，默认pageNo
            extend: true,
        },
        params: {
            url: "/mock/list1.json",
            dataType: "json",
            type: "get",
            data: {
                pageNo: 1,
                pageSize: 20,
            },
        },
        reader: function(res) {
            var data = res.data;
            var template = "";
            for (var i = 0; i < data.length; i++) {
                template +=
                    "<p>" +
                    data[i].goodsName +
                    "|" +
                    data[i].goodsStar +
                    "</p>";
            }
            $("#pagelist2").html(template);
            return {
                pageNo: res.pageNo,
                pageSize: res.pageSize,
                totalNumber: res.totalNumber,
            };
        },
        on: {
            jumpOver: function(e) {
                console.log(e);
            },
        },
    });
    //跳转到第10页
    mypager2.jump(2);
    `,

}