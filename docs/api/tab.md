## 基础示例

#### html 代码

```html
<div class="hopeui-tab" id="tab1">
    <div class="hopeui-tab-title">
        <ul>
            <li class="hopeui-tab-this">金牌大牛</li>
            <li>银牌老牛</li>
            <li>铜牌小牛</li>
            <li>铁牌奶牛</li>
            <li>铝牌屁牛</li>
        </ul>
    </div>
    <div class="hopeui-tab-content">
        <div class="hopeui-tab-inner">
            <div class="hopeui-tab-item">内容1</div>
            <div class="hopeui-tab-item">内容2</div>
            <div class="hopeui-tab-item">内容3</div>
            <div class="hopeui-tab-item">内容4</div>
            <div class="hopeui-tab-item">内容5</div>
        </div>
    </div>
</div>

<div class="hopeui-tab hopeui-tab-simple" id="tab2">
    <div class="hopeui-tab-title">
        <ul>
            <li class="hopeui-tab-this">金牌大牛</li>
            <li>银牌老牛</li>
            <li>铜牌小牛</li>
            <li>铁牌奶牛</li>
            <li>铝牌屁牛</li>
        </ul>
    </div>
    <div class="hopeui-tab-content">
        <div class="hopeui-tab-inner">
            <div class="hopeui-tab-item">内容1</div>
            <div class="hopeui-tab-item">内容2</div>
            <div class="hopeui-tab-item">内容3</div>
            <div class="hopeui-tab-item">内容4</div>
            <div class="hopeui-tab-item">内容5</div>
        </div>
    </div>
</div>

<div class="hopeui-tab hopeui-tab-card" id="tab3">
    <div class="hopeui-tab-title">
        <ul>
            <li class="hopeui-tab-this">金牌大牛</li>
            <li>银牌老牛</li>
            <li>铜牌小牛</li>
            <li>铁牌奶牛</li>
            <li>铝牌屁牛</li>
        </ul>
    </div>
    <div class="hopeui-tab-content">
        <div class="hopeui-tab-inner">
            <div class="hopeui-tab-item">内容1</div>
            <div class="hopeui-tab-item">内容2</div>
            <div class="hopeui-tab-item">内容3</div>
            <div class="hopeui-tab-item">内容4</div>
            <div class="hopeui-tab-item">内容5</div>
        </div>
    </div>
</div>
```

#### js 代码

```javascript
hope.tab({
    ele: "#tab2",
    options: {
        slideSwitch: true,
    },
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

| 参数   | 说明           | 类型     | 默认值 | 回调参数     |
| ------ | -------------- | -------- | ------ | ------------ |
| init   | 初始化回调     | Function | null   | 当前对象 DOM |
| change | 点击选择后回调 | Function | null   | event↓       |

| event 参数       | 说明                      | 类型   |
| ---------------- | ------------------------- | ------ |
| index            | 当前选择的 dom 对象的下标 | Number |
| targetELe        | 当前选择的 dom 对象       | Object |
| targetELeContent | 当前选择值对应的 content  | Object |
| eventName        | 当前回调事件名            | String |

| class 名称        | 说明     | 值范围 |
| ----------------- | -------- | ------ |
| hopeui-tab-simple | 简洁模式 | -      |
| hopeui-tab-card   | 卡片模式 | -      |
