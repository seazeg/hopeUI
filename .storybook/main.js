/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 16:20:03
 * @LastEditTime : 2020-07-31 10:24:13
 * @Description  : 
 */ 
module.exports = {
  stories: ['../docs/**/*.stories.js'],
  logLevel: 'info',
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
  ],
};
