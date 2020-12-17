/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2020-12-17 14:40:48
 * @Description  :
 */

export const viewinfo = {
    html: `
    <div class="hopeui-zoom-thumb-wrapper"  style="display: inline-block">
        <img id="thumb" src="http://test.haier.com/frontDEMO/ProgressiveJPEG/ProgressiveJPEG.jpg"
            data-large-img-url="http://test.haier.com/frontDEMO/ProgressiveJPEG/ProgressiveJPEG.jpg"
            data-large-img-wrapper="preview">
    </div>
    <div class="hopeui-zoom-preview" id="preview"
        style="width: 400px; height: 400px;display: inline-block;vertical-align: top;">局部显示区域</div>
    `,
    js: `
hope.zoom({
    ele: '#thumb',
    options: {
        largeWrapper: 'preview',
        mode: 'outside',
        zoom: 2,
        zoomable: true
    },
    on:{
        enter: function (e) {},
        move: function (e) {},
        leave: function (e) {},
        scale: function (e) {},
    }
});
    `,
};
