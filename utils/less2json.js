/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 15:28:07
 * @LastEditTime : 2020-08-04 15:50:29
 * @Description  :
 */

const fs = require("fs");

fs.readFile("../src/styles/config.less", "utf-8", (err, data) => {
    if (err) {
        console.log(err);
    } else {
        let obj = {};
        let tmp = data.split("\n").filter((item) => item);
        for (let item of tmp) {
            obj[item.split(":")[0].replace("@", "")] = item
                .split(":")[1]
                .trim();
        }
        fs.writeFile(
            "../docs/styleConfig.json",
            JSON.stringify(obj),
            "utf-8",
            function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log("转换完毕");
                }
            }
        );
    }
});
