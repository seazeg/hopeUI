/*
 * @Author       : Evan.G
 * @Date         : 2020-12-28 10:46:27
 * @LastEditTime : 2020-12-28 14:38:29
 * @Description  :
 */
const fs = require("fs");
const walk = require("walk");
const shell = require("shelljs");
const css2json = require("css2json");
const inputdir = "../src/styles/";
const outputdir = "../../hope/src/web/components/stylesheet"

let walker = walk.walk(inputdir, {});
walker.on("file", function (root, fileStats, next) {
    if (/(\.(less))$/.test(fileStats.name)) {
        fs.readFile(`${root}/${fileStats.name}`, "utf-8", function (
            error,
            data
        ) {
            if (error) {
                console.log("读取文件失败,内容是" + error.message);
                return;
            }
            shell.exec(
                `../node_modules/less/bin/lessc ${root}/${
                    fileStats.name
                } > out/${fileStats.name.replace("less", "css")}`
            );

            fs.readFile(
                `out/${fileStats.name.replace("less", "css")}`,
                "utf-8",
                function (error, data) {
                    fs.writeFile(`${outputdir}/${fileStats.name.replace("less", "json")}`, JSON.stringify(css2json(data)), function (err) {
                        if (err) console.error(err);
                        console.log(`${outputdir}/${fileStats.name.replace("less", "json")}已经同步完成`);
                        next();
                    });
                }
            );
        });
    } else {
        next();
    }
});