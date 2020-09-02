/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-09-02 11:35:15
 * @Description  :
 */

export const viewinfo = {
    html: `
<input type="checkbox" name="subject" value="音乐" hope-verify="required" class="checkbox_normal"/>
<input type="checkbox" name="subject" value="历史" hope-verify="required" class="checkbox_normal"/>
<input type="checkbox" name="subject" value="生物" hope-verify="required" class="checkbox_normal" disabled/>
    `,
    js: `
var checkbox_normal = hope.checkbox({
    ele: ".checkbox_normal",
    on: {
        change: function(e) {
            console.log(e);
        },
    },
});
    `,
};
