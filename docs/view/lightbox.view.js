/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2020-08-21 13:52:10
 * @Description  :
 */

import {
    withKnobs,
    number,
    object,
    boolean,
    text,
    select,
    date,
    array,
    color,
} from "@storybook/addon-knobs";
import styleConf from "../styleConfig.json";
import { utils } from "../utils";
export const lightbox = () => {
    return `
    <div class="docs-box">
    <div class="docs-title">
        <fieldset>
            <legend><a name="icon">灯箱BOX-ifm</a></legend>
        </fieldset>
    </div>
    <div class="docs-content">
        <div class="hopeui-row" id="lightbox">
            <div class="hopeui-col-xl-6-12" >
                    <img hope-url="http://test.haier.com/cn/" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597991454359&di=c1b05e51256b5f0a175fa63e93ca38ab&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-27%2F5a1badef69784.png"
                        alt="">
            </div>
            <div class="hopeui-col-xl-6-12" >
                    <img hope-url="http://tbbs.haier.com/" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597991491173&di=708f001ee20ef780378d82d5766f8029&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F57a1488cdd6de.jpg"
                        alt="">
            </div>
        </div>
        <ul >
            
          
        </ul>
    </div>

    <div class="docs-title">
            <fieldset>
                <legend><a name="icon">灯箱BOX-PIC</a></legend>
            </fieldset>
        </div>
        <div class="docs-content">
            <div class="hopeui-row" id="lightbox2">
                <div class="hopeui-col-xl-6-12" >
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597998693093&di=551a5cfe9c00be5c21327d39166a3d38&imgtype=0&src=http%3A%2F%2Fpic.rmb.bdstatic.com%2F381baf328b9d2a1df43d635b1d36553f.jpeg"
                    alt="">
                </div>
                 <div class="hopeui-col-xl-6-12">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597998758089&di=fa42e91f6a92d2d4130e610e94566dc3&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201508%2F22%2F20150822210318_e3Bmw.jpeg"
                    alt="">
                </div>
                <div class="hopeui-col-xl-6-12" >
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597998693094&di=c5d9d6a56fd156eab0aeb4f6a360120e&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2Fd%2F57a310cde36c5.jpg"
                    alt="">
                </div>          
                <div class="hopeui-col-xl-6-12" >
                <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597998993812&di=36535a08230e435c69f81809bd3e639e&imgtype=0&src=http%3A%2F%2Fimg3.imgtn.bdimg.com%2Fit%2Fu%3D1595589658%2C1278694932%26fm%3D214%26gp%3D0.jpg"
                alt="">
            </div>     
            </div>

        </div>
</div>
`;
};
