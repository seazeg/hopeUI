/*
 * @Author       : Evan.G
 * @Date         : 2020-07-14 10:02:59
 * @LastEditTime : 2020-07-28 14:29:14
 * @Description  : hopeUI框架
 */
import "./styles/hopeui.less";
import { formControls } from "./module/form.js";
class Hopeui {
    constructor() {
    }
    _extend(target, source) {
        if (
            Object.prototype.toString.call(target) === "[object Object]" &&
            Object.prototype.toString.call(source) === "[object Object]"
        ) {
            for (let key in source) {
                target[key] =
                    target[key] && target[key].toString() === "[object Object]"
                        ? this._extend(target[key], source[key])
                        : (target[key] = source[key]);
            }
        }
        return target;
    }
    init() {
        let modules = {
                formControls: formControls,
            },
            res = {};
        for (let m in modules) {
            res = this._extend(res, new modules[m]());
        }
        return res;
    }
}

export const hope = new Hopeui().init();
window.hope = hope;
