/*
 * @Author       : Evan.G
 * @Date         : 2020-09-02 14:20:34
 * @LastEditTime : 2020-09-02 18:07:29
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.uploadHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);

    let container = $('<div class="hopeui-upload-container"></div>');
    let inputfile = $('<input type="file" style="display:none"/>');
    inputfile.appendTo(container);

    //校验函数
    let validate = function (file) {
        let result = {
            size: false,
            type: false,
        };
        if (options.type) {
            options.type.forEach(function (t) {
                let tmp = t.toLowerCase();
                tmp == "jpg" ? (tmp = "jpeg") : null;
                if (file.type.includes(tmp)) {
                    result.type = true;
                    return false;
                }
            });
        }
        if (options.size) {
            if (file.size <= options.size) {
                result.size = true;
            }
        }
        if (on.validate) {
            on.validate({
                file: file,
                status: result,
                result: result.size && result.type,
                eventName: "validate",
            });
        }
        return result.size && result.type;
    };

    inputfile.on("change", function () {
        let input = $(this);
        let files = input.get(0).files[0];
        if (files != null && files != undefined) {
            if (!validate(files)) {
                return;
            }
            let formData = new FormData();
            let xhr = new XMLHttpRequest();
            formData.append(options.name || "file", files);
            xhr.open("post", options.url, true);
            xhr.send(formData);
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    input.get(0).value = "";
                    if (on.complete) {
                        on.complete(JSON.parse(xhr.response));
                    }
                } else if (xhr.readyState == 2) {
                    if (on.uploading) {
                        on.uploading();
                    }
                } else if (xhr.status !== 200 && xhr.readyState !== 4) {
                    if (on.error) {
                        on.error(JSON.parse(xhr.response));
                    }
                } else {
                    if (on.error) {
                        on.error(JSON.parse(xhr.response));
                    }
                }
            };
        }
    });

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    $dom.on("click", function () {
        inputfile.click();
    });

    return obj;
};
