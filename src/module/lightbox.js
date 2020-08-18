/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-18 16:10:21
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.lightboxHandler = function({ ele, options, on }) {
    const obj = new Object();
    options = {
        width: options.width || "80%",
        height: options.height || "80%",
        type: options.type || "iframe",
        isMask: options.isMask && true,
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
            content = `<iframe id="hopeui-lightbox-iframe" style="width:100%" src="" allowtransparency="true" frameborder=0  scrolling="no"></iframe>`;
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

            window.addEventListener(
                "message",
                function(e) {
                    ifm.height(e.data.value[1] + 40);
                },
                false
            );

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
            layer
                .children(".hopeui-layer-content")
                .removeClass("hopeui-lightbox-transition")
                .css({
                    height: document.documentElement.clientHeight * 0.8,
                    width: "auto",
                });
            $("#hopeui-lightbox-picvdo")
                .css({
                    height: "100%",
                    width: "auto",
                })
                .load(function() {
                    layer.css({
                        left:
                            (document.documentElement.clientWidth -
                                layer.width()) /
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

            $(window).resize(function() {
                layer
                    .children(".hopeui-layer-content")
                    .removeClass("hopeui-lightbox-transition")
                    .css({
                        height: document.documentElement.clientHeight * 0.8,
                        width: "auto",
                    });
                $("#hopeui-lightbox-picvdo").css({
                    height: "100%",
                    width: "auto",
                });
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
            '<div class="hopeui-layer-mask"><div class="hopeui-lightbox-close"><i class="hopeui-icon hopeui-icon-close"></i></div><div class="hopui-lightbox-switch"><i class="hopeui-icon hopeui-icon-left hopui-lightbox-prev"></i><i class="hopeui-icon hopeui-icon-right hopui-lightbox-next"></i></div><div class="hopeui-layer hopeui-lightbox-transparent">';

        template += `<div class="hopeui-layer-content ${options.type !=
            "iframe" &&
            "hopeui-lightbox hopeui-lightbox-shadow"}">${content}</div></div></div>`;

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
                    location(self.children(".hopeui-layer"));

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
                    location(self.children(".hopeui-layer"));
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

        location(self.children(".hopeui-layer"));

        if (options.maskColor) {
            self.css("background-color", options.maskColor);
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
