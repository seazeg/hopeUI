/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2022-08-24 09:34:15
 * @Description  :
 */
export const viewinfo = {
           message: `
<button type="button" class="hopeui-btn" id="open1">
    消息弹框
</button>`,

           ifm: `
<button type="button" class="hopeui-btn" id="open2">
    ifm嵌套
</button>`,

           drag: `
<button type="button" class="hopeui-btn" id="open3">
    可拖拽
</button>`,

           messageJS: `
    document.querySelector("#open1").onclick = function() {
        hope.layer({
            options: {
                title: "信息",
                width:"300",
                content:
                    "<div style='padding:20px;text-align: center;'>你好，你已经吃过了</div>",
                defaultBtn: {
                    ok: "好的",
                    cancel: "拜拜",
                },
            },
        });
    };`,

           ifmJS: `
    document.querySelector("#open2").onclick = function() {
        let ly = hope.layer({
            options: {
                title: "iframe弹框",
                width:"375",
                content: '<iframe id="frameContent" style="width:375px;height:800px" src="http://test.haier.com/netcn/" frameborder=0 allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></iframe>',
                isFullScreen:false
            },
            on: {
                confirm: function(e) {
                    ly.close();
                },
            },
        });
    };`,

           dragJS: `
    document.querySelector("#open3").onclick = function() {
        let ly = hope.layer({
            options: {
                title: "可拖拽弹框",
                width:"800",
                content:
                    '<img src="img/demo1.jpeg" style="width:800px;height:500px" />',
                isMask: false,
                isDrag: true,
            },
            on: {
                confirm: function(e) {
                    ly.close();
                },
            },
        });
    };`,
       };
