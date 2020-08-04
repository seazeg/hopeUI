/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 17:43:21
 * @LastEditTime : 2020-08-04 10:42:24
 * @Description  :
 */

import { addons } from "@storybook/addons";
import theme from "./theme.js";

addons.setConfig({
    theme: theme,
    panelPosition: "right",
});
