/*
 * @Author       : Evan.G
 * @Date         : 2021-01-15 15:33:12
 * @LastEditTime : 2021-06-11 13:55:14
 * @Description  : 图片懒加载 + 响应式图片 + 图片居中
 */

const $ = require("../utils/hopeu.js");

module.exports.lazyloadHandler = function ({ ele, options, on }) {
    const obj = new Object();
    let breakpoint = options.breakpoint;

    function getImgNaturalDimensions(oImg, callback) {
        var nImg = new Image();
        nImg.onload = function () {
            var nWidth = nImg.width,
                nHeight = nImg.height;
            callback({ w: nWidth, h: nHeight });
        };
        nImg.src = oImg.src;
    }

    //页面加载时调用一次，使图片显示
    function init() {
        let img = document.querySelectorAll(`img${ele}`);
        for (let i = 0; i < img.length; i++) {
            img[i].style.opacity = "0";
        }
        Limg();
    }

    function Limg() {
        let viewHeight = document.documentElement.clientHeight; // 可视区域的高度
        let winWidth = $(window).width();
        // let t = document.documentElement.scrollTop || document.body.scrollTop;
        let limg = document.querySelectorAll(`img${ele} `);
        // Array.prototype.forEach.call()是一种快速的方法访问forEach，并将空数组的this换成想要遍历的list
        Array.prototype.forEach.call(limg, function (item, index) {
            let rect = null;
            let SWITCH = true;

            if (!options.responsive) {
                if (!item.getAttribute("hope-picture-tag")) {
                    SWITCH = false;
                }
            } else {
                if (!breakpoint) {
                    if (winWidth >= 1200) {
                        if (item.getAttribute("hope-picture-tag") == "xl") {
                            SWITCH = false;
                        }
                    } else if (winWidth < 1200 && winWidth >= 750) {
                        if (item.getAttribute("hope-picture-tag") == "md") {
                            SWITCH = false;
                        }
                    } else if (winWidth < 750) {
                        if (item.getAttribute("hope-picture-tag") == "xs") {
                            SWITCH = false;
                        }
                    }
                } else {
                    for (let key in breakpoint) {
                        if (winWidth >= breakpoint[key]) {
                            if (item.getAttribute("hope-picture-tag") == key) {
                                SWITCH = false;
                            }
                            break;
                        }
                    }
                }
            }

            if (SWITCH) {
                //getBoundingClientRect用于获取某个元素相对于视窗的位置集合。集合中有top, right, bottom, left等属性。
                rect = item.getBoundingClientRect();
                // 图片一进入可视区，动态加载
                if (rect.bottom >= 0 && rect.top < viewHeight) {
                    (function () {
                        if (!options.responsive) {
                            item.src = item.getAttribute("hope-src");

                            item.setAttribute("hope-picture-tag", "bingo");
                        } else {
                            if (!breakpoint) {
                                if (winWidth >= 1200) {
                                    item.src = item.getAttribute("hope-xl-src");
                                    item.setAttribute("hope-picture-tag", "xl");
                                } else if (winWidth < 1200 && winWidth >= 750) {
                                    item.src = item.getAttribute("hope-md-src");
                                    item.setAttribute("hope-picture-tag", "md");
                                } else if (winWidth < 750) {
                                    item.src = item.getAttribute("hope-xs-src");
                                    item.setAttribute("hope-picture-tag", "xs");
                                }
                            } else {
                                for (let key in breakpoint) {
                                    if (winWidth >= breakpoint[key]) {
                                        item.src = item.getAttribute(
                                            `hope-${key}-src`
                                        );
                                        item.setAttribute(
                                            "hope-picture-tag",
                                            key
                                        );
                                        break;
                                    }
                                }
                            }
                        }

                        if (!options.adapimage) {
                            let _this = $(item);
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
                                                return -(
                                                    (scale.w - parent.w) /
                                                    2
                                                );
                                            },
                                            top: 0,
                                        });
                                    } else {
                                        _this.css({
                                            width: "100%",
                                            height: "auto",
                                            position: "absolute",
                                            top: function () {
                                                return -(
                                                    (scale.h - parent.h) /
                                                    2
                                                );
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
                                                return -(
                                                    (scale.h - parent.h) /
                                                    2
                                                );
                                            },
                                            left: 0,
                                        });
                                    } else {
                                        _this.css({
                                            width: "auto",
                                            height: "100%",
                                            position: "absolute",
                                            left: function () {
                                                return -(
                                                    (scale.w - parent.w) /
                                                    2
                                                );
                                            },
                                            top: 0,
                                        });
                                    }
                                }
                            });
                        }

                        //给图片添加过渡效果，让图片显示
                        let j = 0;
                        setInterval(function () {
                            j += 0.2;
                            if (j <= 1) {
                                item.style.opacity = j;
                                return;
                            }
                        }, 100);

                        if (on.loaded) {
                            on.loaded({
                                ele: item,
                                index: index,
                                event: "loaded",
                            });
                        }
                    })();
                }
            }
        });
    }

    init();

    //监听滚动条事件
    $(window).scroll(function () {
        Limg();
    });

    $(window).resize(function () {
        Limg();
    });

    return obj;
};
