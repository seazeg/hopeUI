/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-08-27 16:34:25
 * @Description  :
 */

export const viewinfo = {
    html: `
    <input name="text" type="text" value="" class="hopeui-input js_hopeui_input" placeholder="请输入" autoprompt />
    `,
    js: `
    hope.suggest({
        ele: '.js_hopeui_input',
        params: {
            url: '/assets/page/list1.json',
            dataType: "json",
            type: 'get',
            searchField: 'searchword'
        },
        reader: function (res) {
            var list = res.data;
            var tmp = [];
            for (var i = 0; i < list.length; i++) {
                tmp.push(list[i].goodsName)
            }
            return tmp
        },
        on:{
            input:function (e) {console.log(e);}
        }
    })
    `,
};
