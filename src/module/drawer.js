/*
 * @Author       : Evan.G
 * @Date         : 2021-06-30 15:28:57
 * @LastEditTime : 2021-07-22 15:38:30
 * @Description  : 抽屉
 */

const $ = require("../utils/hopeu.js");

module.exports.drawerHandler = function ({
    ele,
    options,
    on
}) {
    const obj = new Object();

    let defaultOptions = {
        placement: "left",
        width: "50%",
        height: "100%",
        closable: true,
        mask: true,
        maskClosable: true,
        title: "",
        overflow: true,
    };
    options = Object.assign(defaultOptions, options);

    function init(options) {
        let _this = $(ele);
        let contentBody = _this.addClass("hope-drawer").children().remove();

        // mask
        let drawerMask = $("<div class='hope-drawer-mask'>");
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
        let drawerContent = $(`<div class="hope-drawer-content ${options.placement}" style="width:${options.width};height:${options.height}">`);
        _this.append(drawerContent).addClass("hope-drawer-forceShow");

        if (options.closable || options.title) {
            let drawerContentHeader = $("<div class='hope-drawer-content-header'>");
            drawerContent.append(drawerContentHeader);

            if (options.title) {
                let drawerContentTitle = $("<div class='hope-drawer-content-title'>");
                drawerContentHeader.append(drawerContentTitle);
            }

            if (options.closable) {
                let drawerClose = $("<div class='hope-drawer-close hopeui-icon hopeui-icon-close'>");
                drawerContentHeader.append(drawerClose);

                drawerClose.click(function () {
                    obj.close();
                });
            }
        }

        let drawerContentBody = $(`<div class="hope-drawer-content-body ${
            !options.closable && !options.title
                ? "hope-drawer-noHeader"
                : ""}">`);

        contentBody.appendTo(drawerContentBody);
        drawerContent.append(drawerContentBody);
    }
    // 打开抽屉
    obj.open = function () {
        if (options.overflow) {
            $("body").addClass("hopeui-overflowhidden");
        }
        $(ele).addClass("active");
        if (on && on.open) {
            on.open({
                ele: $(ele).get(0)
            });
        }
    };
    // 关闭抽屉
    obj.close = function () {
        if (options.overflow) {
            $("body").removeClass("hopeui-overflowhidden");
        }
        $(ele).removeClass("active");
        if (on && on.close) {
            on.close({
                ele: $(ele).get(0)
            });
        }
    };

    init(options);

    return obj;
};



