## 基础示例

```javascript
hope.tab({
    ele: "#tab1",
    on: {
        change: function(e) {
            console.log(e);
        },
        init: function(e) {
            console.log(e);
        },
    },
});
```

## 基础属性

| 参数 | 说明          | 类型   | 可选值               | 默认值 |
| ---- | ------------- | ------ | -------------------- | ------ |
| ele  | 元素 dom 节点 | String | Class / id / TagName | 必填   |

## 回调方法 on

| 参数   | 说明           | 类型     | 默认值 | 回调参数 |
| ------ | -------------- | -------- | ------ | -------- |
| init   | 初始化回调     | Function | null   | 当前对象 DOM |
| change | 点击选择后回调 | Function | null   | event↓   |

| event 参数       | 说明                      | 类型   |
| ---------------- | ------------------------- | ------ |
| index            | 当前选择的 dom 对象的下标 | Number |
| targetELe        | 当前选择的 dom 对象       | Object |
| targetELeContent | 当前选择值对应的 content  | Object |
| eventName        | 当前回调事件名            | String |

