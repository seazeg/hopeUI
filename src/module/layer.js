/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-19 10:44:46
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.layerHandler = function({ options, on }) {
    const obj = new Object();
    $.ajaxSetup ({ cache: false });
    options = {
        width: options.width || "80%",
        title: options.title || "",
        content: options.content || "",
        isMask: !options.isMask,
        maskColor: options.maskColor,
        isDefaultBtn: !options.isDefaultBtn,
        defaultBtn: options.defaultBtn || {
            ok: "确定",
            cancel: "取消",
        },
        isDrag: options.isDrag || false,
        isFullScreen: options.isFullScreen || false,
        animation: options.animation || "hopeui-anim-scaleSpring",
    };

    let self = null,
        mask = null;

    //重新定位函数
    let location = (layer) => {
        if (options.width.includes("%")) {
            layer
                .children(".hopeui-layer-content")
                .width($("body").width() * (parseInt(options.width) / 100));
        }else{
            layer
            .children(".hopeui-layer-content")
            .width(parseInt(options.width));
        }

        layer.css({
            left: (document.documentElement.clientWidth - layer.width()) / 2,
            top: (document.documentElement.clientHeight - layer.height()) / 2,
        });

        $(window).resize(function() {
            layer
                .children(".hopeui-layer-content")
                .width($("body").width() * (parseInt(options.width) / 100));
            layer.css({
                left:
                    (document.documentElement.clientWidth - layer.width()) / 2,
                top:
                    (document.documentElement.clientHeight - layer.height()) /
                    2,
            });
        });
    };

    let darg = (obj) => {
        obj.onmousedown = function(e) {
            //鼠标按下事件

            let oe = e || window.event;
            let _this = this.parentNode;
            let startX = oe.clientX - _this.offsetLeft;
            let startY = oe.clientY - _this.offsetTop;
            document.onmousemove = function(e) {
                //鼠标移动事件
                let oe = e || window.event;
                _this.style.left = oe.clientX - startX + "px";
                _this.style.top = oe.clientY - startY + "px";
            };

            document.onmouseup = function() {
                //鼠标松开事件
                document.onmousemove = null;
                document.onmouseup = null;
                if (_this.releaseCapture) {
                    //debug释放鼠标捕获
                    _this.releaseCapture();
                }
            };
            if (_this.setCapture) {
                //debug设置鼠标捕获
                _this.setCapture();
            }
            return false;
        };
    };

    let open = () => {
        let template = '<div class="hopeui-layer">';
        if (options.title) {
            template += `<div class="hopeui-layer-title">${options.title}<i class="hopeui-layer-close hopeui-icon hopeui-icon-close"></i></div>`;
        }

        template += `<div class="hopeui-layer-content">${options.content}</div>`;

        if (options.isDefaultBtn) {
            template += `<div class="hopeui-layer-btn"><button type="button" name="close" class="hopeui-btn hopeui-btn-primary">${options.defaultBtn.cancel}</button><button type="button" name="ok" class="hopeui-btn">${options.defaultBtn.ok}</button></div>`;
        }

        template += "</div>";
        self = $(template).insertAfter("body");

        self.addClass(`hopeui-anim ${options.animation}`);
        $("body,html").addClass("hopeui-layer-nosrl");

        if (options.isFullScreen) {
            self.find(".hopeui-layer-content")
                .width(document.documentElement.clientWidth)
                .height(document.documentElement.clientHeight);
        }

        location(self);

        if (options.isDrag) {
            darg(self.children(".hopeui-layer-title")[0]);
        }
        if (options.isMask) {
            mask = $(".hopeui-layer-mask");
            if (mask.length <= 0) {
                let maskTemplate = `<div class="hopeui-layer-mask"></div>`;
                mask = $(maskTemplate).insertAfter("body");
            }
            if (options.maskColor) {
                mask.css("background", options.maskColor);
            }
        }

        if (on.open) {
            on.open(self[0], obj);
        }

        //事件绑定
        self.find('button[name="close"]').on("click", function(e) {
            close();
        });
        self.find('button[name="ok"]').on("click", function(e) {
            if (on.confirm) {
                on.confirm(self[0], obj);
            } else {
                close();
            }
        });

        self.find(".hopeui-layer-close").on("click", function(e) {
            close();
        });
    };

    let close = () => {
        self.addClass("hopeui-hide").remove();

        if (mask) {
            mask.remove();
        }
        $("body,html").removeClass("hopeui-layer-nosrl");
        if (on.close) {
            on.close(self[0], obj);
        }
    };

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    open();

    obj.close = function() {
        close();
    };

    return obj;
};
