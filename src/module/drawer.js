/*
 * @Author       : Evan.G
 * @Date         : 2021-06-30 15:28:57
 * @LastEditTime : 2021-06-30 18:13:08
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.drawerHandler = function ({ ele, options, on }) {
    const obj = new Object();

    function init(options) {
        let _this = $(ele);

        let defaultOptions = {
            placement: "left",
            width: "250px",
            closable: true,
            mask: true,
            maskClosable: true,
        };
        options = Object.assign(defaultOptions, options);
        let contentBody = _this
            .addClass("hope-drawer")
            .children()
            .remove();

        // mask
        let drawerMask = $("<div>", {
            class: "hope-drawer-mask",
        });
        _this.append(drawerMask);
        // 是否显示mask
        if (options.mask) {
            drawerMask.addClass("hope-drawer-mask-show");
        }
        // 点击mask是否允许关闭
        if (options.maskClosable) {
            drawerMask.click(function () {
                obj.close();
            });
        }

        // 构建drawer内容
        let drawerContent = $("<div>", {
            class: "hope-drawer-content " + options.placement,
            style: "width: " + options.width,
        });
        _this.append(drawerContent).addClass("hope-drawer-forceShow")

        if (options.closable || options.title) {
            let drawerContentHeader = $("<div>", {
                class: "hope-drawer-content-header",
            });
            drawerContent.append(drawerContentHeader);

            if (options.title) {
                let drawerContentTitle = $("<div>", {
                    class: "hope-drawer-content-title",
                    text: options.title,
                });
                drawerContentHeader.append(drawerContentTitle);
            }

            if (options.closable) {
                let drawerClose = $("<div>", {
                    class: "hope-drawer-close",
                    text: "×",
                });
                drawerContentHeader.append(drawerClose);

                drawerClose.click(function () {
                    obj.close();
                });
            }
        }

        let drawerContentBody = $("<div>", {
            class: "hope-drawer-content-body",
        });

        contentBody.appendTo(drawerContentBody);
        drawerContent.append(drawerContentBody);
    }
    // 打开抽屉
    obj.open = function () {
        $(ele).addClass("active");
        if (on && on.open) {
            on.open();
        }
    };
    // 关闭抽屉
    obj.close = function () {
        $(ele).removeClass("active");
        if (on && on.close) {
            on.close();
        }
    };

    init(options);

    return obj;
};
