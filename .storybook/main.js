/*
 * @Author       : Evan.G
 * @Date         : 2020-07-29 16:20:03
 * @LastEditTime : 2020-07-29 17:31:53
 * @Description  : 
 */ 
module.exports = {
  stories: ['../docs/**/*.stories.js'],
  logLevel: 'debug',
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-storysource',
    '@storybook/addon-viewport',
  ],
};
