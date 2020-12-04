/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-04 15:16:28
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.omitHandler = function ({ ele, options, on }) {
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
                    automit(_this, _this.attr("hope-omit-xl"));
                } else if (winWidth < 1200 && winWidth >= 750) {
                    automit(_this, _this.attr("hope-omit-md"));
                } else if (winWidth < 750) {
                    automit(_this, _this.attr("hope-omit-xs"));
                }
            } else {
                for (let key in bkp) {
                    if (winWidth >= bkp[key]) {
                        automit(_this, _this.attr(`hope-omit-{key}`));
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

    function automit(obj, row) {
        var _this = obj;
        var tag = false;
        var maxHeight = parseFloat(_this.css("lineHeight")) * row;
        while (maxHeight < _this.height()) {
            tag = true;
            var txt = _this.text().trim();
            var tmp = txt.substring(0, txt.length - 1);
            _this.text(tmp);
        }
        if (tag) {
            _this.text(
                _this
                    .text()
                    .trim()
                    .substring(0, _this.text().trim().length - 1) + "..."
            );
        }
    }

    core();
    $(window).resize(core);

    return obj;
};
