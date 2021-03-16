/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2021-03-16 14:49:58
 * @Description  :
 */
export const viewinfo = {
    html: `
<div class="imgcenter_warp" style="height:600px">
    <img class="imgCover hopeui-opacity-low" src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201510%2F11%2F20151011212521_sRJhf.jpeg&refer=http%3A%2F%2Fb-ssl.duitang.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1618469309&t=5b0ace8e57d7fd4f3ac54d3671b6f6be" alt="">
</div>
<div class="imgcenter_warp" style="width:800px">
     <img class="imgCover hopeui-opacity-low"
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
