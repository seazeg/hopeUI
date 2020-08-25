/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 11:14:14
 * @LastEditTime : 2020-08-25 11:09:21
 * @Description  :
 */
export const viewinfo = {
general:`
<div class="hopeui-tab" id="tab1">
    <div class="hopeui-tab-title">
        <ul>
            <li class="hopeui-tab-this">金牌大牛</li>
            <li>银牌老牛</li>
            <li>铜牌小牛</li>
            <li>铁牌奶牛</li>
            <li>铝牌屁牛</li>
        </ul>
    </div>
    <div class="hopeui-tab-content">
        <div class="hopeui-tab-inner">
            <div class="hopeui-tab-item">内容1</div>
            <div class="hopeui-tab-item">内容2</div>
            <div class="hopeui-tab-item">内容3</div>
            <div class="hopeui-tab-item">内容4</div>
            <div class="hopeui-tab-item">内容5</div>
        </div>
    </div>
</div>
`,
concise:`
<div class="hopeui-tab hopeui-tab-simple" id="tab2">
    <div class="hopeui-tab-title">
        <ul>
            <li class="hopeui-tab-this">金牌大牛</li>
            <li>银牌老牛</li>
            <li>铜牌小牛</li>
            <li>铁牌奶牛</li>
            <li>铝牌屁牛</li>
        </ul>
    </div>
    <div class="hopeui-tab-content">
        <div class="hopeui-tab-inner">
            <div class="hopeui-tab-item">内容1</div>
            <div class="hopeui-tab-item">内容2</div>
            <div class="hopeui-tab-item">内容3</div>
            <div class="hopeui-tab-item">内容4</div>
            <div class="hopeui-tab-item">内容5</div>
        </div>
    </div>
</div>
`,
card: `
<div class="hopeui-tab hopeui-tab-card" id="tab3">
    <div class="hopeui-tab-title">
        <ul>
            <li class="hopeui-tab-this">金牌大牛</li>
            <li>银牌老牛</li>
            <li>铜牌小牛</li>
            <li>铁牌奶牛</li>
            <li>铝牌屁牛</li>
        </ul>
    </div>
    <div class="hopeui-tab-content">
        <div class="hopeui-tab-inner">
            <div class="hopeui-tab-item">内容1</div>
            <div class="hopeui-tab-item">内容2</div>
            <div class="hopeui-tab-item">内容3</div>
            <div class="hopeui-tab-item">内容4</div>
            <div class="hopeui-tab-item">内容5</div>
        </div>
    </div>
</div>
`,
generalJS: `
hope.tab({
    ele: "#tab1",
    on: {
        change: function(e) {
            console.log(e);
        },
        init: function(e) {
            console.log(e);
        },
    },
});
`,
conciseJS: `
hope.tab({
    ele: "#tab2",
    options: {
        slideSwitch: true,
    },
});
`,
cardJS: `
hope.tab({
    ele: "#tab3",
});
`
}
