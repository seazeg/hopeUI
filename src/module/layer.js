/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:29:55
 * @LastEditTime : 2020-08-07 11:33:36
 * @Description  :
 */
import { hopeu as $ } from "../utils/hopeu.js";

class LayerControls {
    constructor() {
        this.layer = this.layer;
    }

    layer({
        options: options = {
            title: null,
            content: null,
            isMask: true,
            isDefaultBtn: true,
            defaultBtn: {},
            isDrag: false,
            animation: "hopeui-anim-scaleSpring",
        },
        on: on = {
            init: null,
            confirm: null,
            open: null,
            close: null,
        },
    }) {
        options = {
            title: options.title || "",
            content: options.content || "",
            isMask: options.content || true,
            isDefaultBtn: options.isDefaultBtn || true,
            defaultBtn: options.defaultBtn || {
                ok: "确定",
                cancel: "取消",
            },
            isDrag: options.isDrag || false,
            animation: options.content || "hopeui-anim-scaleSpring",
        };

        let self = null,
            mask = null;
        let location = (layer) => {
            layer.css({
                left:
                    (document.documentElement.clientWidth - layer.width()) / 2,
                top:
                    (document.documentElement.clientHeight - layer.height()) /
                    2,
            });

            $(window).resize(function() {
                layer.css({
                    left:
                        (document.documentElement.clientWidth - layer.width()) /
                        2,
                    top:
                        (document.documentElement.clientHeight -
                            layer.height()) /
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
            let template = `<div class="hopeui-layer">
                                <div class="hopeui-layer-title ${
                                    !options.title ? "hopeui-hide" : ""
                                }">
                                    ${options.title}
                                    <i class="hopeui-layer-close hopeui-icon hopeui-icon-close"></i>
                                </div>
                                <div class="hopeui-layer-content">
                                    ${options.content}
                                </div>
                                <div class="hopeui-layer-btn ${
                                    !options.isDefaultBtn ? "hopeui-hide" : ""
                                }">
                                    <button type="button" name="close" class="hopeui-btn hopeui-btn-primary">
                                        ${options.defaultBtn.cancel}
                                    </button>
                                    <button type="button" name="ok" class="hopeui-btn">
                                        ${options.defaultBtn.ok}
                                    </button>
                                </div>
                            </div>`;

            self = $(template).insertAfter("body");
            location(self);
            self.addClass(`hopeui-anim ${options.animation}`);

            if (options.isDrag) {
                darg(self.children(".hopeui-layer-title")[0]);
            }
            if (options.isMask) {
                mask = $(".hopeui-layer-mask");
                if (mask.length <= 0) {
                    let maskTemplate = `<div class="hopeui-layer-mask"></div>`;
                    mask = $(maskTemplate).insertAfter("body");
                }
            }

            if (on.open) {
                on.open(self[0]);
            }

            //事件绑定
            self.find('button[name="close"]').on("click", function(e) {
                close();
            });
            self.find('button[name="ok"]').on("click", function(e) {
                if (on.confirm) {
                    on.confirm(self[0]);
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

            if (on.close) {
                on.close(self[0]);
            }
        };

        if (on.init) {
            on.init({
                ele: $dom[0],
                eventName: "init",
            });
        }

        open();

        return {
            close: close,
        };
    }
}

export const layerControls = LayerControls;
