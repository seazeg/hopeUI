/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-08-06 16:41:37
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

export const grid = () => {
    return `
    
<div class="docs-box">
<div class="docs-title">
    <fieldset>
        <legend><a name="icon">通用示例</a></legend>
    </fieldset>
</div>
<div class="docs-content">
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                33%
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                33%
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                33%
            </div>
        </div>
    </div>
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                1/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                1/12
            </div>
        </div>
    </div>
</div>

<div class="docs-title">
    <fieldset>
        <legend><a name="icon">流式</a></legend>
    </fieldset>
</div>
<div class="docs-content">
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-12-12 hopeui-col-md-6-12 hopeui-col-xs-3-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                默认：12/12 平板：6/12 移动：3/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-7-12 hopeui-col-md-6-12 hopeui-col-xs-9-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                默认：7/12 平板：6/12 移动：9/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-5-12 hopeui-col-md-6-12 hopeui-col-xs-9-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                默认：5/12 平板：6/12 移动：9/12
            </div>
        </div>
        <div
        class="hopeui-col-xl-12-12 hopeui-col-md-6-12 hopeui-col-xs-3-12"
    >
        <div class="docs-grid-demo docs-grid-demo-bg1">
            默认：5/12 平板：6/12 移动：9/12
        </div>
    </div>
    </div>
</div>

<div class="docs-title">
    <fieldset>
        <legend><a name="icon">列间距</a></legend>
    </fieldset>
</div>
<div class="docs-content">
    <div class="hopeui-row hopeui-col-space2">
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                33%
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                33%
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                33%
            </div>
        </div>
    </div>
</div>

<div class="docs-title">
    <fieldset>
        <legend><a name="icon">偏移量</a></legend>
    </fieldset>
</div>
<div class="docs-content">
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                4/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-xl-offset1 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                偏移1列
            </div>
        </div>
    </div>
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                4/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-xl-offset2 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                偏移2列
            </div>
        </div>
    </div>
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                4/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-xl-offset3 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                偏移3列
            </div>
        </div>
    </div>
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                4/12
            </div>
        </div>
        <div
            class="hopeui-col-xl-4-12 hopeui-col-xl-offset4 hopeui-col-md-4-12 hopeui-col-xs-4-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg3">
                偏移4列
            </div>
        </div>
    </div>
</div>

<div class="docs-title">
    <fieldset>
        <legend><a name="icon">居中显示</a></legend>
    </fieldset>
</div>
<div class="docs-content">
    <div class="hopeui-row hopeui-col-space2 hopeui-col-center">
        <div
            class="hopeui-col-xl-5-12 hopeui-col-md-5-12 hopeui-col-xs-5-12 hopeui-col-center"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                5/12
            </div>
        </div>
    </div>
</div>

<div class="docs-title">
    <fieldset>
        <legend><a name="icon">栅格内嵌</a></legend>
    </fieldset>
</div>
<div class="docs-content">
    <div class="hopeui-row">
        <div
            class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg1">
                <div class="hopeui-row" style="padding: 10px;">
                    <div
                        class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                    >
                        <div class="docs-grid-demo docs-grid-demo-bg2">
                            50%
                        </div>
                    </div>
                    <div
                        class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                    >
                        <div class="docs-grid-demo docs-grid-demo-bg2">
                            50%
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div
            class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
        >
            <div class="docs-grid-demo docs-grid-demo-bg2">
                <div class="hopeui-row" style="padding: 10px;">
                    <div
                        class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                    >
                        <div class="docs-grid-demo docs-grid-demo-bg1">
                            50%
                        </div>
                    </div>
                    <div
                        class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                    >
                        <div class="docs-grid-demo docs-grid-demo-bg1">
                            50%
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</div>


 `;
};
