/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 16:20:03
 * @LastEditTime : 2020-08-24 11:16:05
 * @Description  :
 */

module.exports = {
    stories: ["../docs/**/*.stories.@(js|mdx)"],
    logLevel: "debug",
    addons: [
        '@storybook/addon-docs',
        // '@storybook/addon-storysource',
        "@storybook/addon-knobs",
        "@storybook/addon-viewport",
        // "@storybook/addon-notes/register-panel",
    ],
};
