/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-05 09:35:23
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
                <div class="docs-title">
                    <fieldset>
                        <legend><a name="icon">通用</a></legend>
                    </fieldset>
                </div>
                <div class="docs-content">
                    <input
                        name="text"
                        type="text"
                        placeholder="请输入文本"
                        value=""
                        class="hopeui-input input_normal"
                        hope-verify="required"
                    />
                </div>
                <div class="docs-title">
                    <fieldset>
                        <legend><a name="icon">密码</a></legend>
                    </fieldset>
                </div>
                <div class="docs-content">
                    <input
                        name="password"
                        type="password"
                        placeholder="请输入密码"
                        value=""
                        class="hopeui-input input_normal"
                        hope-verify="required"
                    />
                </div>
            </div>`;
};