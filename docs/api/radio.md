# 基础示例

```javascript
let radio_normal = hope.radio({
    ele: ".radio_normal",
    on: {
        change: function (e) {
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

| 参数   | 说明           | 类型     | 默认值 | 回调参数 |
| ------ | -------------- | -------- | ------ | -------- |
| change | 状态改变后回调 | Function | null   | event↓   |

| event 参数 | 说明           | 类型    |
| ---------- | -------------- | ------- |
| original   | 原始 dom 对象  | Object  |
| targetEle  | 虚拟 dom 对象  | Object  |
| name       | 组名           | String  |
| value      | 选中的值       | String  |
| status     | 选中状态       | Boolean |
| eventName  | 当前回调事件名 | String  |

# 调用方法

| 方法名 | 说明     | 类型     | 默认值 | 参数 |
| ------ | -------- | -------- | ------ | ---- |
| val    | 外部赋值 | Function | --     | --   |
| clear  | 外部清值 | Function | --     | --   |
