/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-03 15:06:11
 * @Description  :
 */
export const viewinfo = {
    html: `
<div class="hope-container banner">
    <div class="hope-wrapper">
        <div class="hope-slide docs-grid-demo-bg1">
            <div class="title">Slide 1</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg2">
            <div class="title">Slide 2</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg3">
            <div class="title">Slide 3</div>
        </div>
    </div>
    <div class="hope-pagination"></div>
</div>
    `,
    js: `
var carousel = hope.carousel({
    ele: ".banner",
    options: {
        pagination: ".banner .hope-pagination",
        loop: true
    },
    on:{
        onFirstInit: function (e) {
            console.log(e);
        },
        onSlideChangeStart: function (e) {
            console.log(e);
        }
    }
})
    `,
    html2: `
<style>
    .banner2 {
        height: 400px;
        color: #fff;
        text-align: center;
    }
</style>
<div class="hope-container banner2">
    <div class="hope-wrapper">
        <div class="hope-slide docs-grid-demo-bg1">
            <div class="title">Slide 1</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg2">
            <div class="title">Slide 2</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg3">
            <div class="title">Slide 3</div>
        </div>
    </div>
    <div class="hope-pagination"></div>
</div>
    `,
    js2: `
var carousel = hope.carousel({
    ele: ".banner2",
    options: {
        pagination: ".banner2 .hope-pagination",
        loop: true,
        mode: 'vertical'
    },
    on:{
        onFirstInit: function (e) {
            console.log(e);
        },
        onSlideChangeStart: function (e) {
            console.log(e);
        }
    }
})
    `,
    html3: `
<div class="hope-container banner3">
    <div class="hope-wrapper">
        <div class="hope-slide docs-grid-demo-bg1">
            <div class="title">Slide 1</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg2">
            <div class="title">Slide 2</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg3">
            <div class="title">Slide 3</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg1">
            <div class="title">Slide 4</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg2">
            <div class="title">Slide 5</div>
        </div>
        <div class="hope-slide docs-grid-demo-bg3">
            <div class="title">Slide 6</div>
        </div>
    </div>
    <div class="hope-pagination"></div>
</div>
    `,
    js3: `
var carousel = hope.carousel({
    ele: ".banner3",
    options: {
        pagination: ".banner3 .hope-pagination",
        loop: true,
        slidesPerView: 3
    },
    on:{
        onFirstInit: function (e) {
            console.log(e);
        },
        onSlideChangeStart: function (e) {
            console.log(e);
        }
    }
})
    `,
};
