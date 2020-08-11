/*
 * @Author       : Evan.G
 * @Date         : 2020-08-07 10:35:59
 * @LastEditTime : 2020-08-10 17:54:52
 * @Description  :
 */

const $ = require("../utils/hopeu.js");

module.exports.tabHandler = function({ ele, options, on }) {
    const $dom = $(ele),
        obj = new Object();

    $dom.find("li").on("click", function(e) {
        $(this)
            .addClass("hopeui-tab-this")
            .siblings()
            .removeClass("hopeui-tab-this");

        $(this)
            .parent()
            .siblings(".hopeui-tab-content")
            .children()
            .eq($(this).index())
            .addClass("hopeui-show")
            .siblings()
            .removeClass("hopeui-show");

        if (on.change) {
            on.change({
                index: $(this).index(),
                targetEle: this,
                targetEleContent: $(this)
                    .parent()
                    .siblings(".hopeui-tab-content")[0],
                eventName: "change",
            });
        }
    });
    if (on.init) {
        on.init({
            ele: $dom[0],
            eventName: "init",
        });
    }

    return obj;
};
