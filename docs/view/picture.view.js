/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-04 12:08:51
 * @Description  :
 */
export const viewinfo = {
    html: `
<img class="hope_picture" 
src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607057375590&di=46c29f9e7f28f4ee253132c51d6102fb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc67bcdfe10d5201067157ff7376414c6a9f9900437c69-EndxN7_fw658"
hope-xl-src="http://test.haier.com/frontDEMO/ProgressiveJPEG/990.png"
hope-lg-src="http://test.haier.com/frontDEMO/ProgressiveJPEG/ProgressiveJPEG.jpg"
hope-md-src="http://test.haier.com/netcn/images/home_brand_img1.png"
hope-sm-src="http://test.haier.com/frontDEMO/ProgressiveJPEG/ProgressiveJPEG.jpg"
hope-xs-src="http://test.haier.com/netcn/W020201201621125480698.png" alt="">

<img class="hope_picture" 
src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1607057375590&di=46c29f9e7f28f4ee253132c51d6102fb&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2Fc67bcdfe10d5201067157ff7376414c6a9f9900437c69-EndxN7_fw658"
hope-xl-src="http://test.haier.com/frontDEMO/ProgressiveJPEG/990.png"
hope-lg-src="http://test.haier.com/frontDEMO/ProgressiveJPEG/ProgressiveJPEG.jpg"
hope-md-src="http://test.haier.com/netcn/images/home_brand_img1.png"
hope-sm-src="http://test.haier.com/frontDEMO/ProgressiveJPEG/ProgressiveJPEG.jpg"
hope-xs-src="http://test.haier.com/netcn/W020201201621125480698.png" alt="">

    `,
    js:`
hope.picture({
    ele: ".hope_picture",
    options: {
        breakpoint: {
            //每个端的最min断点，默认xl.1200,md.750
            xl: 1200,
            lg: 960,
            md: 768,
            sm: 575,
            xs: 0
        }
    },
    on: {
        resize: function (e) {
            console.log(e);
        }
    }
})
    `
};
