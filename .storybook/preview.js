/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:40:22
 * @LastEditTime : 2022-08-29 10:28:59
 * @Description  :
 */

import { addParameters } from "@storybook/client-api";
import { viewport } from "./viewport.js";
addParameters({
    options: {
        showRoots: true,
        storySort: {
            order: ["概览", "基础控件", "复用组件", "常用函数"],
        },
    },
    viewport: {
        viewports: viewport,
    },
});
