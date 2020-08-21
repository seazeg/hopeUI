/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2020-08-21 11:54:06
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
            <div class="hopeui-col-xl-6-12" hopeui-url="http://test.haier.com/cn/">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597991454359&di=c1b05e51256b5f0a175fa63e93ca38ab&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F2017-11-27%2F5a1badef69784.png"
                        alt="">
            </div>
            <div class="hopeui-col-xl-6-12" hopeui-url="http://tbbs.haier.com/cn/">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597991491173&di=708f001ee20ef780378d82d5766f8029&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F1%2F57a1488cdd6de.jpg"
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
            <ul id="lightbox2">
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727248727&di=1f00ca0abea2465a805e42bfb3a6d9a8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfc51231eab3a472.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727248727&di=1f00ca0abea2465a805e42bfb3a6d9a8&imgtype=0&src=http%3A%2F%2Fp2.so.qhimgs1.com%2Ft01dfc51231eab3a472.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727369963&di=6c161ffa1506b54ea1235f027dc3f73d&imgtype=0&src=http%3A%2F%2Fimage3.xyzs.com%2Fupload%2F78%2F75%2F117595%2F20130831%2F137796265222589_0.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727369963&di=6c161ffa1506b54ea1235f027dc3f73d&imgtype=0&src=http%3A%2F%2Fimage3.xyzs.com%2Fupload%2F78%2F75%2F117595%2F20130831%2F137796265222589_0.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727248722&di=12f7a112fc279289cd343c1df11eb5b4&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F7%2F56e10f5f1b563.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727248722&di=12f7a112fc279289cd343c1df11eb5b4&imgtype=0&src=http%3A%2F%2Fpic1.win4000.com%2Fwallpaper%2F7%2F56e10f5f1b563.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727248741&di=edfe2294af0471e4ab81ab60d66682d6&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201310%2F18%2F104442giotwgbti96wpit8.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727248741&di=edfe2294af0471e4ab81ab60d66682d6&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2Fattachments2%2F201310%2F18%2F104442giotwgbti96wpit8.jpg"
                        alt="">
                </li>

                <li
                    hopeui-src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206071001,2610967668&fm=26&gp=0.jpg">
                    <img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=206071001,2610967668&fm=26&gp=0.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727369959&di=69161651f53103acfeb877bc9458d331&imgtype=0&src=http%3A%2F%2Fimage1.xyzs.com%2Fupload%2F3f%2Fe7%2F1128%2F20141204%2F141770690887573_0.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727369959&di=69161651f53103acfeb877bc9458d331&imgtype=0&src=http%3A%2F%2Fimage1.xyzs.com%2Fupload%2F3f%2Fe7%2F1128%2F20141204%2F141770690887573_0.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727449896&di=8457771af2d9fbef8fe95af855e1f62c&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F124%2F86236%2F0454861e59bf131f_1680x1050.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727449896&di=8457771af2d9fbef8fe95af855e1f62c&imgtype=0&src=http%3A%2F%2Fdik.img.kttpdq.com%2Fpic%2F124%2F86236%2F0454861e59bf131f_1680x1050.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727414874&di=25a14f0dfcebfaa0ce7b386cf655bc38&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F42a98226cffc1e17a5bc685e4b90f603738de95a.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727414874&di=25a14f0dfcebfaa0ce7b386cf655bc38&imgtype=0&src=http%3A%2F%2Fh.hiphotos.baidu.com%2Fzhidao%2Fpic%2Fitem%2F42a98226cffc1e17a5bc685e4b90f603738de95a.jpg"
                        alt="">
                </li>
                <li
                    hopeui-src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727369959&di=734262a4dfad0e47bbdfcdeb1c492786&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201806%2F05%2F172039ocnznjvp8pwj44wr.jpg">
                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1597727369959&di=734262a4dfad0e47bbdfcdeb1c492786&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201806%2F05%2F172039ocnznjvp8pwj44wr.jpg"
                        alt="">
                </li>

            </ul>
        </div>
</div>
`;
};
