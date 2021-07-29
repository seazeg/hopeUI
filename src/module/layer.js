/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-07-29 16:48:58
 * @Description  : 弹窗
 */

const $ = require("../utils/hopeu.js");
const {
    is
} = require("../utils/is.js");

module.exports.layerHandler = function ({
    options,
    on
}) {
    const obj = new Object();
    options = {
        width: options.width || "",
        title: options.title || "",
        content: options.content || "",
        isMask: options.isMask || true,
        maskColor: options.maskColor,
        isDefaultBtn: options.isDefaultBtn || true,
        defaultBtn: options.defaultBtn || {
            ok: "确定",
            cancel: "取消",
        },
        isDrag: options.isDrag || false,
        isLock: options.isLock || true,
        isFullScreen: options.isFullScreen || false,
        animation: options.animation || "hopeui-anim-scaleSpring",
        offsetTop: options.offsetTop || 30,
        offsetBottom: options.offsetBottom || 30
    };

    let self = null,
        mask = null;

    //重新定位函数
    let location = (layer) => {
        layer.css("width", options.width);

        if (layer.height() > document.documentElement.clientHeight) {
            layer.css({
                left: (document.documentElement.clientWidth - layer.width()) / 2,
                top: options.offsetTop,
                paddingBottom:options.offsetBottom
            });

            $(window).resize(function () {
                layer.css({
                    left: (document.documentElement.clientWidth - layer.width()) / 2,
                    top: options.offsetTop,
                    paddingBottom:options.offsetBottom
                });
            });
        } else {
            layer.css({
                left: (document.documentElement.clientWidth - layer.width()) / 2,
                top: (document.documentElement.clientHeight - layer.height()) / 2,
            });

            $(window).resize(function () {
                layer.css({
                    left: (document.documentElement.clientWidth - layer.width()) / 2,
                    top: (document.documentElement.clientHeight - layer.height()) /
                        2,
                });
            });
        }


    };

    let darg = (obj) => {
        obj.onmousedown = function (e) {
            //鼠标按下事件

            let oe = e || window.event;
            let _this = this.parentNode;
            let startX = oe.clientX - _this.offsetLeft;
            let startY = oe.clientY - _this.offsetTop;
            document.onmousemove = function (e) {
                //鼠标移动事件
                let oe = e || window.event;
                _this.style.left = oe.clientX - startX + "px";
                _this.style.top = oe.clientY - startY + "px";
            };

            document.onmouseup = function () {
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


    let close = () => {
        self.parent().addClass("hopeui-hide").remove();

        if (mask) {
            mask.remove();
        }
        if (options.isLock) {
            $("body,html").removeClass("hopeui-layer-nosrl");
        }
        if (on && on.close) {
            on.close({
                ele: self[0],
                layer: obj,
                event: "close",
            });
        }
    };

    let open = () => {
        let template = '<div class="hopeui-layer-warp"><div class="hopeui-layer"><div class="hopeui-layer-inner">';
        if (options.title) {
            template += `<div class="hopeui-layer-title">${options.title}<i class="hopeui-layer-close hopeui-icon hopeui-icon-close"></i></div>`;
        }

        template += `<div class="hopeui-layer-content">${options.content}</div>`;

        if (options.isDefaultBtn) {
            template += `<div class="hopeui-layer-btn"><button type="button" name="close" class="hopeui-btn hopeui-btn-primary">${options.defaultBtn.cancel}</button><button type="button" name="ok" class="hopeui-btn">${options.defaultBtn.ok}</button></div>`;
        }

        template += "</div></div></div>";
        self = $(template).insertAfter("body").children('.hopeui-layer')

        self.addClass(`hopeui-anim ${options.animation}`);


        if (options.isLock) {
            $("body,html").addClass("hopeui-layer-nosrl");
        }

        if (options.isFullScreen) {
            self.find(".hopeui-layer-content")
                .width(document.documentElement.clientWidth)
                .height(document.documentElement.clientHeight);
        }

        location(self);

        if (options.isDrag) {
            darg(self.find(".hopeui-layer-title")[0]);
        }
        if (options.isMask) {
            mask = $(".hopeui-layer-mask");
            if (mask.length <= 0) {
                let maskTemplate = `<div class="hopeui-layer-mask"></div>`;
                // mask = $(maskTemplate).insertAfter(".hopeui-layer-warp");
                mask = $('.hopeui-layer-warp').append(maskTemplate);
            }

            if (options.maskColor) {
                mask.css("background", options.maskColor);
                if (is.ie() == 8 || is.ie() == 9) {
                    mask.css(
                        "filter",
                        `progid:DXImageTransform.Microsoft.gradient(startColorstr=#BF${RGBToHEX(
                            options.maskColor
                        ).replace("#", "")},endColorstr=#BF${RGBToHEX(
                            options.maskColor
                        ).replace("#", "")})`
                    );
                } else {
                    mask.css("background", options.maskColor);
                }
            }
        }

        if (on && on.open) {
            on.open({
                ele: self[0],
                layer: obj,
                event: "open",
            });
        }

        //事件绑定
        self.find('button[name="close"]').on("click", function (e) {
            close();
        });
        self.find('button[name="ok"]').on("click", function (e) {
            if (on && on.confirm) {
                on.confirm({
                    ele: self[0],
                    layer: obj,
                    event: "confirm",
                });
            } else {
                close();
            }
        });

        self.find(".hopeui-layer-close").on("click", function (e) {
            close();
        });
        
        mask.on('click', function () {
            close();
        })

    };



    $("body", document).on("keyup", function (e) {
        if (e.which === 27) {
            close();
        }
    });

    obj.close = function (callback) {
        close();
        if (callback) {
            callback();
        }
    };

    if (on && on.init) {
        on.init({
            layer: obj,
            eventName: "init",
        });
    }

    open();

    return obj;
};