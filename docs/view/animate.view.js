/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-25 14:07:28
 * @Description  :
 */

export const viewinfo = {
html:`
<div class="hopeui-row hopeui-col-space10">
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-up">
            自底向上
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-down">
            自顶向下
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-left">
            自右向左
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-right">
            自左向右
        </span>
    </div>
</div>
<div class="hopeui-row hopeui-col-space10">
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-upbit">
            快速自底向上
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-downbit">
            快速自顶向下
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-leftbit">
            快速自右向左
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-rightbit">
            快速自左向右
        </span>
    </div>
</div>
<div class="hopeui-row hopeui-col-space10">
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-scale">
            放大
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-scaleSpring">
            快速放大
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-fadeout">
            渐隐
        </span>
    </div>
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-fadein">
            渐现
        </span>
    </div>
</div>
<div class="hopeui-row hopeui-col-space10">
    <div class="hopeui-col-3-12">
        <span class="hopeui-anim docs-demo-circle" data-anim="hopeui-anim-rotate">
            旋转
        </span>
    </div>
</div>
`,
js: `
$('.docs-demo-circle').on('click',function(){
    let _this = $(this);
    let anim = _this.attr('data-anim')
    _this.addClass(anim);
    let time = 500;
    if (anim == "hopeui-anim-rotate") {
        time = 1000;
    }
    setTimeout(function() {
        _this.removeClass(anim)
    }, time);
})
`
}