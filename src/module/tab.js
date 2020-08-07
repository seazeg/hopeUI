/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-07 11:22:39
 * @Description  :
 */
import { hopeu as $ } from "../utils/hopeu.js";

class TabControls {
    constructor() {
        this.tab = this.tab;
    }
    tab({
        ele: ele = null,
        options: options = {},
        on: on = {
            change: null,
            init: null,
        },
    }) {
        let $dom = $(ele);
        $dom.find("li").on("click", function(e) {
            $(this)
                .addClass("hopeui-tab-this")
                .siblings()
                .removeClass("hopeui-tab-this");
            $(this)
                .parent()
                .siblings(".hopeui-tab-content")
                .children()
                .eq($(this).index())
                .addClass("hopeui-show")
                .siblings()
                .removeClass("hopeui-show");
            if (on.change) {
                on.change({
                    index: $(this).index(),
                    targetEle: this,
                    targetEleContent: $(this)
                        .parent()
                        .siblings(".hopeui-tab-content")[0],
                    eventName: "change",
                });
            }
        });
        if (on.init) {
            on.init({
                ele: $dom[0],
                eventName: "init",
            });
        }
    }
}

export const tabControls = TabControls;
