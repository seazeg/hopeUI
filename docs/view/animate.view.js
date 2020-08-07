/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-07 14:46:35
 * @Description  :
 */

import {
    withKnobs,
    number,
    object,
    boolean,
    text,
    select,
    date,
    array,
    color,
} from "@storybook/addon-knobs";
import styleConf from "../styleConfig.json";
import { utils } from "../utils";
export const animate = () => {
    return `
    <div class="docs-box">
            <div class="docs-title">
                <fieldset>
                    <legend><a name="icon">动画效果</a></legend>
                </fieldset>
            </div>
            <div class="docs-content">
                <div class="hopeui-row hopeui-col-space10">
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-up"
                        >
                            自底向上
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-down"
                        >
                            自顶向下
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-left"
                        >
                            自右向左
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-right"
                        >
                            自左向右
                        </span>
                    </div>
                </div>
                <div class="hopeui-row hopeui-col-space10">
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-upbit"
                        >
                            快速自底向上
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-downbit"
                        >
                            快速自顶向下
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-leftbit"
                        >
                            快速自右向左
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-rightbit"
                        >
                            快速自左向右
                        </span>
                    </div>
                </div>
                <div class="hopeui-row hopeui-col-space10">
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-scale"
                        >
                            放大
                        </span>
                    </div>
                    <div class="hopeui-col-3-12 ">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-scaleSpring"
                        >
                            快速放大
                        </span>
                    </div>
                    <div class="hopeui-col-3-12">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-fadeout"
                        >
                            渐隐
                        </span>
                    </div>
                    <div class="hopeui-col-3-12">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-fadein"
                        >
                            渐现
                        </span>
                    </div>
                </div>
                <div class="hopeui-row hopeui-col-space10">
                    <div class="hopeui-col-3-12">
                        <span
                            class="hopeui-anim docs-demo-circle"
                            data-anim="hopeui-anim-rotate"
                        >
                            旋转
                        </span>
                    </div>
                </div>
            </div>
        </div>`;
};
