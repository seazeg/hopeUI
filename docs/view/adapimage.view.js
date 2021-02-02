/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2021-02-02 09:50:41
 * @Description  :
 */
export const viewinfo = {
    html: `
<div class="imgcenter_warp">
    <img class="imgCover hopeui-opacity-low hopeui-effect-scale" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607062364792&di=b944518c3252a66f9f55095ac2c93ef4&imgtype=0&src=http%3A%2F%2Fattachments.gfan.com%2Fforum%2F201504%2F06%2F0638202b7ws2d2w4bzsyuu.jpg" alt="">
</div>
<div class="imgcenter_warp" style="width:800px">
     <img class="imgCover hopeui-opacity-low hopeui-effect-scale"
         src="https://imagegroup1.haier.com/press-events/news/W020201202614510610244.jpg"
         alt="">
</div>
   `,
    js: `
hope.adapimage({
    ele: ".imgCover",
    options: {},
    on: {
        init:function(){

        }
    }
})`,
};
