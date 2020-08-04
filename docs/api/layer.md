# 弹层控件
# 11111111111111
```javascript
document.querySelector("#open1").onclick = function () {
    hope.layer({
        options: {
            title: "fuck标题",
            content: ` <div style="width:900px;height:500px;padding:20px;">
                                我是弹层内容我是弹层内容我是弹层内容我是弹层内容我是弹层内容
                            </div>`,
            isDefaultBtn: true,
            defaultBtn: {
                ok: "好的",
                close: "拜拜",
            },
        },
    });
};

document.querySelector("#open2").onclick = function () {
    let ly = hope.layer({
        options: {
            title: "卧槽标题",
            content: ` <div style="padding:20px;">
                            是弹层内容我是弹层我我哦我我我是弹层内容
                            </div>`,
            isDefaultBtn: true,
            defaultBtn: {
                ok: "ok",
                close: "bye~",
            },
        },
        on: {
            confirm: function (e) {
                ly.close();
            },
        },
    });
};
```
