/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 17:43:21
 * @LastEditTime : 2020-12-22 14:56:32
 * @Description  :
 */

import { addons } from "@storybook/addons";
import theme from "./theme.js";

addons.setConfig({
    theme: theme,
    panelPosition: "right",
});