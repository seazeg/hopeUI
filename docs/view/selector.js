/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:18
 * @LastEditTime : 2020-08-05 09:33:55
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
export const selector = () => {
    return `<div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">通用</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <select name="city" hope-verify="required" class="select_normal">
            <option value="">请选择</option>
            <option value="青岛">青岛</option>
            <option value="武汉">武汉</option>
            <option value="乌鲁木齐">乌鲁木齐</option>
            <option value="南京">南京</option>
            <option value="天津">天津</option>
            <option value="郑州">郑州</option>
            <option value="重庆">重庆</option>
            <option value="成都">成都</option>
            <option value="云南">云南</option>
        </select>
    </div>
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">分组</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <select name="school" hope-verify="required" class="select_group">
            <option value="">请选择</option>
            <optgroup label="北京"">
                <option value="北京大学">北京大学</option>
                <option value="清华大学">清华大学</option>
            </optgroup>
            <optgroup label="浙江"">
                <option value=" 浙江大学">浙江大学</option>
            </optgroup>
        </select>
    </div>
</div>
`;
};
