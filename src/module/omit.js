/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2022-04-18 09:44:54
 * @Description  : 响应式截断省略函数
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.omitHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);

    function core() {
        const initArr = [];
        const winWidth = $(window).width();

        $dom.each(function () {
            let _this = $(this);
            let bkp = options.breakpoint;
            if (options.isTwoway) {
                if (!_this.attr("hope-omit-title")) {
                    _this.attr("hope-omit-title", _this.text().trim());
                } else {
                    _this.text(_this.attr("hope-omit-title"));
                }
            }
    
            if (!bkp) {
                if (winWidth >= 1200) {
                 
                    automit(_this, _this.attr("hope-omit-xl"));
                } else if (winWidth < 1200 && winWidth > 750) {
                    automit(_this, _this.attr("hope-omit-md"));
                } else if (winWidth <= 750) {
                    automit(_this, _this.attr("hope-omit-xs"));
                }
            } else {
                for (let key in bkp) {
                    if (winWidth >= bkp[key].point) {
                        automit(_this, bkp[key].row);
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

    function automit(obj, row) {
        let _this = obj;
        let tag = false;
        let maxHeight = 0;
        // if (is.ie() < 9) {
        //     maxHeight = Math.floor(
        //         _this.css("lineHeight") *
        //             parseFloat(_this.css("fontSize")) *
        //             row
        //     );
        // } else {
  
        maxHeight = parseFloat(_this.css("lineHeight")) * row;
        // }

        while (maxHeight < _this.height()) {
            tag = true;
            let txt = $.trim(_this.text());
            let tmp = txt.substring(0, txt.length - 1);
            _this.text(tmp);
        }
        if (tag) {
            _this.text(
                $.trim(_this.text()).substring(
                    0,
                    $.trim(_this.text()).length - 1
                ) + "..."
            );
        }
    }

    core();
    $(window).resize(core);

    return obj;
};
