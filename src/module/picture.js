/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2022-06-01 17:09:29
 * @Description  : 响应式图片
 */

const $ = require("../utils/hopeu.js");

module.exports.pictureHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    function core() {
        const initArr = [];
        const winWidth = $(window).width();

        $dom.each(function () {
            let _this = $(this);
            let bkp = options.breakpoint;

            if (!bkp) {
                if (winWidth >= 1200) {
                    if (_this.attr("src") != _this.attr("hope-xl-src")) {
                        _this.attr("src", _this.attr("hope-xl-src"));
                    }
                } else if (winWidth < 1200 && winWidth > 750) {
                    if (_this.attr("src") != _this.attr("hope-md-src")) {
                        _this.attr("src", _this.attr("hope-md-src"));
                    }
                } else if (winWidth <= 750) {
                    if (_this.attr("src") != _this.attr("hope-xs-src")) {
                        _this.attr("src", _this.attr("hope-xs-src"));
                    }
                }
            } else {
                for (let key in bkp) {
                    if (winWidth >= bkp[key]) {
                        if (
                            _this.attr("src") != _this.attr(`hope-${key}-src`)
                        ) {
                            _this.attr("src", _this.attr(`hope-${key}-src`));
                        }
                        break;
                    }
                }
            }
            initArr.push(_this.get(0));
        });

        if (on && on.resize) {
            on.resize({
                ele: initArr,
                eventName: "resize",
            });
        }
    }
    core();
    $(window).resize(core);

    return obj;
};
