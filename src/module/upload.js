/*
 * @Author       : Evan.G
 * @Date         : 2020-09-02 14:20:34
 * @LastEditTime : 2021-06-01 15:55:42
 * @Description  : 文件上传
 */
const Hope_upload = require("../utils/upload.core.js");

module.exports.uploadHandler = function ({ ele, options, on }) {
    const obj = new Hope_upload(ele, options,on);
    return obj;
};
