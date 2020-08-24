/*
 * @Author       : Evan.G
 * @Date         : 2020-08-24 13:49:24
 * @LastEditTime : 2020-08-24 16:25:39
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.scrollbarHandler = function({ ele, options, on }) {
    if ($(ele).find(".hopeui-scrollbar-bar").length <= 0) {
        const obj = new Object();
        let $dom = null;
        let listTemp = $(ele)
            .addClass("hopeui-scrollbar")
            .html();
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

        let $bar = $('<span class="hopeui-scrollbar-bar"></span>').insertAfter(
            $(ele).children()
        );
        $dom = $(ele)
            .children()
            .get(0);

        let rate = $dom.clientHeight / $dom.scrollHeight;
        let barHeight = rate * $dom.clientHeight;
        if (rate < 1) {
            $bar.css("height", barHeight + "px");
        } else {
            $bar.css("display", "none");
        }

        $dom.onscroll = function(e) {
            $bar.css("top", this.scrollTop * rate + "px");
            if (on.scroll) {
                on.scroll({
                    distance: this.scrollTop * rate,
                    eventName: "scroll",
                });
            }
        };

        if (on.init) {
            on.init();
        }

        return obj;
    }
};
