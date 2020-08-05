/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-08-05 09:29:15
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

export const checkbox = () => {
    return `
    <div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">通用</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <input type="checkbox" name="subject" value="音乐" hope-verify="required" class="checkbox_normal"/>
        <input type="checkbox" name="subject" value="历史" hope-verify="required" class="checkbox_normal"/>
        <input type="checkbox" name="subject" value="生物" hope-verify="required" class="checkbox_normal"/>
    </div>
</div>

    `;
};
