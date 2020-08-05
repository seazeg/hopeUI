## 基础示例

```javascript
document.querySelector("#open1").onclick = function () {
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
};

document.querySelector("#open2").onclick = function () {
    let ly = hope.layer({
        options: {
            title: "iframe弹框",
            content:
                '<iframe style="width:1000px;height:600px" src="http://test.haier.com/masvod/public/2020/06/05/20200605_17283277896_r1_800k.mp4" frameborder=0 allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></iframe>',
        },
        on: {
            confirm: function (e) {
                ly.close();
            },
        },
    });
};

document.querySelector("#open3").onclick = function () {
    let ly = hope.layer({
        options: {
            title: "可拖拽弹框",
            content:
                '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596605654660&di=3efa3194330834b16d1edce806f3ace4&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201105%2F17%2F113554rnu40q7nbgnn3lgq.jpg" style="width:800px" />',
            isDrag: true,
        },
        on: {
            confirm: function (e) {
                ly.close();
            },
        },
    });
};
```

## 基础属性

| 参数 | 说明          | 类型   | 可选值               | 默认值  |
| ---- | ------------- | ------ | -------------------- | ------- |
| ele  | 元素 dom 节点 | String | Class / id / TagName | TagName |

## 参数配置 options

| 参数         | 说明           | 类型          | 可选值 | 默认值                |
| ------------ | -------------- | ------------- | ------ | --------------------- |
| title        | 标题内容       | String        | --     | --                    |
| content      | 主要内容       | HTML / String | --     | --                    |
| isDefaultBtn | 是否有默认按钮 | Boolean       | --     | true                  |
| defaultBtn   | 按钮描述       | Object        | --     | ok:确定 / cancel:取消 |

## 回调方法 on

| 方法名  | 说明           | 类型     | 默认值 | 回调参数     |
| ------- | -------------- | -------- | ------ | ------------ |
| confirm | 确认完成后回调 | Function | null   | 当前对象 DOM |
| open    | 打开后回调     | Function | null   | 当前对象 DOM |
| close   | 关闭后回调     | Function | null   | 当前对象 DOM |

## 调用方法

| 方法名 | 说明         | 类型     | 默认值 | 参数 |
| ------ | ------------ | -------- | ------ | ---- |
| close  | 外部调用关闭 | Function | --     | --   |
