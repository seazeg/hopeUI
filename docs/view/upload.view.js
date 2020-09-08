/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-09-08 10:32:49
 * @Description  :
 */
export const viewinfo = {
    html:`
<div class="docs-content">
    <div id="uploadlist"></div>
    <br>
    <button class="hopeui-btn" id="upload">文件选择</button>
</div>   
    `,
    js:`
hope.upload({
    ele: "#upload",
    options: {
        url: '/app/fileUpload',
        name: "file",
        type: ['jpg', 'png'],
        size: 5 * 1024 * 1024 //5mb
    },
    on: {
        validate: function (e) {
            console.log(e);
            if (!e.result) {
                alert('type不符合')
            }
        },
        uploading: function () {
            console.log('上传中');
        },
        complete: function (res) {
            console.log(res);
            $('#uploadlist').html('<img src="/app/'+res.imgurl+'" />')
        },
        error: function (res) {

        }
    }
})
    `
}