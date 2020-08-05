/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-08-05 14:13:57
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
    <div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">普通按钮</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <button type="button" class="hopeui-btn hopeui-btn-primary">
            普通按钮
        </button>
        <button type="button" class="hopeui-btn">
            普通按钮
        </button>
        <button type="button" class="hopeui-btn hopeui-btn-disabled">
            禁用按钮
        </button>
    </div>
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">圆角按钮</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <button
            type="button"
            class="hopeui-btn hopeui-btn-primary hopeui-btn-radius"
        >
            圆角按钮
        </button>
        <button type="button" class="hopeui-btn hopeui-btn-radius">
            圆角按钮
        </button>
        <button type="button" class="hopeui-btn hopeui-btn-radius hopeui-btn-disabled">
            禁用按钮
        </button>
    </div>
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">图标按钮</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <button
            type="button"
            class="hopeui-btn hopeui-btn-primary hopeui-btn-radius"
        >
            <i class="hopeui-icon hopeui-icon-theme"></i>
        </button>
        <button type="button" class="hopeui-btn hopeui-btn-radius">
            <i class="hopeui-icon hopeui-icon-rate-solid"></i>
        </button>
        <button
            type="button"
            class="hopeui-btn hopeui-btn-primary hopeui-btn-radius"
        >
            <i class="hopeui-icon hopeui-icon-theme"></i>主题皮肤
        </button>
        <button type="button" class="hopeui-btn hopeui-btn-radius">
            <i class="hopeui-icon hopeui-icon-rate-solid"></i>收藏一下
        </button>
    </div>
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">按钮组</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <div class="hopeui-btn-group">
            <button type="button" class="hopeui-btn">
                增加
            </button>
            <button type="button" class="hopeui-btn">
                删除
            </button>
            <button type="button" class="hopeui-btn">
                编辑
            </button>
        </div>

        <div class="hopeui-btn-group">
            <button type="button" class="hopeui-btn">
            <i class="hopeui-icon hopeui-icon-add-1"></i>
            </button>
            <button type="button" class="hopeui-btn">
            <i class="hopeui-icon hopeui-icon-delete"></i>
            </button>
            <button type="button" class="hopeui-btn">
            <i class="hopeui-icon hopeui-icon-edit"></i>
            </button>
        </div>

        <div class="hopeui-btn-group">
            <button type="button" class="hopeui-btn">
            <i class="hopeui-icon hopeui-icon-add-1"></i>增加
            </button>
            <button type="button" class="hopeui-btn">
            <i class="hopeui-icon hopeui-icon-delete"></i>删除
            </button>
            <button type="button" class="hopeui-btn">
            <i class="hopeui-icon hopeui-icon-edit"></i>编辑
            </button>
        </div>
    </div>
</div>

 `;
};
