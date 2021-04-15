/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2021-04-15 15:30:24
 * @Description  : 轮播图
 */

const $ = require("../utils/hopeu.js");
const Hope_carousel = require("../utils/carousel.core.js");

let effect = {
    textZoom: {
        onEffectChange: function (hope) {
            for (var i = 0; i < hope.slides.length; i++) {
                var slide = hope.slides[i];
                var effect = slide.effect;
                var translate = effect * hope.width;
                var characters = slide.querySelectorAll("span");
                for (var j = 0; j < characters.length; j++) {
                    var charScale =
                        (effect * 1500 * (characters.length - j)) /
                        characters.length;
                    var charOpacity = 1 - Math.min(Math.abs(effect), 1);
                    hope.setTransform(
                        characters[j],
                        "translate3d(0,0," + charScale + "px)"
                    );
                    characters[j].style.opacity = charOpacity;
                }
                hope.setTransform(
                    slide,
                    "translate3d(" + translate + "px,0,0)"
                );
            }
        },
        onTouchStart: function (hope) {
            for (var i = 0; i < hope.slides.length; i++) {
                hope.setTransition(hope.slides[i], 0);
                var characters = hope.slides[i].querySelectorAll("span");
                for (var j = 0; j < characters.length; j++) {
                    hope.setTransition(characters[j], 0);
                }
            }
        },
        onSetWrapperTransition: function (hope, speed) {
            for (var i = 0; i < hope.slides.length; i++) {
                hope.setTransition(hope.slides[i], speed);
                var characters = hope.slides[i].querySelectorAll("span");
                for (var j = 0; j < characters.length; j++) {
                    hope.setTransition(characters[j], speed);
                }
            }
        },
    },
    textFilp: {
        onEffectChange: function (hope) {
            for (var i = 0; i < hope.slides.length; i++) {
                var slide = hope.slides[i];
                var effect = slide.effect;
                var translate = effect * hope.width;
                var characters = slide.querySelectorAll("span");
                for (var j = 0; j < characters.length; j++) {
                    var charOpacity = 1 - Math.min(Math.abs(effect), 1);
                    hope.setTransform(
                        characters[j],
                        "rotateY(" + effect * 180 + "deg)"
                    );
                    characters[j].style.opacity = charOpacity;
                }
                hope.setTransform(
                    slide,
                    "translate3d(" + translate + "px,0,0)"
                );
            }
        },
        onTouchStart: function (hope) {
            for (var i = 0; i < hope.slides.length; i++) {
                hope.setTransition(hope.slides[i], 0);
                var characters = hope.slides[i].querySelectorAll("span");
                for (var j = 0; j < characters.length; j++) {
                    hope.setTransition(characters[j], 0);
                }
            }
        },
        onSetWrapperTransition: function (hope, speed) {
            for (var i = 0; i < hope.slides.length; i++) {
                hope.setTransition(hope.slides[i], speed);
                var characters = hope.slides[i].querySelectorAll("span");
                for (var j = 0; j < characters.length; j++) {
                    hope.setTransition(characters[j], speed);
                }
            }
        },
    },
};

module.exports.carouselHandler = function ({ ele, options, on }) {
    let opt = {},
        obj = [];
    if (options.effect) {
        switch (options.effect) {
            case "textZoom":
                opt = Object.assign(options || {}, on || {}, effect.textZoom);
                break;
            case "textFilp":
                opt = Object.assign(options || {}, on || {}, effect.textFilp);
                break;
            // case "zoom":
            //     opt = Object.assign(options || {}, on || {}, effectZoom);
            //     break;
            // case "zoom":
            //     opt = Object.assign(options || {}, on || {}, effectZoom);
            //     break;
            default:
                opt = Object.assign(options || {}, on || {});
                break;
        }
    } else {
        opt = Object.assign(options || {}, on || {});
    }
    if ($(ele).length > 1) {
        Array.from($(ele)).forEach(function (item, index) {
            obj.push(new Hope_carousel(ele, opt, index));
        });
    } else {
        obj = new Hope_carousel(ele, opt, 0);
    }
    return obj;
};
