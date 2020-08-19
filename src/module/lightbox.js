/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-19 10:27:12
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.lightboxHandler = function({ ele, options, on }) {
    const obj = new Object();
    options = {
        width: options.width || "80%",
        type: options.type || "iframe",
        isMask: !options.isMask,
        maskColor: options.maskColor,
        animation: options.animation || "hopeui-anim-scale",
    };

    let self = null,
        mask = null,
        content = null,
        dataList = $(ele).children(),
        curIndex = null;

    let eventName = "click";
    if (is.phone()) {
        eventName = "touchend";
    }

    switch (options.type) {
        case "iframe":
            content = `<iframe id="hopeui-lightbox-iframe" style="width:100%;border:none" src="" allowtransparency="true" scrolling="no" frameborder="no" border="0"></iframe>`;
            break;
        case "pic":
            content = `<img id="hopeui-lightbox-picvdo" style="width:100%" src="" />`;
            break;
        case "video":
            break;
        default:
            break;
    }

    let location = (layer, imgObj) => {
        //ifm模式
        if (options.type == "iframe") {
            layer
                .children(".hopeui-layer-content")
                .width($("body").width() * (parseInt(options.width) / 100));

            let ifm = layer.find("iframe");
            ifm.on("load", function() {
                try {
                    $(this).height(
                        $(this)[0].contentWindow.document.documentElement
                            .scrollHeight + 40
                    );
                } catch (error) {}
            });

            if (typeof window.addEventListener != "undefined") {
                window.addEventListener(
                    "message",
                    function(e) {
                        ifm.height(e.data.value[1] + 40);
                    },
                    false
                );
            } else if (typeof window.attachEvent != "undefined") {
                //for ie8-
                window.attachEvent("onmessage", function(e) {
                    ifm.height(e.data.value[1] + 40);
                });
            }

            layer.css({
                left:
                    (document.documentElement.clientWidth - layer.width()) / 2,
                top: 40,
            });

            $(window).resize(function() {
                layer
                    .children(".hopeui-layer-content")
                    .width($("body").width() * (parseInt(options.width) / 100));
                layer.css({
                    left:
                        (document.documentElement.clientWidth - layer.width()) /
                        2,
                    top: 40,
                });
            });
        } else {
            //图片，视频模式
            // debugger

            let rate = 1;
            if (is.landscape()) {
                rate = parseInt(options.width) / 100;
            } else {
                rate = parseInt(options.width) / 100;
            }
            if (imgObj.width() > imgObj.height()) {
                layer.children(".hopeui-layer-content").css({
                    height: "100%",
                    width: document.documentElement.clientWidth * rate,
                });
                $("#hopeui-lightbox-picvdo").css({
                    height: "auto",
                    width: "100%",
                });
            } else {
                layer.children(".hopeui-layer-content").css({
                    height: document.documentElement.clientHeight * rate,
                    width: "100%",
                });
                $("#hopeui-lightbox-picvdo").css({
                    height: "100%",
                    width: "auto",
                });
            }

            layer
                .children(".hopeui-layer-content")
                .removeClass("hopeui-lightbox-transition");

            $("#hopeui-lightbox-picvdo").load(function() {
                layer.css({
                    left:
                        (document.documentElement.clientWidth - layer.width()) /
                        2,
                    top:
                        (document.documentElement.clientHeight -
                            layer.height()) /
                        2,
                });
                layer
                    .children(".hopeui-layer-content")
                    .addClass("hopeui-lightbox-transition");
            });
        }
    };

    let open = ($dom) => {
        let index = $dom.index();
        curIndex = curIndex || index;
        let template =
            '<div class="hopeui-lightbox-warp"><div class="hopeui-lightbox-close"><i class="hopeui-icon hopeui-icon-close"></i></div><div class="hopui-lightbox-switch"><i class="hopeui-icon hopeui-icon-left hopui-lightbox-prev"></i><i class="hopeui-icon hopeui-icon-right hopui-lightbox-next"></i></div><div class="hopeui-layer hopeui-lightbox-transparent">';

        template += `<div class="hopeui-layer-content ${options.type !=
            "iframe" && "hopeui-lightbox"}">${content}</div></div></div>`;

        self = $(template).insertAfter("body");

        if (curIndex == 0) {
            self.find(".hopui-lightbox-prev").hide();
        } else {
            self.find(".hopui-lightbox-prev").show();
        }
        if (curIndex == dataList.length - 1) {
            self.find(".hopui-lightbox-next").hide();
        } else {
            self.find(".hopui-lightbox-next").show();
        }
        //ifm模式
        if (options.type == "iframe") {
            let ifm = $("#hopeui-lightbox-iframe");
            ifm.attr("src", $dom.attr("hopeui-url"));

            self.find(".hopui-lightbox-prev").on(eventName, function() {
                if (curIndex > 0) {
                    ifm.attr(
                        "src",
                        dataList.eq(curIndex - 1).attr("hopeui-url")
                    );
                    self.scrollTop(0);
                    curIndex = curIndex - 1;

                    if (curIndex > 0 && curIndex < dataList.length) {
                        $(".hopui-lightbox-next").show();
                        $(".hopui-lightbox-prev").show();
                    }
                    if (curIndex == 0) {
                        $(".hopui-lightbox-prev").hide();
                        $(".hopui-lightbox-next").show();
                    } else if (curIndex == dataList.length - 1) {
                        $(".hopui-lightbox-next").hide();
                        $(".hopui-lightbox-prev").show();
                    }
                    repalceUrl(curIndex, "title");
                }
            });

            self.find(".hopui-lightbox-next").on(eventName, function() {
                if (curIndex < dataList.length - 1) {
                    ifm.attr(
                        "src",
                        dataList.eq(curIndex + 1).attr("hopeui-url")
                    );
                    self.scrollTop(0);
                    curIndex = curIndex + 1;
                    if (curIndex > 0 && curIndex < dataList.length) {
                        $(".hopui-lightbox-next").show();
                        $(".hopui-lightbox-prev").show();
                    }
                    if (curIndex == 0) {
                        $(".hopui-lightbox-prev").hide();
                        $(".hopui-lightbox-next").show();
                    } else if (curIndex == dataList.length - 1) {
                        $(".hopui-lightbox-next").hide();
                        $(".hopui-lightbox-prev").show();
                    }
                    repalceUrl(curIndex, "title");
                }
            });
        } else {
            //图片，视频模式
            let picvdo = $("#hopeui-lightbox-picvdo");
            picvdo.attr("src", $dom.attr("hopeui-src"));

            self.find(".hopui-lightbox-prev").on(eventName, function() {
                if (curIndex >= 0) {
                    picvdo.attr(
                        "src",
                        dataList.eq(curIndex - 1).attr("hopeui-src")
                    );

                    //判断横竖
                    location(
                        self.children(".hopeui-layer"),
                        dataList.eq(curIndex - 1).children()
                    );

                    curIndex = curIndex - 1;
                    if (curIndex > 0 && curIndex < dataList.length) {
                        $(".hopui-lightbox-next").show();
                        $(".hopui-lightbox-prev").show();
                    }
                    if (curIndex == 0) {
                        $(".hopui-lightbox-prev").hide();
                        $(".hopui-lightbox-next").show();
                    } else if (curIndex == dataList.length - 1) {
                        $(".hopui-lightbox-next").hide();
                        $(".hopui-lightbox-prev").show();
                    }
                    repalceUrl(curIndex, "title");
                }
            });

            self.find(".hopui-lightbox-next").on(eventName, function() {
                if (curIndex < dataList.length - 1) {
                    picvdo.attr(
                        "src",
                        dataList.eq(curIndex + 1).attr("hopeui-src")
                    );

                    //判断横竖
                    location(
                        self.children(".hopeui-layer"),
                        dataList.eq(curIndex + 1).children()
                    );
                    curIndex = curIndex + 1;

                    if (curIndex > 0 && curIndex < dataList.length) {
                        $(".hopui-lightbox-next").show();
                        $(".hopui-lightbox-prev").show();
                    }
                    if (curIndex == 0) {
                        $(".hopui-lightbox-prev").hide();
                        $(".hopui-lightbox-next").show();
                    } else if (curIndex == dataList.length - 1) {
                        $(".hopui-lightbox-next").hide();
                        $(".hopui-lightbox-prev").show();
                    }

                    repalceUrl(curIndex, "title");
                }
            });
        }

        self.css("overflow-y", "auto");
        self.children(".hopeui-layer")
            .addClass(`hopeui-anim ${options.animation}`)
            .css("position", "absolute");

        $("body,html").addClass("hopeui-layer-nosrl");

        location(self.children(".hopeui-layer"), $dom.children());

        if (options.isMask) {
            mask = $(".hopeui-layer-mask");
            if (mask.length <= 0) {
                let maskTemplate = `<div class="hopeui-layer-mask"></div>`;
                mask = $(maskTemplate).insertAfter("body");
            }
            if (options.maskColor) {
                if (is.ie() == "8" || is.ie() == "9") {
                    mask.css(
                        "filter",
                        `progid:DXImageTransform.Microsoft.gradient(startColorstr=#BF${RGBToHEX(
                            options.maskColor
                        ).replace("#", "")},endColorstr=#BF${RGBToHEX(
                            options.maskColor
                        ).replace("#", "")})`
                    );
                } else {
                    mask.css("background", options.maskColor);
                }
            }
        }

        repalceUrl(curIndex, "title");

        if (on.open) {
            on.open(self[0], obj);
        }

        self.find(".hopeui-lightbox-close").on(eventName, function(e) {
            close();
        });
    };

    let close = () => {
        self.addClass("hopeui-hide").remove();

        if (mask) {
            mask.remove();
        }
        curIndex = null;
        $("body,html").removeClass("hopeui-layer-nosrl");
        if (on.close) {
            on.close(self[0], obj);
        }
    };

    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    dataList.on(eventName, function() {
        open($(this));
    });

    obj.close = function() {
        close();
    };

    return obj;
};

function repalceUrl(name, title) {
    // let newUrl = "/" + name;
    // history.pushState({}, title, newUrl);
}

function RGBToHEX(str) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let result = "";
    str = `${str.split(",")[0]},${str.split(",")[1]},${
        str.split(",")[2]
    })`.replace("rgba", "rgb");
    if (/^(rgb|RGB)/.test(str)) {
        let aColor = str.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
        let strHex = "#";
        for (let i = 0; i < aColor.length; i++) {
            let hex = Number(aColor[i]).toString(16);
            if (hex === "0") {
                hex += hex;
            }
            strHex += hex;
        }
        if (strHex.length !== 7) {
            strHex = str;
        }
        result = strHex;
    } else if (reg.test(str)) {
        let aNum = str.replace(/#/, "").split("");
        if (aNum.length === 6) {
            return str;
        } else if (aNum.length === 3) {
            let numHex = "#";
            for (let i = 0; i < aNum.length; i += 1) {
                numHex += aNum[i] + aNum[i];
            }
            result = numHex;
        }
    } else {
        result = str;
    }
    return result;
}
