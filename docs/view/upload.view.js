/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2021-07-22 14:07:21
 * @Description  :
 */
export const viewinfo = {
    html: `
<div class="docs-content">
    <div id="uploadlist"></div>
    <br>
    <button class="hopeui-btn" id="upload">文件选择</button>
</div>   
    `,
    js: `
hope.upload({
    ele: "#upload",
    options: {
        url: '/app/fileUpload',
        name: "file",
        allowedExtensions: ['jpg', 'png'],
        multiple: true,
    },
    on: {
        beforeUpload:function(){
            
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
    `,
};
