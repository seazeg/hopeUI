/*
 * @Author       : Evan.G
 * @Date         : 2020-08-10 14:14:49
 * @LastEditTime : 2020-08-11 16:06:48
 * @Description  :
 */

require("./styles/hopeui.less");
require("./utils/patch.js");
const { tabHandler } = require("./module/tab.js");
const { layerHandler } = require("./module/layer.js");
const { selectorHandler } = require("./module/selector.js");
const { checkboxHandler } = require("./module/checkbox.js");
const { radioHandler } = require("./module/radio.js");
const { textareaHandler } = require("./module/textarea.js");
const { inputHandler } = require("./module/input.js");
const { formHandler } = require("./module/form.js");

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
        checkbox: function({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                change: null,
            },
        }) {
            return checkboxHandler({ ele, options, on });
        },
        radio: function({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                change: null,
            },
        }) {
            return radioHandler({ ele, options, on });
        },
        input: function({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                blur: null,
                focus: null,
                input: null,
            },
        }) {
            return inputHandler({ ele, options, on });
        },
        textarea: function({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                blur: null,
                focus: null,
                input: null,
            },
        }) {
            return textareaHandler({ ele, options, on });
        },
        form: function({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                submit: null,
            },
            controls: controls = {
                selector: (selector = {
                    on: (on = {
                        change: null,
                        toggle: null,
                    }),
                }),
                checkbox: (checkbox = {
                    on: (on = {
                        change: null,
                    }),
                }),
                radio: (radio = {
                    on: (on = {
                        change: null,
                    }),
                }),
            },
            verify: verify = {},
        }) {
            return formHandler({ ele, options, on, controls, verify });
        },
    };
};

window.hope = hope();
