/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-25 10:34:33
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
`
}

