/*
 * @Author       : Evan.G
 * @Date         : 2020-12-28 15:11:24
 * @LastEditTime : 2021-09-24 15:46:29
 * @Description  : 
 */
const shell = require("shelljs");
shell.exec('git add .')
shell.exec("git commit -m [update]");
shell.exec('cp -r ../docs/static/mock ../hopeui')
shell.exec('cp -r ../docs/static/img ../hopeui')
shell.exec('cp ../docs/static/logo.svg ../hopeui')

shell.exec('cd ../../seazeg.github.io/')
shell.exec('rm -rf ../../seazeg.github.io/hopeui')
shell.exec('cd ../../hope_controls/')
shell.exec('cp -rf ../hopeui ../../seazeg.github.io/')
shell.exec('zip -q -r ../../seazeg.github.io/hopeui.zip ../dist/')
// shell.exec('cd ../../seazeg.github.io/;gitq p -m "[API update]"')
shell.exec('git add .');
shell.exec('git commit -m [update]');

// shell.exec('cd ../../vscode-hopeui-plugin/')
// shell.exec('rm -rf ../../vscode-hopeui-plugin/src/docs/hopeui')
// shell.exec('cd ../../hope_controls/')
// shell.exec('cp -rf ../hopeui ../../vscode-hopeui-plugin/src/docs/')
// shell.exec('cd ../../vscode-hopeui-plugin/;gitq p -m "[update]"')