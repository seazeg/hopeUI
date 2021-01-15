/*
 * @Author       : Evan.G
 * @Date         : 2020-12-28 15:11:24
 * @LastEditTime : 2021-01-15 14:47:02
 * @Description  : 
 */
const shell = require("shelljs");
shell.exec('cp -r ../docs/static/mock ../hopeui')
shell.exec('cp ../docs/static/logo.png ../hopeui')
shell.exec('cd ../../seazeg.github.io/')
shell.exec('rm -rf ../../seazeg.github.io/hopeui')
shell.exec('cd ../../hope_controls/')
shell.exec('cp -rf ../hopeui ../../seazeg.github.io/')
shell.exec('zip -q -r ../../seazeg.github.io/hopeui.zip ../dist/')

shell.exec('cd ../../seazeg.github.io/')
shell.exec('pwd')
shell.exec('gitq p')