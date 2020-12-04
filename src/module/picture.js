/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-04 10:04:52
 * @Description  :
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
                    _this.attr("src", _this.attr("hope-xl-src"));
                } else if (winWidth < 1200 && winWidth >= 750) {
                    _this.attr("src", _this.attr("hope-md-src"));
                } else if (winWidth < 750) {
                    _this.attr("src", _this.attr("hope-xs-src"));
                }
            } else {
                for (let key in bkp) {
                    if (winWidth >= bkp[key]) {
                        _this.attr("src", _this.attr(`hope-${key}-src`));
                        break;
                    }
                }
            }
            initArr.push(_this.get(0));
        });

        if (on.resize) {
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
