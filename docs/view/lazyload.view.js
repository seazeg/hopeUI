/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2021-05-28 14:02:27
 * @Description  :
 */
export const viewinfo = {
    html: `
    <div style="font-size: 0;">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    <img class="lazyload"
    hope-xl-src="img/demo1.jpeg"
    hope-md-src="img/demo2.jpeg"
    hope-xs-src="img/demo3.jpeg" alt="">
    </div>
    `,
    js:`
hope.lazyload({
    ele: ".lazyload",
    options: {
        breakpoint: {
            //每个端的最min断点，默认xl.1200,md.750
            xl: 1200,
            md: 768,
            xs: 0
        },
        responsive:true,
        adapimage:true
    }
})
    `
};
