/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:40:22
 * @LastEditTime : 2020-08-05 13:55:53
 * @Description  : 
 */ 

import { addParameters } from '@storybook/client-api';
import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';

addParameters({
  options: {
    showRoots: true,
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
  },
});
