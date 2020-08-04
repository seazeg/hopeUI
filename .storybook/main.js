/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 16:20:03
 * @LastEditTime : 2020-08-04 13:33:08
 * @Description  :
 */

module.exports = {
    stories: ["../docs/**/*.stories.js"],
    logLevel: "debug",
    addons: [
        // '@storybook/addon-docs',
        // '@storybook/addon-storysource',
        "@storybook/addon-knobs",
        "@storybook/addon-viewport",
        "@storybook/addon-notes/register-panel",
    ],
};
