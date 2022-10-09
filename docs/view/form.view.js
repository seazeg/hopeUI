/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2022-10-09 14:59:37
 * @Description  :
 */
export const viewinfo = {
    html: `
<form class="hopeui-form" name="form" action="" id="form">
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">下拉框</label>
        <div class="hopeui-input-block">
            <select name="city" hope-verify="required">
                <option value="">请选择</option>
                <option value="青岛">青岛</option>
                <option value="武汉">武汉</option>
                <option value="乌鲁木齐">乌鲁木齐</option>
                <option value="南京">南京</option>
                <option value="天津">天津</option>
                <option value="郑州">郑州</option>
                <option value="重庆">重庆</option>
                <option value="成都">成都</option>
                <option value="云南">云南</option>
            </select>
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">分组下拉框</label>
        <div class="hopeui-input-block">
            <select name="school" hope-verify="required">
                <option value="">请选择</option>
                <optgroup label="北京">
                    <option value=" 北京大学">北京大学</option>
                    <option value="清华大学">清华大学</option>
                </optgroup>
                <optgroup label="浙江">
                    <option value=" 浙江大学">浙江大学</option>
                </optgroup>
            </select>
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">文本框</label>
        <div class="hopeui-input-block">
            <input name="text" type="text" placeholder="请输入" value="" class="hopeui-input" hope-verify="required" />
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">密码框</label>
        <div class="hopeui-input-block">
            <input name="password" type="password" placeholder="请输入" value="" class="hopeui-input"
                hope-verify="required" />
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">多选框</label>
        <div class="hopeui-input-block">
            <input type="checkbox" name="subject" value="音乐" hope-verify="required" />
            <input type="checkbox" name="subject" value="历史" hope-verify="required" />
            <input type="checkbox" name="subject" value="生物" hope-verify="required" />
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">多选框</label>
        <div class="hopeui-input-block">
            <input type="checkbox" name="task" value="打桩" hope-verify="required" />
            <input type="checkbox" name="task" value="钓鱼"" hope-verify="required" />
            <input type="checkbox" name="task" value="看电视" hope-verify="required" />
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">单选框</label>
        <div class="hopeui-input-block">
            <input type="radio" name="radio" value="男" title="男" hope-verify="required" checked />
            <input type="radio" name="radio" value="女" title="女" hope-verify="required" />
            <input type="radio" name="radio" value="什么玩意" title="什么玩意" hope-verify="required" />
        </div>
    </div>
    <div class="hopeui-form-item">
        <label class="hopeui-form-label">多文本域</label>
        <div class="hopeui-input-block">
            <textarea name="textarea" class="hopeui-textarea" placeholder="请输入内容" hope-verify="required"></textarea>
        </div>
    </div>
    <div class="hopeui-form-item">
        <div class="hopeui-input-block">
            <button type="button" class="hopeui-btn hopeui-btn-primary" id="set">
                赋值
            </button>
            <button type="button" class="hopeui-btn hopeui-btn-primary" id="clear">
                重置
            </button>
            <button type="submit" class="hopeui-btn">
                提交表单
            </button>
        </div>
    </div>
</form>
`,
    js: `
window.fm = hope.form({
    ele: "#form",
    on: {
        submit: function (e) {
            console.log(e);
        },
    },
    controls: {
        //[name]:fn
        city: {
            type: 'select',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "请选择一个选项";
                }
            }
        },
        text: {
            type: 'input',
            options: {},
            on: {
                blur: function (e) {
                    fm.verify({
                        ele:e.targetEle,
                        name:'text',
                        type: 'input',
                        value: e.value,
                    });
                },
                focus: function (e) {
                    console.log(e);
                },
                input: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "文本不能为空";
                }
                if (value.length < 5) {
                    return "文本至少得5个字符";
                }
                if (!/^[A-Za-z]+$/.test(value)) {
                    return "文本必须是英文";
                }
            }
        },
        school: {
            type: 'select',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "请选择一个选项";
                }
            }
        },
        password: {
            type: 'input',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "文本不能为空";
                }
                if (value.length < 6) {
                    return "密码至少输入6个字符";
                }
            }
        },
        task: {
            type: 'checkbox',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "需要选择至少一个选项";
                }
            }
        },
        subject: {
            type: 'checkbox',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "请选择一个选项";
                }
            }
        },
        radio: {
            type: 'radio',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "需要选择至少一个选项";
                }
            }
        },
        textarea: {
            type: 'textarea',
            options: {},
            on: {
                init: function (e) {
                    console.log(e);
                },
                change: function (e) {
                    console.log(e);
                },
                toggle: function (e) {
                    console.log(e);
                },
            },
            verify: function (value) {
                if (value.length <= 0) {
                    return "请输入内容";
                }
            }
        },
    },
});

document.querySelector("#set").onclick = function () {
    fm.val({
        city: "南京",
        school: "北京大学",
        text: "我爱HopeUI",
        task: "打桩,钓鱼",
        textarea: "我爱北京天安门",
        password: "999888999",
        subject: "历史",
        radio: '女'
    });
};

document.querySelector("#clear").onclick = function () {
    fm.clear();
};


`,
};

