/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-03 11:53:06
 * @Description  :
 */
export const viewinfo = {
    html: `
<div class="hope-container">
    <div class="hope-wrapper">
        <div class="hope-slide">
            <div class="title">Slide 1</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 2</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 3</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 4</div>
        </div>
    </div>
    <div class="hope-pagination"></div>
</div>
    `,
    js: `
var carousel = hope.carousel({
    ele: ".hope-container",
    options: {
        pagination: ".hope-container .hope-pagination",
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
    .hope-container2 {
        height: 400px;
        color: #fff;
        text-align: center;
        overflow: hidden;
        position: relative;
    }
</style>
<div class="hope-container2">
    <div class="hope-wrapper">
        <div class="hope-slide">
            <div class="title">Slide 1</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 2</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 3</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 4</div>
        </div>
    </div>
    <div class="hope-pagination"></div>
</div>
    `,
    js2: `
var carousel = hope.carousel({
    ele: ".hope-container2",
    options: {
        pagination: ".hope-container2 .hope-pagination",
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
<div class="hope-container3">
    <div class="hope-wrapper">
        <div class="hope-slide">
            <div class="title">Slide 1</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 2</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 3</div>
        </div>
        <div class="hope-slide">
            <div class="title">Slide 4</div>
        </div>
    </div>
    <div class="hope-pagination"></div>
</div>
    `,
    js3: `
var carousel = hope.carousel({
    ele: ".hope-container3",
    options: {
        pagination: ".hope-container3 .hope-pagination",
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