/*
 * @Author       : Evan.G
 * @Date         : 2020-08-12 17:34:52
 * @LastEditTime : 2020-08-28 15:22:25
 * @Description  :
 */
const Mock = require("mockjs");
const fs = require("fs");

for (var i = 1; i <= 12; i++) {
    // 定义数据类型
    var data = Mock.mock({
        // 20条数据
        "data|20": [
            {
                goodsName: "@ctitle(10)",
                "goodsStar|1-5": "★"
            },
        ],
        pageNo: i,
        pageSize: 20,
        totalNumber:61 ,
    });

    fs.writeFile(
        `../dist/assets/page/list${i}.json`,
        JSON.stringify(data),
        "utf-8",
        function(err) {
            if (err) {
                console.log(err);
            } else {
                console.log("生成完毕");
            }
        }
    );
}
