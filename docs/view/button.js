/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-08-04 16:43:34
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

export const button = () => {
    const btnText = text("内容", "自定义按钮"); //文字控件
    const backgroundColor = color("背景颜色", styleConf.primaryColor); //颜色选择器
    const fontColor = color("字体颜色", styleConf.lightFontColor);
    const bold = boolean("字体加粗", false); //启用控件
    const borderColor = color("边框颜色", styleConf.primaryColor);
    const borderStyle = select("边框样式", {
        solid: "solid",
        dotted: "dotted",
        dashed: "dashed",
    });
    const borderWidth = number("边框宽度", 1, {
        range: true,
        min: 0,
        max: 10,
        step: 1,
    });
    const fontSize = number("字体大小", 14); //数字
    // const customStyle = object("Style", {
    //     fontFamily: "Arial",
    //     padding: "20px",
    // });

    const style = {
        // ...customStyle,
        borderWidth: borderWidth + "px",
        borderStyle: borderStyle,
        borderColor: borderColor,
        fontWeight: bold ? 800 : 400,
        fontSize: fontSize + "px",
        color: fontColor,
        backgroundColor: backgroundColor,
    };

    return `
    <style>
    .hopeui-custom-style{
        ${utils.json2css(style)}
    }
    </style>
    <div style="padding: 3% 2%;">
                <button type="button" class="hopeui-btn hopeui-btn-primary">
                    按钮
                </button>
                <button type="submit" class="hopeui-btn">
                    普通按钮
                </button>
                <button type="button" class="hopeui-btn hopeui-custom-style">
                    ${btnText}
                 </button>
            </div>`;
};
