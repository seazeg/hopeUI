/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:45:11
 * @LastEditTime : 2020-08-04 16:53:51
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
export const textarea = () => {
    return `<div class="docs-box">
    <textarea
        name="textarea"
        class="hopeui-textarea text_normal"
        placeholder="请输入内容"
        hope-verify="required"
    ></textarea>
</div>
`;
};
