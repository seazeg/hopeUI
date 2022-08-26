/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 16:20:03
 * @LastEditTime : 2022-08-26 14:49:42
 * @Description  :
 */

module.exports = {
    stories: ["../docs/**/*.stories.@(js|mdx)"],
    logLevel: "debug",
    addons: [
        "@storybook/addon-docs",
        // '@storybook/addon-storysource',
        // "@storybook/addon-controls",
        "@storybook/addon-viewport",
        // "@storybook/addon-notes/register-panel",
    ],
};
