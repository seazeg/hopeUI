/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:18
 * @LastEditTime : 2020-08-25 10:51:25
 * @Description  : 
 */ 
export const viewinfo = {
general: `
<select name="city" hope-verify="required" class="select_normal">
    <option value="">请选择一个选项</option>
    <option value="青岛">青岛</option>
    <option value="武汉">武汉</option>
    <option value="乌鲁木齐">乌鲁木齐</option>
    <option value="南京">南京</option>
    <option value="天津">天津</option>
    <option value="郑州">郑州</option>
    <option value="重庆">重庆</option>
    <option value="成都">成都</option>
    <option value="云南">云南</option>
</select>

`,
group:`
<select name="school" hope-verify="required" class="select_group">
    <option value="">请选择一个选项</option>
    <optgroup label="北京"">
        <option value=" 北京大学">北京大学</option>
        <option value="清华大学">清华大学</option>
    </optgroup>
    <optgroup label="浙江"">
        <option value=" 浙江大学">浙江大学</option>
    </optgroup>
</select>
`,
generalJS:`
let select_normal = hope.selector({
    ele: ".select_normal",
    on: {
        change: function(e) {
            console.log(e);
        },
        toggle: function(e) {
            console.log(e);
        },
    },
});
`,
groupJS:`
let select_normal = hope.selector({
    ele: ".select_group",
    on: {
        change: function(e) {
            console.log(e);
        },
        toggle: function(e) {
            console.log(e);
        },
    },
});`
}

