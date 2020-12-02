/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-02 17:13:53
 * @Description  :
 */
export const viewinfo = {
    html: `
    <div class="hope-container" id="hope-container">
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
        ele: "#hope-container",
        options: {
            pagination: ".hope-pagination",
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