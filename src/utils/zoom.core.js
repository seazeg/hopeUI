/*
 * @Author       : Evan.G
 * @Date         : 2020-12-17 09:57:09
 * @LastEditTime : 2021-06-10 14:15:46
 * @Description  :
 */
module.exports.Hope_zoom = function (evt, options) {
    var gOptions = options || {},
        curThumb = null,
        curData = {
            x: 0,
            y: 0,
            w: 0,
            h: 0,
            lensW: 0,
            lensH: 0,
            lensBgX: 0,
            lensBgY: 0,
            largeW: 0,
            largeH: 0,
            largeL: 0,
            largeT: 0,
            zoom: 2,
            mode: "outside",
            largeWrapperId:
                gOptions.largeWrapper !== undefined
                    ? gOptions.largeWrapper.id || null
                    : null,
            status: 0,
            zoomAttached: false,
            zoomable:
                gOptions.zoomable !== undefined ? gOptions.zoomable : false,
            enter: gOptions.enter !== undefined ? gOptions.enter : null,
            leave: gOptions.leave !== undefined ? gOptions.leave : null,
            move: gOptions.move !== undefined ? gOptions.move : null,
            scale: gOptions.scale !== undefined ? gOptions.scale : null,
        },
        pos = {
            t: 0,
            l: 0,
            x: 0,
            y: 0,
        },
        gId = 0,
        status = 0,
        curIdx = "",
        curLens = null,
        curLarge = null,
        gZoom = gOptions.zoom !== undefined ? gOptions.zoom : curData.zoom,
        gMode = gOptions.mode || curData.mode,
        data = {},
        inBounds = false,
        isOverThumb = 0,
        tempOptions = {},
        getElementsByClass = function (className) {
            var list = [],
                elements = null,
                len = 0,
                pattern = "",
                i = 0,
                j = 0;

            if (document.getElementsByClassName) {
                list = document.getElementsByClassName(className);
            } else {
                elements = document.getElementsByTagName("*");
                len = elements.length;
                pattern = new RegExp("(^|\\s)" + className + "(\\s|$)");

                for (i, j; i < len; i += 1) {
                    if (pattern.test(elements[i].className)) {
                        list[j] = elements[i];
                        j += 1;
                    }
                }
            }

            return list;
        },
        $ = function (selector) {
            var idx = "",
                type = selector.charAt(0),
                result = null;

            if (type === "#" || type === ".") {
                idx = selector.substr(1, selector.length);
            }

            if (idx !== "") {
                switch (type) {
                    case "#":
                        result = document.getElementById(idx);
                        break;
                    case ".":
                        result = getElementsByClass(idx);
                        break;
                }
            }

            return result;
        },
        createLens = function (thumb, idx) {
            var lens = document.createElement("div");

            lens.id = idx + "-lens";
            lens.className = "hopeui-zoom-loader";

            thumb.parentNode.appendChild(lens);
        },
        updateLensOnZoom = function () {
            curLens.style.left = pos.l + "px";
            curLens.style.top = pos.t + "px";
            curLens.style.width = curData.lensW + "px";
            curLens.style.height = curData.lensH + "px";
            curLens.style.backgroundPosition =
                "-" + curData.lensBgX + "px -" + curData.lensBgY + "px";

            curLarge.style.left = "-" + curData.largeL + "px";
            curLarge.style.top = "-" + curData.largeT + "px";
            curLarge.style.width = curData.largeW + "px";
            curLarge.style.height = curData.largeH + "px";
        },
        updateLensOnLoad = function (idx, thumb, large, largeWrapper) {
            var lens = $("#" + idx + "-lens"),
                textWrapper = null;

            if (data[idx].status === 1) {
                textWrapper = document.createElement("div");
                textWrapper.className = "hopeui-zoom-loader-text";
                lens.className = "hopeui-zoom-loader hopeui-hide";

                textWrapper.appendChild(document.createTextNode("Loading..."));
                lens.appendChild(textWrapper);
            } else if (data[idx].status === 2) {
                lens.className = "hopeui-zoom-lens hopeui-hide";
                lens.removeChild(lens.childNodes[0]);
                // lens.style.background =
                //     "url(" + thumb.src + ") no-repeat 0 0 scroll";

                large.id = idx + "-large";
                large.style.width = data[idx].largeW + "px";
                large.style.height = data[idx].largeH + "px";
                large.className = "hopeui-zoom-large hopeui-hide";

                if (data[idx].mode === "inside") {
                    lens.appendChild(large);
                } else {
                    largeWrapper.innerHTML = "";
                    largeWrapper.appendChild(large);
                }
            }

            lens.style.width = data[idx].lensW + "px";
            lens.style.height = data[idx].lensH + "px";
        },
        getMousePos = function () {
            var xPos = pos.x - curData.x,
                yPos = pos.y - curData.y,
                t = 0,
                l = 0;

            inBounds =
                xPos < 0 || yPos < 0 || xPos > curData.w || yPos > curData.h
                    ? false
                    : true;

            l = xPos - curData.lensW / 2;
            t = yPos - curData.lensH / 2;

            if (curData.mode !== "inside") {
                if (xPos < curData.lensW / 2) {
                    l = 0;
                }

                if (yPos < curData.lensH / 2) {
                    t = 0;
                }

                if (xPos - curData.w + curData.lensW / 2 > 0) {
                    l = curData.w - curData.lensW;
                }

                if (yPos - curData.h + curData.lensH / 2 > 0) {
                    t = curData.h - curData.lensH;
                }
            }

            pos.l = Math.round(l);
            pos.t = Math.round(t);

            curData.lensBgX = pos.l + 1;
            curData.lensBgY = pos.t + 1;

            if (curData.mode === "inside") {
                curData.largeL = Math.round(
                    xPos * (curData.zoom - curData.lensW / curData.w)
                );
                curData.largeT = Math.round(
                    yPos * (curData.zoom - curData.lensH / curData.h)
                );
            } else {
                curData.largeL = Math.round(
                    curData.lensBgX *
                        curData.zoom *
                        (curData.largeWrapperW / curData.w)
                );
                curData.largeT = Math.round(
                    curData.lensBgY *
                        curData.zoom *
                        (curData.largeWrapperH / curData.h)
                );
            }
        },
        zoomInOut = function (e) {
            var delta = e.wheelDelta > 0 || e.detail < 0 ? 0.1 : -0.1,
                handler = curData.scale,
                multiplier = 1,
                w = 0,
                h = 0;

            if (e.preventDefault) {
                e.preventDefault();
            }

            e.returnValue = false;

            curData.zoom = Math.round((curData.zoom + delta) * 10) / 10;

            if (curData.zoom >= 1.1) {
                curData.lensW = Math.round(curData.w / curData.zoom);
                curData.lensH = Math.round(curData.h / curData.zoom);

                if (curData.mode === "inside") {
                    w = curData.w;
                    h = curData.h;
                } else {
                    w = curData.largeWrapperW;
                    h = curData.largeWrapperH;
                    multiplier = curData.largeWrapperW / curData.w;
                }

                curData.largeW = Math.round(curData.zoom * w);
                curData.largeH = Math.round(curData.zoom * h);

                getMousePos();
                updateLensOnZoom();

                if (handler !== null) {
                    handler({
                        thumb: curThumb,
                        lens: curLens,
                        large: curLarge,
                        x: pos.x,
                        y: pos.y,
                        zoom: Math.round(curData.zoom * multiplier * 10) / 10,
                        w: curData.lensW,
                        h: curData.lensH,
                        event: "scale",
                    });
                }
            } else {
                curData.zoom = 1.1;
            }
        },
        onThumbEnter = function () {
            curData = data[curIdx];

            document.getElementById(curData.largeWrapperId).style.visibility =
                "visible";

            curLens = $("#" + curIdx + "-lens");

            if (curData.status === 2) {
                curLens.className = "hopeui-zoom-lens";

                if (curData.zoomAttached === false) {
                    if (
                        curData.zoomable !== undefined &&
                        curData.zoomable === true
                    ) {
                        evt.attach("mousewheel", curLens, zoomInOut);

                        if (window.addEventListener) {
                            curLens.addEventListener(
                                "DOMMouseScroll",
                                function (e) {
                                    zoomInOut(e);
                                }
                            );
                        }
                    }

                    curData.zoomAttached = true;
                }

                curLarge = $("#" + curIdx + "-large");
                curLarge.className = "hopeui-zoom-large";
            } else if (curData.status === 1) {
                curLens.className = "hopeui-zoom-loader";
            }
        },
        onThumbLeave = function () {
            if (curData.status > 0) {
                var handler = curData.leave;

                if (handler !== null) {
                    handler({
                        thumb: curThumb,
                        lens: curLens,
                        large: curLarge,
                        x: pos.x,
                        y: pos.y,
                        event: "leave",
                    });
                }

                if (curLens.className.indexOf("hopeui-hide") === -1) {
                    curLens.className += " hopeui-hide";
                    curThumb.className = curData.thumbCssClass;

                    if (curLarge !== null) {
                        curLarge.className += " hopeui-hide";
                    }
                }

                document.getElementById(
                    curData.largeWrapperId
                ).style.visibility = "hidden";
            }
        },
        move = function () {
            if (status !== curData.status) {
                onThumbEnter();
            }

            if (curData.status > 0) {
                curThumb.className = curData.thumbCssClass; //+ " hopeui-zoom-opaque";

                if (curData.status === 1) {
                    curLens.className = "hopeui-zoom-loader";
                } else if (curData.status === 2) {
                    curLens.className = "hopeui-zoom-lens";
                    curLarge.className = "hopeui-zoom-large";
                    curLarge.style.left = "-" + curData.largeL + "px";
                    curLarge.style.top = "-" + curData.largeT + "px";
                }

                curLens.style.left = pos.l + "px";
                curLens.style.top = pos.t + "px";
                curLens.style.backgroundPosition =
                    "-" + curData.lensBgX + "px -" + curData.lensBgY + "px";

                var handler = curData.move;

                if (handler !== null) {
                    handler({
                        thumb: curThumb,
                        lens: curLens,
                        large: curLarge,
                        x: pos.x,
                        y: pos.y,
                        event: "move",
                    });
                }
            }

            status = curData.status;
        },
        setThumbData = function (thumb, thumbData) {
            var thumbBounds = thumb.getBoundingClientRect(),
                w = 0,
                h = 0;

            thumbData.x = thumbBounds.left;
            thumbData.y = thumbBounds.top;
            thumbData.w = Math.round(thumbBounds.right - thumbData.x);
            thumbData.h = Math.round(thumbBounds.bottom - thumbData.y);

            thumbData.lensW = Math.round(thumbData.w / thumbData.zoom);
            thumbData.lensH = Math.round(thumbData.h / thumbData.zoom);

            if (thumbData.mode === "inside") {
                w = thumbData.w;
                h = thumbData.h;
            } else {
                w = thumbData.largeWrapperW;
                h = thumbData.largeWrapperH;
            }

            thumbData.largeW = Math.round(thumbData.zoom * w);
            thumbData.largeH = Math.round(thumbData.zoom * h);
        };

    this.update = function (imgSrc) {
        if (imgSrc) {
            tempOptions.thumb.src = imgSrc;
            tempOptions.thumb.setAttribute("hope-large-img-url", imgSrc);
            this.set(tempOptions);
        } else {
            throw {
                name: "imgSrc error",
                message: "Please set imgSrc",
                toString: function () {
                    return this.name + ": " + this.message;
                },
            };
        }
    };

    this.attach = function (options) {
        if (options.thumb === undefined) {
            throw {
                name: "Magnifier error",
                message: "Please set thumbnail",
                toString: function () {
                    return this.name + ": " + this.message;
                },
            };
        }

        var thumb = $(options.thumb),
            i = 0;

        if (thumb.length !== undefined) {
            for (i; i < thumb.length; i += 1) {
                options.thumb = thumb[i];
                this.set(options);
            }
        } else {
            options.thumb = thumb;
            this.set(options);
        }
        tempOptions = options;
    };

    this.setThumb = function (thumb) {
        curThumb = thumb;
    };

    this.set = function (options) {
        // if (data[options.thumb.id] !== undefined) {
        //     curThumb = options.thumb;
        //     return false;
        // }

        var thumbObj = new Image(),
            largeObj = new Image(),
            thumb = options.thumb,
            idx = thumb.id,
            zoomable = null,
            largeUrl = null,
            largeWrapper =
                $("#" + options.largeWrapper) ||
                $("#" + thumb.getAttribute("data-large-img-wrapper")) ||
                $("#" + curData.largeWrapperId),
            zoom = options.zoom || thumb.getAttribute("data-zoom") || gZoom,
            mode = options.mode || thumb.getAttribute("data-mode") || gMode,
            enter = options.enter !== undefined ? options.enter : curData.enter,
            leave = options.leave !== undefined ? options.leave : curData.leave,
            move = options.move !== undefined ? options.move : curData.move,
            scale = options.scale !== undefined ? options.scale : curData.scale;

        if (options.large === undefined) {
            largeUrl =
                options.thumb.getAttribute("hope-large-img-url") !== null
                    ? options.thumb.getAttribute("hope-large-img-url")
                    : options.thumb.src;
        } else {
            largeUrl = options.large;
        }

        if (largeWrapper === null && mode !== "inside") {
            throw {
                name: "Magnifier error",
                message: "Please specify large image wrapper DOM element",
                toString: function () {
                    return this.name + ": " + this.message;
                },
            };
        }

        if (options.zoomable !== undefined) {
            zoomable = options.zoomable;
        } else if (thumb.getAttribute("data-zoomable") !== null) {
            zoomable = thumb.getAttribute("data-zoomable") === "true";
        } else if (curData.zoomable !== undefined) {
            zoomable = curData.zoomable;
        }

        if (thumb.id === "") {
            idx = thumb.id = "hopeui-zoom-item-" + gId;
            gId += 1;
        }

        createLens(thumb, idx);

        data[idx] = {
            zoom: zoom,
            mode: mode,
            zoomable: zoomable,
            thumbCssClass: thumb.className,
            zoomAttached: false,
            status: 0,
            largeUrl: largeUrl,
            largeWrapperId: mode === "outside" ? largeWrapper.id : null,
            largeWrapperW: mode === "outside" ? largeWrapper.offsetWidth : null,
            largeWrapperH:
                mode === "outside" ? largeWrapper.offsetHeight : null,
            scale: scale,
            enter: enter,
            leave: leave,
            move: move,
        };

        evt.attach(
            "mouseover",
            thumb,
            function (e, src) {
                if (curData.status !== 0) {
                    onThumbLeave();
                }

                curIdx = src.id;
                curThumb = src;

                onThumbEnter(src);

                setThumbData(curThumb, curData);

                pos.x = e.clientX;
                pos.y = e.clientY;

                getMousePos();
                move();

                var handler = curData.enter;

                if (handler !== null) {
                    handler({
                        thumb: curThumb,
                        lens: curLens,
                        large: curLarge,
                        x: pos.x,
                        y: pos.y,
                        event: "enter",
                    });
                }
            },
            false
        );

        evt.attach("mousemove", thumb, function (e, src) {
            isOverThumb = 1;
        });

        evt.attach("load", thumbObj, function () {
            data[idx].status = 1;

            setThumbData(thumb, data[idx]);
            updateLensOnLoad(idx);

            evt.attach("load", largeObj, function () {
                data[idx].status = 2;
                updateLensOnLoad(idx, thumb, largeObj, largeWrapper);
            });

            largeObj.src = data[idx].largeUrl;
        });

        thumbObj.src = thumb.src;

        if (mode === "inside") {
            thumb.nextSibling.style.opacity = 1;
        }
    };

    evt.attach(
        "mousemove",
        document,
        function (e) {
            pos.x = e.clientX;
            pos.y = e.clientY;

            getMousePos();

            if (inBounds === true) {
                move();
            } else {
                if (isOverThumb !== 0) {
                    onThumbLeave();
                }

                isOverThumb = 0;
            }
        },
        false
    );

    evt.attach("scroll", window, function () {
        if (curThumb !== null) {
            setThumbData(curThumb, curData);
        }
    });
};

module.exports.Event = function () {
    this.attach = function (evtName, element, listener, capture) {
        let evt = "",
            useCapture = capture === undefined ? true : capture,
            handler = null;

        if (window.addEventListener === undefined) {
            evt = "on" + evtName;
            handler = function (evt, listener) {
                element.attachEvent(evt, listener);
                return listener;
            };
        } else {
            evt = evtName;
            handler = function (evt, listener, useCapture) {
                element.addEventListener(evt, listener, useCapture);
                return listener;
            };
        }

        return handler.apply(element, [
            evt,
            function (ev) {
                let e = ev || event,
                    src = e.srcElement || e.target;

                listener(e, src);
            },
            useCapture,
        ]);
    };

    this.detach = function (evtName, element, listener, capture) {
        let evt = "",
            useCapture = capture === undefined ? true : capture;

        if (window.removeEventListener === undefined) {
            evt = "on" + evtName;
            element.detachEvent(evt, listener);
        } else {
            evt = evtName;
            element.removeEventListener(evt, listener, useCapture);
        }
    };

    this.stop = function (evt) {
        evt.cancelBubble = true;

        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
    };

    this.prevent = function (evt) {
        if (evt.preventDefault) {
            evt.preventDefault();
        } else {
            evt.returnValue = false;
        }
    };
};
