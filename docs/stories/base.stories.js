import { storiesOf } from "@storybook/html";
import { useEffect } from "@storybook/client-api";

import "../../dist/hopeui.css";
import "../../dist/hopeui.js";

import { button } from "../view/button.js";
import { checkbox } from "../view/checkbox.js";
import { radio } from "../view/radio.js";
import { selector } from "../view/selector.js";
import { input } from "../view/input.js";
import { textarea } from "../view/textarea.js";
import { form } from "../view/form.js";
import { layer } from "../view/layer.js";

import buttonMD from "../api/button.md";
import checkboxMD from "../api/checkbox.md";
import radioMD from "../api/radio.md";
import selectorMD from "../api/selector.md";
import inputMD from "../api/input.md";
import textareaMD from "../api/textarea.md";
import formMD from "../api/form.md";
import layerMD from "../api/layer.md";

storiesOf("基础控件(Basis)", module)
    .add(
        "按钮(Button)",
        () => {
            return button();
        },
        { notes: buttonMD }
    )
    .add(
        "文本框(Input)",
        () => {
            useEffect(() => {
                let input_normal = hope.input({
                    ele: ".input_normal",
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
            });
            return input();
        },
        { notes: inputMD }
    )
    .add(
        "多行文本框(Textarea)",
        () => {
            useEffect(() => {
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
            });
            return textarea();
        },
        { notes: textareaMD }
    )
    .add(
        "下拉框(Selector)",
        () => {
            useEffect(() => {
                let select_normal = hope.selector({
                    ele: ".select_normal",
                    on: {
                        change: function (e) {
                            console.log(e);
                        },
                        toggle: function (e) {
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
                    },
                });
            });
            return selector();
        },
        { notes: selectorMD }
    )
    .add(
        "多选框(Checkbox)",
        () => {
            useEffect(() => {
                let checkbox_normal = hope.checkbox({
                    ele: ".checkbox_normal",
                    on: {
                        change: function (e) {
                            console.log(e);
                        },
                    },
                });
            });
            return checkbox();
        },
        { notes: checkboxMD }
    )
    .add(
        "单选框(Radio)",
        () => {
            useEffect(() => {
                let radio_normal = hope.radio({
                    ele: ".radio_normal",
                    on: {
                        change: function (e) {
                            console.log(e);
                        },
                    },
                });
            });
            return radio();
        },
        { notes: radioMD }
    );

storiesOf("模块(Module)", module)
    .add(
        "表单(Form)",
        () => {
            useEffect(() => {
                let fm = hope.form({
                    ele: "#form",
                    on: {
                        submit: function (e) {
                            console.log(e);
                        },
                    },
                    controls: {
                        selector: {
                            on: {
                                change: function (e) {
                                    console.log(e);
                                },
                                toggle: function (e) {
                                    console.log(e);
                                },
                            },
                        },
                        checkbox: {
                            on: {
                                change: function (e) {
                                    console.log(e);
                                },
                            },
                        },
                        radio: {
                            on: {
                                change: function (e) {
                                    console.log(e);
                                },
                            },
                        },
                        input: {
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
                        },
                        textarea: {
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
                        },
                    },
                    verify: {
                        //[name]:fn
                        city: function (value) {
                            if (value.length <= 0) {
                                return "请选择一个选项";
                            }
                        },
                        text: function (value) {
                            if (value.length <= 0) {
                                return "文本不能为空";
                            }
                            if (value.length < 5) {
                                return "文本至少得5个字符";
                            }
                            if (!/^[A-Za-z]+$/.test(value)) {
                                return "文本必须是英文";
                            }
                        },
                        school: function (value) {
                            if (value.length <= 0) {
                                return "请选择一个选项";
                            }
                        },
                        LD: function (value) {
                            if (value.length <= 0) {
                                return "请选择一个选项";
                            }
                        },
                        password: function (value) {
                            if (value.length <= 0) {
                                return "文本不能为空";
                            }
                            if (value.length < 6) {
                                return "密码至少输入6个字符";
                            }
                        },
                        task: function (value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                        subject: function (value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                        radio: function (value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                        textarea: function (value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                    },
                });

                document.querySelector("#set").onclick = function () {
                    fm.val({
                        city: {
                            type: "selector",
                            value: "南京",
                        },
                        school: {
                            type: "selector",
                            value: "清华大学",
                        },
                        LD: {
                            type: "selector",
                            value: "天津,乌鲁木齐,青岛",
                        },
                        text: {
                            type: "input",
                            value: "我爱HopeUI",
                        },
                        task: {
                            type: "checkbox",
                            value: "打桩",
                        },
                        textarea: {
                            type: "textarea",
                            value: "我爱北京天安门",
                        },
                        password: {
                            type: "input",
                            value: "999888999",
                        },
                        subject: {
                            type: "checkbox",
                            value: "历史",
                        },
                        radio: {
                            type: "radio",
                            value: "女",
                        },
                    });
                };

                document.querySelector("#set").onclick = function () {
                    fm.val({
                        city: {
                            type: "selector",
                            value: "南京",
                        },
                        school: {
                            type: "selector",
                            value: "清华大学",
                        },
                        LD: {
                            type: "selector",
                            value: "天津,乌鲁木齐,青岛",
                        },
                        text: {
                            type: "input",
                            value: "我爱HopeUI",
                        },
                        task: {
                            type: "checkbox",
                            value: "打桩",
                        },
                        textarea: {
                            type: "textarea",
                            value: "我爱北京天安门",
                        },
                        password: {
                            type: "input",
                            value: "999888999",
                        },
                        subject: {
                            type: "checkbox",
                            value: "历史",
                        },
                        radio: {
                            type: "radio",
                            value: "女",
                        },
                    });
                };

                document.querySelector("#clear").onclick = function () {
                    fm.clear();
                };
            });
            return form();
        },
        { notes: formMD }
    )
    .add(
        "弹层(Layer)",
        () => {
            useEffect(() => {
                document.querySelector("#open1").onclick = function () {
                    hope.layer({
                        options: {
                            title: "fuck标题",
                            content: ` <div style="width:500px;height:400px;padding:20px;">
                                我是弹层内容我是弹层内容我是弹层内容我是弹层内容我是弹层内容
                            </div>`,
                            isDefaultBtn: true,
                            defaultBtn: {
                                ok: "好的",
                                close: "拜拜",
                            },
                        },
                    });
                };

                document.querySelector("#open2").onclick = function () {
                    let ly = hope.layer({
                        options: {
                            title: "卧槽标题",
                            content: ` <div style="padding:20px;">
                            是弹层内容我是弹层我我哦我我我是弹层内容
                            </div>`,
                            isDefaultBtn: true,
                            defaultBtn: {
                                ok: "ok",
                                cancel: "bye~",
                            },
                        },
                        on: {
                            confirm: function (e) {
                                ly.close();
                            },
                        },
                    });
                };
            });

            return layer();
        },
        { notes: layerMD }
    );
