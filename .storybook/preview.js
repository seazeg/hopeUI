/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:40:22
 * @LastEditTime : 2020-08-06 18:01:00
 * @Description  :
 */

import { addParameters } from "@storybook/client-api";
import { viewport } from "./viewport.js";
addParameters({
    options: {
        showRoots: true,
    },
    viewport: {
        viewports: viewport,
    },
});
