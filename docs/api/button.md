# 控件示例

```html
<button type="button" class="hopeui-btn hopeui-btn-primary">
    按钮
</button>
<button type="submit" class="hopeui-btn">
    主要按钮
</button>
```

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
| confirm | 确认完成后回调 | Function | --     | 当前对象 DOM |
| open    | 打开后回调     | Function | --     | 当前对象 DOM |
| close   | 关闭后回调     | Function | --     | 当前对象 DOM |

# 调用方法

| 方法名 | 说明         | 类型     | 默认值 | 参数 |
| ------ | ------------ | -------- | ------ | ---- |
| close  | 外部调用关闭 | Function | --     | --   |
