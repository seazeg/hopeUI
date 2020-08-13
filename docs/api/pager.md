## 基础示例

#### html 代码

```html
<div id="pager"></div>
```

#### js 代码

```javascript
var mypager = hope.pager({
    ele: "#pager",
    options: {
        omit: 5, //最多保留多少按钮,必须奇数
        prevName: "prev",
        nextName: "next",
        hideNum: true,
        pageMapping: "pageNo", //当前页码字段的映射，默认pageNo
        extend: true,
    },
    params: {
        url: "/assets/page/list1.json",
        dataType: "json",
        type: "get",
        data: {
            pageNo: 1,
            pageSize: 20,
        },
    },
    reader: function(res) {
        var data = res.data;
        var template = "";
        for (var i = 0; i < data.length; i++) {
            template +=
                "<p>" + data[i].goodsName + "|" + data[i].goodsStar + "</p>";
        }
        $("#pagelist").html(template);
        return {
            pageNo: res.pageNo,
            pageSize: res.pageSize,
            totalNumber: res.totalNumber,
        };
    },
    on: {
        jumpOver: function(e) {
            console.log(e);
        },
    },
});
```

## 基础属性

| 参数 | 说明          | 类型   | 可选值               | 默认值  |
| ---- | ------------- | ------ | -------------------- | ------- |
| ele  | 元素 dom 节点 | String | Class / id / TagName | TagName |

## 配置 options

| 参数        | 说明                | 类型    | 可选值   | 默认值 |
| ----------- | ------------------- | ------- | -------- | ------ |
| omit        | 保留按钮数,必须奇数 | Number  | 1,3,5 .. | 5      |
| prevName    | 上翻页命名定义      | String  | --       | 上一页 |
| nextName    | 下翻页命名定义      | String  | --       | 下一页 |
| hideNum     | 隐藏数字按钮        | Boolean | --       | false  |
| pageMapping | 当前页字段映射      | String  | --       | pageNo |
| extend      | 完整扩展            | Boolean | --       | false  |

## http请求参数 params

参考 jquery.ajax 参数配置列表

## 初始化函数 reader

回调值为第一次请求后的返回 json 数据，在此区域对列表进行拼接赋值追加等动态操作，必须要有 return 一个参数对象

```javascript
return {
    pageNo: res.pageNo,
    pageSize: res.pageSize,
    totalNumber: res.totalNumber,
};
```

## 回调方法 on

| 参数     | 说明       | 类型     | 默认值 | 回调参数 |
| -------- | ---------- | -------- | ------ | -------- |
| jumpOver | 跳转后回调 | Function | null   | event↓   |

| event 参数 | 说明     | 类型   |
| ---------- | -------- | ------ |
| targetELe  | dom 对象 | Object |
| pageNo     | 页码     | String |
| type       | 点击类型 | String |
| event      | 事件类型 | String |

## 调用方法

| 方法名 | 说明         | 类型     | 默认值 | 参数 |
| ------ | ------------ | -------- | ------ | ---- |
| jump   | 外部跳转方法 | Function | --     | 页码 |
