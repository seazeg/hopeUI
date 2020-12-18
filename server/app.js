/*
 * @Author       : Evan.G
 * @Date         : 2020-09-02 13:45:37
 * @LastEditTime : 2020-12-18 14:20:41
 * @Description  : 图片上传接口
 */
const express = require("express");
const app = new express();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + "/upload");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    },
});
const upload = multer({ storage: storage });

app.use(express.static(__dirname + "/upload"));
app.all("*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.header("Access-Control-Allow-Methods", "*");
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});
app.post("/fileUpload", upload.single("file"), function (req, res, next) {
    res.json({
        imgurl: req.file.filename
    });
});

app.get("/", function (req, res, next) {
    res.send("服务启动成功");
});

app.listen(9909, "0.0.0.0", () => {
    console.log("open server to http://0.0.0.0:9909");
});
