/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:33
 * @LastEditTime : 2020-08-25 09:36:48
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
export const radio = () => {
    return `<div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">通用</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <input
            type="radio"
            name="radio"
            value="男"
            title="男"
            hope-verify="required"
            checked
            class="radio_normal"
        />
        <input
            type="radio"
            name="radio"
            value="女"
            title="女"
            hope-verify="required"
            class="radio_normal"
        />
        <input
            type="radio"
            name="radio"
            value="什么玩意"
            title="什么玩意"
            hope-verify="required"
            class="radio_normal"
        />
    </div>
    <div class="docs-content">
        <input
            type="radio"
            name="radio2"
            value="第一"
            title="第一"
            hope-verify="required"
            checked
            class="radio_normal"
        />
        <input
            type="radio"
            name="radio2"
            value="第二"
            title="第二"
            hope-verify="required"
            class="radio_normal2"
        />
        <input
            type="radio"
            name="radio2"
            value="第三"
            title="第三"
            hope-verify="required"
            class="radio_normal2"
        />
    </div>
</div>
`;
};
