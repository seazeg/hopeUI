# 基础示例

```javascript
let text_normal = hope.textarea({
    ele: ".text_normal",
    on: {
        blur: function (e) {
            console.log(e);
        },
        focus: function (e) {
            console.log(e);
        },
        input: function (e) {
            console.log(e);
        },
    },
});
```

# 基础属性

| 参数 | 说明          | 类型   | 可选值               | 默认值  |
| ---- | ------------- | ------ | -------------------- | ------- |
| ele  | 元素 dom 节点 | String | Class / id / TagName | TagName |

# 回调方法 on

| 参数  | 说明         | 类型     | 默认值 | 回调参数 |
| ----- | ------------ | -------- | ------ | -------- |
| blur  | 失去焦点回调 | Function | null   | event↓   |
| focus | 获得焦点回调 | Function | null   | event↓   |
| input | 输入回调     | Function | null   | event↓   |

| event 参数 | 说明           | 类型   |
| ---------- | -------------- | ------ |
| targetELe  | dom 对象       | Object |
| value      | 输入的值       | String |
| eventName  | 当前回调事件名 | String |

# 调用方法

| 方法名 | 说明     | 类型     | 默认值 | 参数 |
| ------ | -------- | -------- | ------ | ---- |
| val    | 外部赋值 | Function | --     | --   |
| clear  | 外部清值 | Function | --     | --   |
