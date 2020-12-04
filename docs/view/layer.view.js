/*
 * @Author       : Evan.G
 * @Date         : 2020-07-31 15:32:44
 * @LastEditTime : 2020-12-04 17:14:17
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
                content:
                    "<div style='padding:20px;text-align: center;'>你好，你已经吃过了</div>",
                defaultBtn: {
                    ok: "好的",
                    cancel: "拜拜",
                },
            },
        });
    };`,

    ifmJS:`
    document.querySelector("#open2").onclick = function() {
        let ly = hope.layer({
            options: {
                title: "iframe弹框",
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

    dragJS:`
    document.querySelector("#open3").onclick = function() {
        let ly = hope.layer({
            options: {
                title: "可拖拽弹框",
                content:
                    '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596605654660&di=3efa3194330834b16d1edce806f3ace4&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201105%2F17%2F113554rnu40q7nbgnn3lgq.jpg" style="width:800px;height:500px" />',
                isMask: false,
                isDrag: true,
            },
            on: {
                confirm: function(e) {
                    ly.close();
                },
            },
        });
    };`


};
