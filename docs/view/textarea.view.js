/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:45:11
 * @LastEditTime : 2020-12-22 16:19:26
 * @Description  : 
 */ 
export const viewinfo = {
html: `
<textarea name="textarea" class="hopeui-textarea text_normal" placeholder="请输入内容" hope-verify="required" maxlength="100"></textarea>
`,
js: `
let text_normal = hope.textarea({
    ele: ".text_normal",
    options:{
        remainingWords:true
    },
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