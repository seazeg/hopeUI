import { storiesOf } from "@storybook/html";
import { useEffect } from "@storybook/client-api";

import "../docs.css";
import "../../dist/hopeui.css";
import "../../dist/hopeui.js";

import { grid } from "../view/grid.view.js";
import { button } from "../view/button.view.js";
import { checkbox } from "../view/checkbox.view.js";
import { radio } from "../view/radio.view.js";
import { selector } from "../view/selector.view.js";
import { input } from "../view/input.view.js";
import { pager } from "../view/pager.view.js";
import { textarea } from "../view/textarea.view.js";
import { form } from "../view/form.view.js";
import { layer } from "../view/layer.view.js";
import { tab } from "../view/tab.view.js";
import { animate } from "../view/animate.view.js";

import gridMD from "../api/grid.md";
import buttonMD from "../api/button.md";
import checkboxMD from "../api/checkbox.md";
import radioMD from "../api/radio.md";
import selectorMD from "../api/selector.md";
import inputMD from "../api/input.md";
import pagerMD from "../api/pager.md";
import textareaMD from "../api/textarea.md";
import formMD from "../api/form.md";
import layerMD from "../api/layer.md";
import tabMD from "../api/tab.md";
import animateMD from "../api/animate.md";

storiesOf("基础控件(Basis)", module)
    .add(
        "栅格系统(Grid)",
        () => {
            return grid();
        },
        { notes: gridMD }
    )
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
                        blur: function(e) {
                            console.log(e);
                        },
                        focus: function(e) {
                            console.log(e);
                        },
                        input: function(e) {
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
                        blur: function(e) {
                            console.log(e);
                        },
                        focus: function(e) {
                            console.log(e);
                        },
                        input: function(e) {
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
                        change: function(e) {
                            console.log(e);
                        },
                        toggle: function(e) {
                            console.log(e);
                        },
                    },
                });

                let select_group = hope.selector({
                    ele: ".select_group",
                    on: {
                        change: function(e) {
                            console.log(e);
                        },
                        toggle: function(e) {
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
                        change: function(e) {
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
                        change: function(e) {
                            console.log(e);
                        },
                    },
                });
            });
            return radio();
        },
        { notes: radioMD }
    );

storiesOf("组件(Components)", module)
    .add(
        "表单(Form)",
        () => {
            useEffect(() => {
                let fm = hope.form({
                    ele: "#form",
                    on: {
                        submit: function(e) {
                            console.log(e);
                        },
                    },
                    controls: {
                        selector: {
                            on: {
                                change: function(e) {
                                    console.log(e);
                                },
                                toggle: function(e) {
                                    console.log(e);
                                },
                            },
                        },
                        checkbox: {
                            on: {
                                change: function(e) {
                                    console.log(e);
                                },
                            },
                        },
                        radio: {
                            on: {
                                change: function(e) {
                                    console.log(e);
                                },
                            },
                        },
                        input: {
                            on: {
                                blur: function(e) {
                                    console.log(e);
                                },
                                focus: function(e) {
                                    console.log(e);
                                },
                                input: function(e) {
                                    console.log(e);
                                },
                            },
                        },
                        textarea: {
                            on: {
                                blur: function(e) {
                                    console.log(e);
                                },
                                focus: function(e) {
                                    console.log(e);
                                },
                                input: function(e) {
                                    console.log(e);
                                },
                            },
                        },
                    },
                    verify: {
                        //[name]:fn
                        city: function(value) {
                            if (value.length <= 0) {
                                return "请选择一个选项";
                            }
                        },
                        text: function(value) {
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
                        school: function(value) {
                            if (value.length <= 0) {
                                return "请选择一个选项";
                            }
                        },
                        LD: function(value) {
                            if (value.length <= 0) {
                                return "请选择一个选项";
                            }
                        },
                        password: function(value) {
                            if (value.length <= 0) {
                                return "文本不能为空";
                            }
                            if (value.length < 6) {
                                return "密码至少输入6个字符";
                            }
                        },
                        task: function(value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                        subject: function(value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                        radio: function(value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                        textarea: function(value) {
                            if (value.length <= 0) {
                                return "需要选择至少一个选项";
                            }
                        },
                    },
                });

                document.querySelector("#set").onclick = function() {
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

                document.querySelector("#set").onclick = function() {
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

                document.querySelector("#clear").onclick = function() {
                    fm.clear();
                };
            });
            return form();
        },
        { notes: formMD }
    )
    .add(
        "分页(Pager)",
        () => {
            useEffect(() => {
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
                        url: "http://localhost:3007/assets/page/list1.json",
                        dataType: "jsonp",
                        // type: "get",
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
                                "<p>" +
                                data[i].goodsName +
                                "|" +
                                data[i].goodsStar +
                                "</p>";
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
                //跳转到第10页
                mypager.jump(10);
            });

            return pager();
        },
        { notes: pagerMD }
    )
    .add(
        "弹层(Layer)",
        () => {
            useEffect(() => {
                document.querySelector("#open1").onclick = function() {
                    hope.layer({
                        options: {
                            title: "信息",
                            content:
                                "<div style='padding:20px;text-align: center;'>你好，你已经吃过了</div>",
                            defaultBtn: {
                                ok: "好的",
                                cancel: "拜拜",
                            },
                        },
                    });
                };

                document.querySelector("#open2").onclick = function() {
                    let ly = hope.layer({
                        options: {
                            title: "iframe弹框",
                            content: `<iframe id="frameContent" style="width:1000px;height:600px" src="http://test.haier.com/netcn/" frameborder=0 allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></iframe>`,
                            // content:
                            //     '<iframe style="width:1000px;height:600px" src="http://test.haier.com/masvod/public/2020/06/05/20200605_17283277896_r1_800k.mp4" frameborder=0 allowScriptAccess="sameDomain" type="application/x-shockwave-flash"></iframe>',
                        },
                        on: {
                            confirm: function(e) {
                                ly.close();
                            },
                        },
                    });
                };

                document.querySelector("#open3").onclick = function() {
                    let ly = hope.layer({
                        options: {
                            title: "可拖拽弹框",
                            content:
                                '<img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1596605654660&di=3efa3194330834b16d1edce806f3ace4&imgtype=0&src=http%3A%2F%2Fattach.bbs.miui.com%2Fforum%2F201105%2F17%2F113554rnu40q7nbgnn3lgq.jpg" style="width:800px" />',
                            isMask: false,
                            isDrag: true,
                        },
                        on: {
                            confirm: function(e) {
                                ly.close();
                            },
                        },
                    });
                };
            });

            return layer();
        },
        { notes: layerMD }
    )
    .add(
        "选项卡(tab)",
        () => {
            useEffect(() => {
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

                hope.tab({
                    ele: "#tab2",
                    options: {
                        slideSwitch: true,
                    }
                });

                hope.tab({
                    ele: "#tab3",
                });
            });
            return tab();
        },
        { notes: tabMD }
    )
    .add(
        "动画(animate)",
        () => {
            useEffect(() => {
                function hasClass(ele, cls) {
                    return new RegExp("(\\s|^)" + cls + "(\\s|$)").test(
                        ele.className
                    );
                }
                function addClass(ele, cls) {
                    if (!hasClass(ele, cls)) {
                        if (ele.className) {
                            ele.className += " " + cls;
                        } else {
                            ele.className += cls;
                        }
                    }
                }

                function removeClass(ele, cls) {
                    if (hasClass(ele, cls)) {
                        ele.className = ele.className.replace(
                            new RegExp("(\\s|^)" + cls + "(\\s|$)"),
                            ""
                        );
                    }
                }

                let ele = document.querySelectorAll(".hopeui-anim");
                Array.from(ele).forEach(function(item) {
                    item.onclick = function(e) {
                        let dataAnim = item.getAttribute("data-anim");
                        addClass(item, dataAnim);
                        let time = 500;
                        if (dataAnim == "hopeui-anim-rotate") {
                            time = 1000;
                        }
                        setTimeout(function() {
                            removeClass(item, dataAnim);
                        }, time);
                    };
                });
            });
            return animate();
        },
        { notes: animateMD }
    );
