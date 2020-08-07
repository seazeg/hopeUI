## 基础示例

```javascript
let select_normal = hope.selector({
    ele: ".select_normal",
    on: {
        change: function (e) {
            console.log(e);
        },
        toggle: function (e) {
            console.log(e);
        },
        close: function (e) {
            console.log(e);
        },
    },
});

let select_group = hope.selector({
    ele: ".select_group",
    on: {
        change: function (e) {
            console.log(e);
        },
        toggle: function (e) {
            console.log(e);
        },
        close: function (e) {
            console.log(e);
        },
    },
});
```

## 基础属性

| 参数 | 说明          | 类型   | 可选值               | 默认值  |
| ---- | ------------- | ------ | -------------------- | ------- |
| ele  | 元素 dom 节点 | String | Class / id / TagName | TagName |

## 回调方法 on

| 参数   | 说明                   | 类型     | 默认值 | 回调参数 |
| ------ | ---------------------- | -------- | ------ | -------- |
| init   | 初始化回调     | Function | null   | 当前对象 DOM |
| change | 选择完成后回调         | Function | null   | event↓   |
| toggle | 下拉切换回调           | Function | null   | --   |
| close  | 下拉框区域外关闭后回调 | Function | null   | --   |

| event 参数        | 说明                 | 类型   |
| ----------------- | -------------------- | ------ |
| originalParentEle | select 原始 dom 对象 | Object |
| virtualParentEle  | select 虚拟 dom 对象 | Object |
| targetEle         | 当前选中选项 dom     | Object |
| label             | 选中的描述值         | String |
| value             | 选中的实际值         | String |
| name              | select 组名          | String |
| group             | 选项组内标号         | String |
| groupSort         | 选项组内自身编号     | String |
| eventName         | 当前回调事件名       | String |

## 调用方法

| 方法名 | 说明     | 类型     | 默认值 | 参数 |
| ------ | -------- | -------- | ------ | ---- |
| val    | 外部赋值 | Function | --     | --   |
| clear  | 外部清值 | Function | --     | --   |
