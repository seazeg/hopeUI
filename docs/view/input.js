/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-04 17:38:18
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
export const input = () => {
    return `<div class="docs-box">
    <input
        name="text"
        type="text"
        placeholder="请输入文本"
        value=""
        class="hopeui-input input_normal"
        hope-verify="required"
    />

    <input
        name="password"
        type="password"
        placeholder="请输入密码"
        value=""
        class="hopeui-input input_normal"
        hope-verify="required"
    />
</div>`;
};
