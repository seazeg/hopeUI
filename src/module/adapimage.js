/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-12-04 15:04:03
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.adapimageHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let $dom = $(ele);
    $dom.css({
        opacity: 0,
        transition: "all 0.2s",
    });
    $dom.each(function () {
        let _this = $(this);
        getImgNaturalDimensions(_this.get(0), function (e) {
            let parent = {
                w: _this.parent().width(),
                h: _this.parent().height(),
            };

            let scale = {
                w: Math.ceil((parent.h / e.h) * e.w),
                h: Math.ceil((parent.w / e.w) * e.h),
            };

            _this.parent().css({
                overflow: "hidden",
                position: "relative",
            });

            if (e.w > e.h) {
                //以宽为准，高100%
                if (scale.w > parent.w) {
                    _this.css({
                        width: "auto",
                        height: "100%",
                        position: "absolute",
                        left: function () {
                            return -((scale.w - parent.w) / 2);
                        },
                        top: 0,
                    });
                } else {
                    _this.css({
                        width: "100%",
                        height: "auto",
                        position: "absolute",
                        top: function () {
                            return -((scale.h - parent.h) / 2);
                        },
                        left: 0,
                    });
                }
            } else if (e.w < e.h) {
                //以高为准，宽100%
                if (scale.h > parent.h) {
                    _this.css({
                        width: "100%",
                        height: "auto",
                        position: "absolute",
                        top: function () {
                            return -((scale.h - parent.h) / 2);
                        },
                        left: 0,
                    });
                } else {
                    _this.css({
                        width: "auto",
                        height: "100%",
                        position: "absolute",
                        left: function () {
                            return -((scale.w - parent.w) / 2);
                        },
                        top: 0,
                    });
                }
            }
        });
    });

    setTimeout(() => {
        $dom.css("opacity", 1);
    }, 100);

    if (on.init) {
        on.init({
            eventName: "init",
        });
    }

    function getImgNaturalDimensions(oImg, callback) {
        var nImg = new Image();
        nImg.onload = function () {
            var nWidth = nImg.width,
                nHeight = nImg.height;
            callback({ w: nWidth, h: nHeight });
        };
        nImg.src = oImg.src;
    }

    return obj;
};
