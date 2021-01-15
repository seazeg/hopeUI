/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2021-01-15 15:10:37
 * @Description  :
 */
export const viewinfo = {
general:`
<input name="text" type="text" placeholder="请输入文本" value="" class="hopeui-input input_normal" hope-verify="required" />
`,
password:`
<input name="password" type="password" placeholder="请输入密码" value="" class="hopeui-input input_normal"
hope-verify="required" />
`,
extendContent:`
<input name="extendContent" type="text" placeholder="请输入" value="" class="hopeui-input input_normal2"
hope-verify="required" />
`,
extendContent2:`
<input name="extendContent" type="text" placeholder="请输入" value="" class="hopeui-input input_normal3"
hope-verify="required" />
`,
js:`
var input_normal = hope.input({
    ele: ".input_normal",
    on: {
        blur: function(e) {
            console.log(e);
        },
        focus: function(e) {
            console.log(e);
        },
        input: function(e) {
            console.log(e);
        },
    },
});
`,
js2:`
hope.input({
    ele: '.input_normal2',
    options:{
        extendContent:'<button type="button" class="hopeui-btn">发送短信</button>',
        extendContentLocation:'right'
    }
})
`,
js3:`
hope.input({
    ele: '.input_normal3',
    options: {
        extendContent: '<i class="hopeui-icon hopeui-icon-vercode" style="padding-left:15px;text-align: center;line-height:38px;display:inline-block;color:#5a5a5a"></i>',
        extendContentLocation: 'left'
    }
})
`
}

