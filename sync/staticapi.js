/*
 * @Author       : Evan.G
 * @Date         : 2020-12-28 15:11:24
 * @LastEditTime : 2020-12-30 10:03:23
 * @Description  : 
 */
const shell = require("shelljs");

shell.exec('cp -r ../docs/static/mock ../hopeui')
shell.exec('cp ../docs/static/logo.png ../hopeui')
