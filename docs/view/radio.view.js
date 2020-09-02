/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:33
 * @LastEditTime : 2020-08-25 10:40:31
 * @Description  :
 */

export const viewinfo = {
    html: `
<input type="radio" name="radio" value="男" title="男" hope-verify="required" checked class="radio_normal" />
<input type="radio" name="radio" value="女" title="女" hope-verify="required" class="radio_normal" />
<input type="radio" name="radio" value="什么玩意" title="什么玩意" hope-verify="required" class="radio_normal" disabled/>
`,
    js: `
hope.radio({
    ele: ".radio_normal",
    on: {
        change: function(e) {
            console.log(e);
        },
    },
});
`,
};