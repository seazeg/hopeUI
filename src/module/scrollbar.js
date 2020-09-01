/*
 * @Author       : Evan.G
 * @Date         : 2020-08-24 13:49:24
 * @LastEditTime : 2020-09-01 15:50:36
 * @Description  : 自定义滚动条
 */

const $ = require("../utils/hopeu.js");
const { is } = require("../utils/is.js");

module.exports.scrollbarHandler = function ({ ele, options, on }) {
    // if ($(ele).find(".hopeui-scrollbar-bar").length <= 0) {
        const obj = new Object();
        let $dom = null;
        let listTemp = $(ele).addClass("hopeui-scrollbar").html();
        if (options.height) {
            $(ele).css("height", options.height + "px");
        }
        if ($(ele).find(".hopeui-scrollbar-box").length <= 0) {
            $(ele).html(`<div class="hopeui-scrollbar-box">${listTemp}</div>`);
        } else {
            $dom = $(ele)
                .addClass("hopeui-scrollbar")
                .children()
                .addClass("hopeui-scrollbar-box")
                .get(0);
        }

        if($(ele).find(".hopeui-scrollbar-bar").length > 0){
            $(ele).find(".hopeui-scrollbar-bar").remove();
        }
  
        let $bar = $('<span class="hopeui-scrollbar-bar"></span>').insertAfter(
            $(ele).children()
        );
        $dom = $(ele).children();

        let rate = $dom.get(0).clientHeight / $dom.get(0).scrollHeight;
        let barHeight = rate * $dom.get(0).clientHeight;
        if (rate < 1) {
            $bar.css("height", barHeight + "px");
        } else {
            $bar.css("display", "none");
        }

        $dom.off().on('scroll',function(){
            $bar.css("top", this.scrollTop * rate + "px");
            if (on.scroll) {
                on.scroll({
                    distance: this.scrollTop * rate,
                    eventName: "scroll",
                });
            }
        })

        $bar.get(0).onmousedown = function (ev) {
            is.stopBubble(ev);
            is.stopDefault(ev);
            this.thisTop = $dom.get(0).scrollTop;
            $bar.get(0).onmousemove = function (ev) {
                console.log(ev);
                $dom.get(0).scrollTop = this.thisTop++;
            };
            $bar.get(0).onmouseup = function () {
                $bar.get(0).onmousemove = null;
            };
        };

        if (on.init) {
            on.init();
        }

        return obj;
    // }
};
