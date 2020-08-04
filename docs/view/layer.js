/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2020-08-04 16:52:16
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
<div style="padding:3% 2%">
    <button type="button" class="hopeui-btn" id="open1">
        打开弹层
    </button>
    <button type="button" class="hopeui-btn" id="open2">
        打开弹层2
    </button>
</div>`;
};
