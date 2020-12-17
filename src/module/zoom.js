/*
 * @Author       : Evan.G
 * @Date         : 2020-12-17 09:56:06
 * @LastEditTime : 2020-12-17 12:01:22
 * @Description  :
 */

const $ = require("../utils/hopeu.js");
const { Hope_zoom, Event } = require("../utils/zoom.core.js");

module.exports.zoomHandler = function ({ ele, options, on }) {
    const evt = new Event();
    let zoom = new Hope_zoom(evt);

    let obj = zoom.attach(
        Object.assign(
            {
                thumb: ele,
            },
            options,
            on
        )
    );

    return obj;
};
