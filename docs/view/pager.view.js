/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-13 16:30:47
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
export const pager = () => {
    return `
    <div class="docs-box">
        <div class="docs-title">
            <fieldset>
                <legend><a name="icon">分页</a></legend>
            </fieldset>
        </div>
        <div class="docs-content">
            <div id="pagelist"></div>
            <div id="pager">
            </div>
        </div>
    </div>
    `;
};
