/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-25 11:16:06
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
function hasClass(ele, cls) {
    return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(
        ele.className
    );
}
function addClass(ele, cls) {
    if (!hasClass(ele, cls)) {
        if (ele.className) {
            ele.className += " " + cls;
        } else {
            ele.className += cls;
        }
    }
}

function removeClass(ele, cls) {
    if (hasClass(ele, cls)) {
        ele.className = ele.className.replace(
            new RegExp("(\\s|^)" + cls + "(\\s|$)"),
            ""
        );
    }
}

let ele = document.querySelectorAll(".hopeui-anim");
Array.from(ele).forEach(function(item) {
    item.onclick = function(e) {
        let dataAnim = item.getAttribute("data-anim");
        addClass(item, dataAnim);
        let time = 500;
        if (dataAnim == "hopeui-anim-rotate") {
            time = 1000;
        }
        setTimeout(function() {
            removeClass(item, dataAnim);
        }, time);
    };
});
`
}