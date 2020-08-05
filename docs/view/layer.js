/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2020-08-05 10:56:03
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
export const layer = () => {
    return `
    <div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">普通弹层</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <button type="button" class="hopeui-btn" id="open1">
            打开弹层
        </button>
    </div>

    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">iframe嵌入弹层</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <button type="button" class="hopeui-btn" id="open2">
            打开弹层
        </button>
    </div>

    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">可拖拽弹层</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <button type="button" class="hopeui-btn" id="open3">
            打开弹层
        </button>
    </div>
</div>
`;
};
