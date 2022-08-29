/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 16:20:03
 * @LastEditTime : 2022-08-29 10:21:30
 * @Description  :
 */

module.exports = {
    stories: ["../docs/**/*.stories.@(js|mdx)"],
    logLevel: "debug",
    addons: [
        "@storybook/addon-docs",
        // '@storybook/addon-storysource',
        "@storybook/addon-controls",
        "@storybook/addon-viewport",
        // "@storybook/addon-notes/register-panel",
    ],
};
