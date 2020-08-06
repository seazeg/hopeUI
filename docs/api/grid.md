## 栅格系统

<br>
#### 1.通用示例

```html
<div class="hopeui-row">
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            33%
        </div>
    </div>
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            33%
        </div>
    </div>
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg3">
            33%
        </div>
    </div>
</div>
<div class="hopeui-row">
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            1/12
        </div>
    </div>
    <div class="hopeui-col-xl-1-12 hopeui-col-md-1-12 hopeui-col-xs-1-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            1/12
        </div>
    </div>
</div>
```

#### 2.流式

```html
<div class="hopeui-row">
    <div class="hopeui-col-xl-12-12 hopeui-col-md-6-12 hopeui-col-xs-3-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            默认：12/12 平板：6/12 移动：3/12
        </div>
    </div>
    <div class="hopeui-col-xl-7-12 hopeui-col-md-6-12 hopeui-col-xs-9-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            默认：7/12 平板：6/12 移动：9/12
        </div>
    </div>
    <div class="hopeui-col-xl-5-12 hopeui-col-md-6-12 hopeui-col-xs-9-12">
        <div class="docs-grid-demo docs-grid-demo-bg3">
            默认：5/12 平板：6/12 移动：9/12
        </div>
    </div>
    <div class="hopeui-col-xl-12-12 hopeui-col-md-6-12 hopeui-col-xs-3-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            默认：5/12 平板：6/12 移动：9/12
        </div>
    </div>
</div>
```

#### 3.列间距

```html
<div class="hopeui-row hopeui-col-space2">
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            33%
        </div>
    </div>
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            33%
        </div>
    </div>
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg3">
            33%
        </div>
    </div>
</div>
```

#### 4.偏移量

```html
<div class="hopeui-row">
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            4/12
        </div>
    </div>
    <div
        class="hopeui-col-xl-4-12 hopeui-col-xl-offset1 hopeui-col-md-4-12 hopeui-col-xs-4-12"
    >
        <div class="docs-grid-demo docs-grid-demo-bg3">
            偏移1列
        </div>
    </div>
</div>
<div class="hopeui-row">
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            4/12
        </div>
    </div>
    <div
        class="hopeui-col-xl-4-12 hopeui-col-xl-offset2 hopeui-col-md-4-12 hopeui-col-xs-4-12"
    >
        <div class="docs-grid-demo docs-grid-demo-bg3">
            偏移2列
        </div>
    </div>
</div>
<div class="hopeui-row">
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            4/12
        </div>
    </div>
    <div
        class="hopeui-col-xl-4-12 hopeui-col-xl-offset3 hopeui-col-md-4-12 hopeui-col-xs-4-12"
    >
        <div class="docs-grid-demo docs-grid-demo-bg3">
            偏移3列
        </div>
    </div>
</div>
<div class="hopeui-row">
    <div class="hopeui-col-xl-4-12 hopeui-col-md-4-12 hopeui-col-xs-4-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            4/12
        </div>
    </div>
    <div
        class="hopeui-col-xl-4-12 hopeui-col-xl-offset4 hopeui-col-md-4-12 hopeui-col-xs-4-12"
    >
        <div class="docs-grid-demo docs-grid-demo-bg3">
            偏移4列
        </div>
    </div>
</div>
```

#### 5.居中显示

```html
<div class="hopeui-row hopeui-col-space2 hopeui-col-center">
    <div
        class="hopeui-col-xl-5-12 hopeui-col-md-5-12 hopeui-col-xs-5-12 hopeui-col-center"
    >
        <div class="docs-grid-demo docs-grid-demo-bg1">
            5/12
        </div>
    </div>
</div>
```

#### 6.栅格嵌套

```html
<div class="hopeui-row">
    <div class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12">
        <div class="docs-grid-demo docs-grid-demo-bg1">
            <div class="hopeui-row" style="padding: 10px;">
                <div
                    class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                >
                    <div class="docs-grid-demo docs-grid-demo-bg2">
                        50%
                    </div>
                </div>
                <div
                    class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                >
                    <div class="docs-grid-demo docs-grid-demo-bg2">
                        50%
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12">
        <div class="docs-grid-demo docs-grid-demo-bg2">
            <div class="hopeui-row" style="padding: 10px;">
                <div
                    class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                >
                    <div class="docs-grid-demo docs-grid-demo-bg1">
                        50%
                    </div>
                </div>
                <div
                    class="hopeui-col-xl-6-12 hopeui-col-md-6-12 hopeui-col-xs-6-12"
                >
                    <div class="docs-grid-demo docs-grid-demo-bg1">
                        50%
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
```

## 栅格说明

> 1.采用 hopeui-row 来定义行，如：<div class="hopeui-row"></div>
>
> 2.采用类似 hopeui-col-xl-\* 这样的预设类来定义一组列（column），且放在行（row）内。其中：
>
> -   变量 xl 代表的是不同分辨率下的标记（可选值见下文）
> -   变量\* 代表的是该列所占用的 12 等分数（如 6/12,hopeui-col-xl-1-12），可选值为 1 到 12
> -   如果多个列的“等分数值”总和等于 12，则刚好满行排列。如果大于 12，多余的列将自动另起一行
>
> 3.可对列追加类似 hopeui-col-space1、 hopeui-col-xl-offset1 这样的预设类来定义列的间距和偏移量。
>
> 4.最后，在列（column）元素中放入你自己的任意元素填充内容，完成布局。

## 通用 class 说明

| class 名称          | 说明               | 值范围        |
| ------------------- | ------------------ | ------------- |
| hopeui-col-xl-\*    | 默认分辨率栅格类   | 1-12 至 12-12 |
| hopeui-col-md-\*    | 平板分辨率栅格类   | 1-12 至 12-12 |
| hopeui-col-xs-\*    | 移动端分辨率栅格类 | 1-12 至 12-12 |
| hopeui-col-space\*  | 列间距             | 1-10          |
| hopeui-col-offset\* | 偏移量             | 1-12          |
| hopeui-hide         | 强制隐藏           | --            |
| hopeui-show         | 强制显示           | --            |
