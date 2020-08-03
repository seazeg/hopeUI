/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:29:55
 * @LastEditTime : 2020-08-03 16:32:29
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
            isDefaultBtn: false,
            defaultBtn: {},
        },
        on: on = {
            confirm: null,
            open: null,
            close: null,
        },
    }) {
        options.defaultBtn = options.defaultBtn || {
            ok: "确定",
            close: "取消",
        };
        let self = null,
            mask = null;
        let location = (layer, mask) => {
            layer.css({
                left: (mask.width() - layer.width()) / 2,
                top: (mask.height() - layer.height()) / 2,
            });

            $(window).resize(function () {
                layer.css({
                    left: (mask.width() - layer.width()) / 2,
                    top: (mask.height() - layer.height()) / 2,
                });
            });
        };

        let open = () => {
            mask = $(".hopeui-layer-mask");
            if (mask.length <= 0) {
                let maskTemplate = `<div class="hopeui-layer-mask"></div>`;
                mask = $(maskTemplate).insertAfter("body");
            }

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
                                        ${options.defaultBtn.close}
                                    </button>
                                    <button type="button" name="ok" class="hopeui-btn">
                                        ${options.defaultBtn.ok}
                                    </button>
                                </div>
                            </div>`;

            self = $(template).insertAfter("body");
            location(self, mask);
            self.addClass("hopeui-anim hopeui-anim-scaleSpring");

            //事件绑定
            self.find('button[name="close"]').on("click", function (e) {
                close();
            });
            self.find('button[name="ok"]').on("click", function (e) {
                if (on.confirm) {
                    on.confirm(e);
                }
            });

            self.find(".hopeui-layer-close").on("click", function (e) {
                close();
            });
        };

        let close = () => {
            self.addClass("hopeui-hide").remove();
            mask.remove();
        };

        open();
        return {
            close: close,
        };
    }
}

export const layerControls = LayerControls;
