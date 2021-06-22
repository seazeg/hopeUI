const $ = require("../utils/hopeu.js");
const { is } = require("./is.js");

var createId = (function () {
    var id = 0;
    return function () {
        return ++id;
    };
})();

var Hope_upload = function (ele, options, on) {
    options = $.extend(
        {},
        {
            button: null, // 上传按钮对象或者id
            url: "upload.do", // 处理上传文件接口
            allowedExtensions: ["jpg", "png", "gif", "jpeg"], // 只允许上传图片
            cancelable: false, // 是否可取消上传
            multiple: false, // 是否批量上传
            params: {},
            onUpload: function (fileName) {}, // 开始上传事件，fileName为本地选择的文件名
            messages: {
                upload: "上传",
                cancel: "取消",
                emptyFile: "{file} 为空，请选择一个文件.",
                invalidExtension:
                    "{file} 后缀名不合法. 只有 {extensions} 是允许的",
                onLeave: "文件正在上传，如果你现在离开，上传将会被取消。",
            },
            debug: false, // 是否打印上传信息，设置false
        },
        options
    );
    options.id = options.name + "_" + createId();
    options.uploading = false;
    var ieVersion = is.ie();
    var initButton = function () {
        options.button = $(ele);
        options.button.css({
            cursor: "pointer",
            position: "relative",
            overflow: "hidden",
        });
        if (options.cancelable) {
            options.button.bind("click", cancel);
        }
        if (options.button.find("input[type=file]").length) {
            options.button.find("input[type=file]").remove();
        }
        options.button.append(createInput());
        options.button.unbind().bind("click", function () {
            createInput().click();
        });
        return options.button;
    };
    var createIframe = function () {
        var id = "hopeUploadIframe_" + options.id;
        var iframe = $(
            '<iframe id="' +
                id +
                '" name="' +
                id +
                '" src="javascript:false;" style="display:none"></iframe>'
        ).bind("load", complete);
        return iframe;
    };
    var createForm = function () {
        var id = "hopeUploadForm_" + options.id;
        var form = $(
            '<form id="' +
                id +
                '" name="' +
                id +
                '" action="' +
                options.url +
                '" target="hopeUploadIframe_' +
                options.id +
                '" method="post" enctype="multipart/form-data" style="display:none"></form>'
        );
        return form;
    };
    var createInput = function () {
        if (!options.multiple) {
            var input = $('<input type="file" onchange="this.blur();" />');
        } else {
            var input = $(
                '<input type="file" onchange="this.blur();" multiple="multiple" />'
            );
        }

        input
            .attr("id", "hopeUpload-file" + options.id)
            .attr("name", options.name)
            .css({
                position: "absolute",
                right: 0,
                top: 0,
                margin: 0,
                opacity: 0,
                padding: 0,
                fontFamily: "Arial",
                fontSize: "118px",
                verticalAlign: "baseline",
                cursor: "pointer",
                display:"none"
            })
            .bind("change", function () {
                // 如果是单张上传（ie8、ie9不支持多选属性），执行if
                if (/*!options.multiple ||*/ ieVersion <= 9) {
                    options.fileName = getFileName(this);
                    if (validateFile(this)) {
                        upload();
                    }
                } else {
                    var files = this.files,
                        filesLength = files.length;
                    for (var i = 0; i < filesLength; i++) {
                        var file = files[i];
                        options.fileName = getFileName(file);
                        if (validateFile(file)) {
                            upload(file);
                        }
                    }
                    // 去掉input里的值，否则没法连续选同一张图片
                    $("#hopeUpload-file" + options.id).val("");
                    return false;
                }
            });
        if (window.attachEvent) {
            input.attr("taonex", "-1");
        }
        return input;
    };
    var validateFile = function (file) {
        var name = getFileName(file);
        if (!isAllowedExtension(name)) {
            if (on && on.validate) {
                on.validate(messages.invalidExtension);
                return false;
            }
        } else if (name == "") {
            if (on && on.validate) {
                on.validate(messages.emptyFile);
                return false;
            }
        }
        return true;
    };
    var getFileName = function (file) {
        if (/*!options.multiple ||*/ ieVersion <= 9) {
            return file.value.replace(/.*(\/|\\)/, "");
        } else {
            return file.name.replace(/.*(\/|\\)/, "");
        }
    };

    var isAllowedExtension = function (fileName) {
        var ext =
            -1 !== fileName.indexOf(".")
                ? fileName.replace(/.*[.]/, "").toLowerCase()
                : "";
        if (!options.allowedExtensions.length) {
            return true;
        }
        for (var i = 0; i < options.allowedExtensions.length; i++) {
            if (options.allowedExtensions[i].toLowerCase() == ext) {
                return true;
            }
        }
        return false;
    };

    var log = function (message) {
        if (options.debug && window.console)
            console.log("[hopeUpload] " + message);
    };
    var upload = function (file) {
        if (/*!options.multiple ||*/ ieVersion <= 9) {
            if (options.onUpload(options.fileName) === false) {
                // 去掉input里的值，否则没法连续选同一张图片
                $("#hopeUpload-file" + options.id).val("");
                return false;
            }
        } else {
            if (options.onUpload(options.fileName, file) === false) {
                return false;
            }
        }
        options.uploading = true;
        $(document.body).append(createIframe()).append(createForm());
        $("#hopeUpload-file" + options.id)
            .attr("id", "hopeUpload-file-uploading" + options.id)
            .appendTo("#hopeUploadForm_" + options.id);
        if (options.cancelable) {
            options.button.children("span").text(options.messages.cancel);
        }

        // 如果是单张上传，执行插件原有的上传方式submit()
        if (/*!options.multiple ||*/ ieVersion <= 9) {
            $("#hopeUploadForm_" + options.id)
                .get(0)
                .submit();
        } else {
            // 为了解决批量上传的问题，用ajax来提交
            var formData = new FormData();
            if (Object.keys(options.params).length > 0) {
                Object.keys(options.params).forEach(function (key) {
                    formData.append(key, options.params[key]);
                });
            }
            formData.append("file", file);

            var xhr = new XMLHttpRequest();
            xhr.open("post", options.url, true);
            xhr.send(formData);
            xhr.onreadystatechange = function () {
                if (xhr.status == 200 && xhr.readyState == 4) {
                    resetUpload();
                    if (on && on.complete) {
                        on.complete(options.fileName, JSON.parse(xhr.response));
                    }
                } else if (xhr.readyState == 2) {
                    if (on && on.uploading) {
                        on.uploading(options.fileName);
                    }
                } else if (xhr.status !== 200 && xhr.readyState !== 4) {
                    resetUpload();
                    if (on && on.error) {
                        on.error(options.fileName, JSON.parse(xhr.response));
                    }
                } else {
                    console.log(xhr.status);
                    console.log(xhr.readyState);
                }
            };
        }

        if (options.button.find("input[type=file]").length) {
            options.button.find("input[type=file]").remove();
        }
        options.button.append(createInput());
    };

    // 重置上传
    function resetUpload() {
        options.uploading = false;
        setTimeout(function () {
            $("#hopeUploadForm_" + options.id).remove();
            $("#hopeUploadIframe_" + options.id).remove();
        }, 10);
    }

    var cancel = function () {
        if (options.uploading) {
            options.uploading = false;
            if (on && on.cancel) {
                on.cancel(options.fileName);
            }
            options.button.children("span").text(options.messages.upload);
            $("#hopeUploadForm_" + options.id).remove();
            $("#hopeUploadIframe_" + options.id)
                .attr("src", "javascript:false;")
                .remove();
            // $("#hopeUpload-file" + options.id).show();
        }
    };
    var complete = function () {
        var iframe = $("#hopeUploadIframe_" + options.id).get(0);
        if (!iframe.parentNode) {
            return;
        }
        if (
            (iframe.contentDocument &&
                iframe.contentDocument.body &&
                iframe.contentDocument.body.innerHTML == "false") ||
            (iframe.contentWindow.document &&
                iframe.contentWindow.document.body &&
                iframe.contentWindow.document.body.innerHTML == "false")
        ) {
            return;
        }
        var doc = iframe.contentDocument
            ? iframe.contentDocument
            : iframe.contentWindow.document;
        var response;
        var innerHtml = doc.body.innerHTML;
        log("innerHTML = " + innerHtml);
        if (innerHtml == "") {
            return;
        }
        options.uploading = false;

        // options.button.children("span").text(options.messages.upload);
        try {
            var json = innerHtml.replace(/<pre.*>(.*)<\/pre>/gi, "$1");
            var jsonTem = json;
            json = json.substring(json.indexOf("{"), json.lastIndexOf("}") + 1);
            response = eval("(" + json + ")");
        } catch (e) {
            jsonTem = jsonTem.replace(/<PRE>/gi, "").replace(/<\/PRE>/gi, "");
            response = jsonTem;
        }
        setTimeout(function () {
            $("#hopeUploadForm_" + options.id).remove();
            $("#hopeUploadIframe_" + options.id).remove();
        }, 10);
        if (on && on.complete) {
            on.complete(options.fileName, response);
        }
    };

    $(window).bind("beforeunload", function (e) {
        if (!options.uploading) return;
        var e = e || window.event;
        e.returnValue = options.messages.onLeave;
        return options.messages.onLeave;
    });

    return initButton();
};

module.exports = Hope_upload;
