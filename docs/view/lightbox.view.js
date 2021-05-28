/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2021-05-28 14:00:51
 * @Description  :
 */

export const viewinfo = {
ifm:`
<div class="hopeui-row lightbox" id="lightbox" >
    <div class="hopeui-col-xl-6-12">
        <img hope-url="http://test.haier.com/cn/"
            src="img/demo1.jpeg"
            alt="">
    </div>
    <div class="hopeui-col-xl-6-12">
        <img hope-url="http://tbbs.haier.com/"
            src="img/demo2.jpeg"
            alt="">
    </div>
</div>
`,
ifmJS: `
hope.lightbox({
    ele: ".lightbox",
    options: {
        width: '70%',
        type: 'iframe', //pic,video
        frameFullScreen: false,
        maskColor: 'rgba(73,74,95,0.8)',
        animation: "no",
        prevIcon: "hopeui-icon hopeui-icon-left",
        nextIcon: "hopeui-icon hopeui-icon-right",
        closeIcon: "hopeui-icon hopeui-icon-close",
    },
    on: {
        prev:function (e) {},
        next:function (e) {},
        open:function (e) {},
        close:function (e) {},
    },
});
`,
pic:`
<div class="hopeui-row lightbox2" id="lightbox2">
    <div class="hopeui-col-xl-6-12">
        <img src="img/demo1.jpeg"
            alt="" />
    </div>
    <div class="hopeui-col-xl-6-12">
         <img src="img/demo2.jpeg"
            alt="" />
    </div>
    <div class="hopeui-col-xl-6-12">
         <img src="img/demo5.jpeg"
            alt="" />
    </div>
    <div class="hopeui-col-xl-6-12">
         <img src="img/demo4.jpeg"
            alt="" />
    </div>
</div>
`,
picJS: `
hope.lightbox({
    ele: "#lightbox2",
    options: {
        width: "70%",
        type: "pic", //pic,video
        maskColor: "rgba(73,74,95,0.8)",
        animation: "no",
    },
    on: {
        prev:function (e) {},
        next:function (e) {},
        open:function (e) {},
        close:function (e) {},
    },
});
`
};
