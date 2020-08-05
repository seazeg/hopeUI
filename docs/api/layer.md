# 基础示例

```javascript
document.querySelector("#open1").onclick = function () {
    hope.layer({
        options: {
            title: "fuck标题",
            content: ` <div style="width:500px;height:400px;padding:20px;">
                            我是弹层内容我是弹层内容我是弹层内容我是弹层内容我是弹层内容
                       /div>`,
            isDefaultBtn: true,
            defaultBtn: {
                ok: "好的",
                cancel: "拜拜",
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
                cancel: "bye~",
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

# 基础属性

| 参数 | 说明          | 类型   | 可选值               | 默认值  |
| ---- | ------------- | ------ | -------------------- | ------- |
| ele  | 元素 dom 节点 | String | Class / id / TagName | TagName |

# 参数配置 options

| 参数         | 说明           | 类型          | 可选值 | 默认值                |
| ------------ | -------------- | ------------- | ------ | --------------------- |
| title        | 标题内容       | String        | --     | --                    |
| content      | 主要内容       | HTML / String | --     | --                    |
| isDefaultBtn | 是否有默认按钮 | Boolean       | --     | true                  |
| defaultBtn   | 按钮描述       | Object        | --     | ok:确定 / cancel:取消 |

# 回调方法 on

| 方法名  | 说明           | 类型     | 默认值 | 回调参数     |
| ------- | -------------- | -------- | ------ | ------------ |
| confirm | 确认完成后回调 | Function | null   | 当前对象 DOM |
| open    | 打开后回调     | Function | null   | 当前对象 DOM |
| close   | 关闭后回调     | Function | null   | 当前对象 DOM |

# 调用方法

| 方法名 | 说明         | 类型     | 默认值 | 参数 |
| ------ | ------------ | -------- | ------ | ---- |
| close  | 外部调用关闭 | Function | --     | --   |
