/*
 * @Author       : Evan.G
 * @Date         : 2020-08-10 14:14:49
 * @LastEditTime : 2020-08-11 12:00:15
 * @Description  :
 */

require("./styles/hopeui.less");
require("./utils/patch.js");
const { tabHandler } = require("./module/tab.js");
const { layerHandler } = require("./module/layer.js");
const { selectorHandler } = require("./module/selector.js");

const hope = () => {
    return {
        tab: function({
            ele: ele = null,
            options: options = {},
            on: on = {
                change: null,
                init: null,
            },
        }) {
            return tabHandler({ ele, options, on });
        },
        layer: function({
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
            return layerHandler({ options, on });
        },
        selector: function({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                toggle: null,
                change: null,
                close: null,
            },
        }) {
            return selectorHandler({ ele, options, on });
        },
    };
};

window.hope = hope();
