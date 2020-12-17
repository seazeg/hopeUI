/*
 * @Author       : Evan.G
 * @Date         : 2020-08-10 14:14:49
 * @LastEditTime : 2020-12-17 11:29:02
 * @Description  : hopeUI
 */

require("./hopeui.less");
require("./utils/patch.js");

const { scrollbarHandler } = require("./module/scrollbar.js");
const { lightboxHandler } = require("./module/lightbox.js");
const { pagerHandler } = require("./module/pager.js");
const { tabHandler } = require("./module/tab.js");
const { layerHandler } = require("./module/layer.js");
const { selectorHandler } = require("./module/selector.js");
const { checkboxHandler } = require("./module/checkbox.js");
const { radioHandler } = require("./module/radio.js");
const { textareaHandler } = require("./module/textarea.js");
const { inputHandler } = require("./module/input.js");
const { formHandler } = require("./module/form.js");
const { loadmoreHandler } = require("./module/loadmore.js");
const { datepickerHandler } = require("./module/datepicker.js");
const { suggestHandler } = require("./module/suggest.js");
const { uploadHandler } = require("./module/upload.js");
const { carouselHandler } = require("./module/carousel.js");
const { pictureHandler } = require("./module/picture.js");
const { adapimageHandler } = require("./module/adapimage.js");
const { omitHandler } = require("./module/omit.js");
const { zoomHandler } = require("./module/zoom.js");

const hope = () => {
    return {
        zoom: function ({
            ele: ele = null,
            options: options = {},
            on: on = {},
        }) {
            return zoomHandler({ ele, options, on });
        },
        omit: function ({
            ele: ele = null,
            options: options = {},
            on: on = {},
        }) {
            return omitHandler({ ele, options, on });
        },
        adapimage: function ({
            ele: ele = null,
            options: options = {},
            on: on = {},
        }) {
            return adapimageHandler({ ele, options, on });
        },
        picture: function ({
            ele: ele = null,
            options: options = {},
            on: on = {},
        }) {
            return pictureHandler({ ele, options, on });
        },
        carousel: function ({
            ele: ele = null,
            options: options = {},
            on: on = {},
        }) {
            return carouselHandler({ ele, options, on });
        },
        upload: function ({
            ele: ele = null,
            options: options = {},
            params: params = {},
            reader: reader = null,
            on: on = {
                init: null,
                blur: null,
                focus: null,
                input: null,
            },
        }) {
            return uploadHandler({ ele, options, params, reader, on });
        },
        suggest: function ({
            ele: ele = null,
            options: options = {},
            params: params = {},
            reader: reader = null,
            on: on = {
                init: null,
                blur: null,
                focus: null,
                input: null,
            },
        }) {
            return suggestHandler({ ele, options, params, reader, on });
        },
        datepicker: function ({
            ele: ele = null,
            options: options = {},
            on: on = {
                loaded: null,
            },
        }) {
            return datepickerHandler({ ele, options, on });
        },
        loadmore: function ({
            ele: ele = null,
            options: options = {},
            params: params = {},
            reader: reader = null,
            on: on = {
                loaded: null,
            },
        }) {
            return loadmoreHandler({ ele, options, params, reader, on });
        },
        scrollbar: function ({
            ele: ele = null,
            options: options = {},
            on: on = {
                init: null,
                scroll: null,
            },
        }) {
            return scrollbarHandler({ ele, options, on });
        },
        lightbox: function ({
            ele: ele = null,
            options: options = {
                content: null,
                isMask: true,
                maskColor: null,
                animation: "hopeui-anim-scaleSpring",
            },
            on: on = {
                init: null,
                open: null,
                close: null,
                prev: null,
                next: null,
            },
        }) {
            return lightboxHandler({ ele, options, on });
        },
        pager: function ({
            ele: ele = null,
            options: options = {},
            params: params = {},
            reader: reader = null,
            on: on = {
                jump: null,
            },
        }) {
            return pagerHandler({ ele, options, params, reader, on });
        },
        tab: function ({
            ele: ele = null,
            options: options = {},
            on: on = {
                change: null,
                init: null,
            },
        }) {
            return tabHandler({ ele, options, on });
        },
        layer: function ({
            options: options = {
                title: null,
                content: null,
                isMask: true,
                maskColor: null,
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
        selector: function ({
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
        checkbox: function ({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                change: null,
            },
        }) {
            return checkboxHandler({ ele, options, on });
        },
        radio: function ({
            ele: ele = null,
            options: options = null,
            on: on = {
                init: null,
                change: null,
            },
        }) {
            return radioHandler({ ele, options, on });
        },
        input: function ({
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
        textarea: function ({
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
        form: function ({
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
