/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 11:14:14
 * @LastEditTime : 2020-08-07 11:15:05
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
export const tab = () => {
    return `<div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">通用</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <div class="hopeui-tab" id="tab1">
            <ul class="hopeui-tab-title">
                <li class="hopeui-tab-this">金牌大牛</li>
                <li>银牌老牛</li>
                <li>铜牌小牛</li>
                <li>铁牌奶牛</li>
                <li>铝牌屁牛</li>
            </ul>
            <div class="hopeui-tab-content">
                <div class="hopeui-tab-item hopeui-show">内容1</div>
                <div class="hopeui-tab-item">内容2</div>
                <div class="hopeui-tab-item">内容3</div>
                <div class="hopeui-tab-item">内容4</div>
                <div class="hopeui-tab-item">内容5</div>
            </div>
        </div>
    </div>

    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">简洁类型</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <div class="hopeui-tab hopeui-tab-simple" id="tab2">
            <ul class="hopeui-tab-title">
                <li class="hopeui-tab-this">金牌大牛</li>
                <li>银牌老牛</li>
                <li>铜牌小牛</li>
                <li>铁牌奶牛</li>
                <li>铝牌屁牛</li>
            </ul>
            <div class="hopeui-tab-content">
                <div class="hopeui-tab-item hopeui-show">内容1</div>
                <div class="hopeui-tab-item">内容2</div>
                <div class="hopeui-tab-item">内容3</div>
                <div class="hopeui-tab-item">内容4</div>
                <div class="hopeui-tab-item">内容5</div>
            </div>
        </div>
    </div>

    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">卡片类型</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <div class="hopeui-tab hopeui-tab-card" id="tab3">
            <ul class="hopeui-tab-title">
                <li class="hopeui-tab-this">金牌大牛</li>
                <li>银牌老牛</li>
                <li>铜牌小牛</li>
                <li>铁牌奶牛</li>
                <li>铝牌屁牛</li>
            </ul>
            <div class="hopeui-tab-content">
                <div class="hopeui-tab-item hopeui-show">内容1</div>
                <div class="hopeui-tab-item">内容2</div>
                <div class="hopeui-tab-item">内容3</div>
                <div class="hopeui-tab-item">内容4</div>
                <div class="hopeui-tab-item">内容5</div>
            </div>
        </div>
    </div>
</div>
    `;
};
