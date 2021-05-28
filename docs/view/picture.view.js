/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2021-05-28 14:00:32
 * @Description  :
 */
export const viewinfo = {
    html: `
<img class="hope_picture" 
src="img/demo1.jpeg"
hope-xl-src="img/demo2.jpeg"
hope-lg-src="img/demo3.jpeg"
hope-md-src="img/demo4.jpeg"
hope-sm-src="img/demo3.jpeg"
hope-xs-src="img/demo5.jpeg" alt="">

<img class="hope_picture" 
src="img/demo1.jpeg"
hope-xl-src="img/demo2.jpeg"
hope-lg-src="img/demo3.jpeg"
hope-md-src="img/demo4.jpeg"
hope-sm-src="img/demo3.jpeg"
hope-xs-src="img/demo5.jpeg" alt="">

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
