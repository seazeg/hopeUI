const hopeu = require("../utils/hopeu.js");
const { is } = require("./is.js");

let Hope_datepicker = function (ele, options, on, plugin) {
    let $ = hopeu;
    let obj = ele;
    let elem_id = $(obj).attr("id");
    let _shown = false;

    let pos = getElementPos(elem_id);

    let top = pos.y;
    let left = pos.x;

    let tz_y, tz_m, tz_d, tz_y_s, tz_y_e;
    let input_y, input_m, input_d;

    let time = ["00", "00", "00"];
    let hourAct = 0,
        minAct = 0,
        secAct = 0;

    let hourBar = null,
        minBar = null,
        secBar = null;

    let settings = Object.assign(
        {
            offTop: $(obj).height() + 3,
            format: "yyyy-MM-dd HH:mm:ss",
            type: "datetime",
        },
        options
    );
    let result = initNowDate(settings.format);
    $(obj).css("cursor", "default");

    let _dateBody = `<div class='hope-datepicker hopeui-anim hopeui-anim-upbit' id='datepicker_${elem_id}'>
            <div class='year-month' id='ym${elem_id}'><span class='y_left left hopeui-icon hopeui-icon-prev'></span><span class='m_left left hopeui-icon hopeui-icon-left'></span>
            <span class='year'>
            <span class='span-year'>2015</span>
            <div class='year-list' id='ylist_${elem_id}'>
            <ul></ul>
            <div class='year-change'>
            <span class='year-left'></span>
            <span class='year-right'></span></div></div></span>
            <span class='month'><span>6月</span>
            <div class='month-list' id='mlist_${elem_id}'>
            <ul><li data-id='1'>一月</li><li data-id='2'>二月</li><li data-id='3'>三月</li><li data-id='4'>四月</li><li data-id='5'>五月</li><li data-id='6'>六月</li><li data-id='7'>七月</li><li data-id='8'>八月</li><li data-id='9'>九月</li><li data-id='10'>十月</li><li data-id='11'>十一</li><li data-id='12'>十二</li></ul></div></span>
            <span class='m_right right hopeui-icon hopeui-icon-right'></span>
            <span class='y_right right hopeui-icon hopeui-icon-next'></span></div>
            <div class='week'><ul><li>日</li><li>一</li><li>二</li><li>三</li><li>四</li><li>五</li><li>六</li></ul></div><div class='day'><ul></ul></div>
            <div class='action'><span class='selectTime ${
                settings.type == "datetime" ? "" : "hopeui-hide"
            }' data-format='${
        settings.format.substring(11) || "HH:mm:ss"
    }'>选择时间</span>
            <button type="button" class='hopeui-btn changeResult'>确定</button>
            <button type="button" class='hopeui-btn clear hopeui-btn-primary'>清空</button>
            <div class='time-list' id='timelist_${elem_id}'>
                <div class='warp'>
                   <div class='hour'><p>时</p><div class='list hopeui-scrollbar'></div></div>
                   <div class='min'><p>分</p><div class='list hopeui-scrollbar'></div></div>
                   <div class='sec'><p>秒</p><div class='list hopeui-scrollbar'></div></div>
                </div>
                <div class='group'>
                <span class="return">返回日期</span>
                <button type="button" class='hopeui-btn changeTime'>确定</button>
                </div>
            </div>
            </div>
        </div>`;

    $(_dateBody).appendTo("body");

    $("#datepicker_" + elem_id).css({
        left: left,
        top: top + settings.offTop,
    });

    // $(obj)
    //     .next("span")
    //     .click(function () {
    //         let pos = getElementPos(elem_id);
    //         let top = pos.y;
    //         let left = pos.x;
    //         $("#datepicker_" + elem_id).css({
    //             left: left,
    //             top: top + settings.offTop,
    //         });

    //         let d = getFocusDate($(obj).val());
    //         tz_m = d.getMonth() + 1;
    //         tz_y = d.getFullYear();
    //         tz_d = d.getDate();

    //         input_m = d.getMonth() + 1;
    //         input_y = d.getFullYear();
    //         input_d = d.getDate();

    //         $("#mlist_" + elem_id)
    //             .prev("span")
    //             .text(tz_m + "月");
    //         $("#ylist_" + elem_id)
    //             .prev("span")
    //             .text(tz_y + "年");

    //         dayListReload();

    //         hideYearmonth(); //隐藏年月选择

    //         if (_shown) {
    //             $("#datepicker_" + elem_id).removeClass("hopeui-show");
    //             _shown = false;

    //             // $(".content").css({
    //             //     height: "",
    //             // });
    //         } else {
    //             $("#datepicker_" + elem_id).addClass("hopeui-show");
    //             _shown = true;

    //             // con_min_hieght = $(".content").height();
    //             // if (top + settings.offTop + 234 - 61 - 60 > con_min_hieght) {
    //             //     $(".content").css({
    //             //         height: top + settings.offTop + 234 - 61 + 10,
    //             //     });
    //             // }
    //         }

    //         // let d = getFocusDate($(obj).val());
    //         $(obj).focus();
    //         $(this).addClass("span-ex").removeClass("span-col");
    //     });

    $(obj).click(function () {
        //点击时获取控件位置
        let pos = getElementPos(elem_id);
        let top = pos.y;
        let left = pos.x;
        $("#datepicker_" + elem_id).css({
            left: left,
            top: top + settings.offTop,
        });

        let d = getFocusDate($(this).val());

        tz_m = d.getMonth() + 1;
        tz_y = d.getFullYear();
        tz_d = d.getDate();

        input_m = d.getMonth() + 1;
        input_y = d.getFullYear();
        input_d = d.getDate();

        $("#mlist_" + elem_id)
            .prev("span")
            .text(tz_m + "月");
        $("#ylist_" + elem_id)
            .prev("span")
            .text(tz_y + "年");

        dayListReload();

        hideYearmonth(); //隐藏年月选择

        if (_shown) {
            $("#datepicker_" + elem_id).removeClass("hopeui-show");
            _shown = false;

            // $(".content").css({
            //     height: "",
            // });

            if (on && on.close) {
                on.close({
                    ele: $(obj).get(0),
                    event: "close",
                });
            }
        } else {
            $("#datepicker_" + elem_id).addClass("hopeui-show");
            _shown = true;

            // con_min_hieght = $(".content").height();
            // if (top + settings.offTop + 234 - 61 - 60 > con_min_hieght) {
            //     $(".content").css({
            //         height: top + settings.offTop + 234 - 61 + 10,
            //     });
            // }

            if (on && on.open) {
                on.open({
                    ele: $(obj).get(0),
                    event: "open",
                });
            }
        }
    });

    $(obj).blur(function () {
        $(obj).next("span").addClass("span-col").removeClass("span-ex");
    });

    //点击月份
    $("#datepicker_" + elem_id)
        .find(".month span")
        .on("click", function () {
            $(this).addClass("active");
            $(this).next(".month-list").hasClass("hopeui-show")
                ? $(this).next(".month-list").removeClass("hopeui-show")
                : $(this).next(".month-list").addClass("hopeui-show");
            autoLayerHeight($("#mlist_" + elem_id), 50);
            $("#ylist_" + elem_id).removeClass("hopeui-show");
            $("#ylist_" + elem_id)
                .prev("span")
                .removeClass("active");
        });

    //选择月
    $("#datepicker_" + elem_id)
        .find(".month li")
        .on("click", function () {
            tz_m = parseInt($(this).attr("data-id"));

            $("#datepicker_" + elem_id)
                .find(".month span")
                .text(tz_m + "月");

            dayListReload();

            $(this).addClass("active").siblings("li").removeClass("active");

            $(this).parents(".month-list").removeClass("hopeui-show");
            $(this).parents(".month-list").prev("span").removeClass("active");
        });

    //点击年
    $("#datepicker_" + elem_id)
        .find(".year .span-year")
        .on("click", function () {
            let c_y = $(this).text();

            tz_y_s = parseInt(c_y.substring(0, 3) + "0");
            tz_y_e = tz_y_s + 11;

            $("#datepicker_" + elem_id + " .year-list li").remove();
            for (tz_y_s; tz_y_s <= tz_y_e; tz_y_s++) {
                let y_a = "";
                parseInt(c_y) == tz_y_s ? (y_a = "active") : (y_a = "");
                $("#datepicker_" + elem_id + " .year-list ul").append(
                    "<li class='" + y_a + "'>" + tz_y_s + "年</li>"
                );
            }

            autoLayerHeight($("#ylist_" + elem_id), 50);
            $(this).addClass("active");
            $(this).next(".year-list").hasClass("hopeui-show")
                ? $(this).next(".year-list").removeClass("hopeui-show")
                : $(this).next(".year-list").addClass("hopeui-show");

            $("#mlist_" + elem_id).removeClass("hopeui-show");
            $("#mlist_" + elem_id)
                .prev("span")
                .removeClass("active");
        });

    //选择年
    $("#datepicker_" + elem_id)
        .find(".year li")
        .on("click", function () {
            tz_y = parseInt($(this).text());

            $(this)
                .parents(".year-list")
                .prev("span")
                .text(tz_y + "年");

            dayListReload();

            $(this).addClass("active").siblings("li").removeClass("active");

            $(this).parents(".year-list").removeClass("hopeui-show");
            $(this).parents(".year-list").prev("span").removeClass("active");
        });

    //切换年
    $("#datepicker_" + elem_id)
        .find(".year-change span")
        .on("click", function () {
            if ($(this).hasClass("year-left")) {
                tz_y_s = tz_y_e - 19;
            } else if ($(this).hasClass("year-right")) {
                tz_y_s = tz_y_e + 1;
            } else {
                return;
            }

            tz_y_e = tz_y_s + 9;
            $("#datepicker_" + elem_id + " .year-list li").remove();
            for (tz_y_s; tz_y_s <= tz_y_e; tz_y_s++) {
                let y_a = "";
                input_y == tz_y_s ? (y_a = "active") : (y_a = "");
                $("#datepicker_" + elem_id + " .year-list ul").append(
                    "<li class='" + y_a + "'>" + tz_y_s + "</li>"
                );
            }
        });

    //减一月
    $("#datepicker_" + elem_id + " .m_left").click(function () {
        tz_m = parseInt(tz_m);
        tz_m--;
        if (tz_m == 0) {
            tz_m = 12;
            tz_y--;
        }

        $("#datepicker_" + elem_id + " .month span").text(tz_m + "月");
        $("#datepicker_" + elem_id + " .year .span-year").text(tz_y + "年");

        dayListReload();
    });

    //加一月
    $("#datepicker_" + elem_id + " .m_right").click(function () {
        tz_m = parseInt(tz_m);
        tz_m = tz_m + 1;
        if (tz_m == 13) {
            tz_m = 1;
            tz_y++;
        }

        $("#datepicker_" + elem_id + " .month span").text(tz_m + "月");
        $("#datepicker_" + elem_id + " .year .span-year").text(tz_y + "年");

        dayListReload();
    });

    //减一年
    $("#datepicker_" + elem_id + " .y_left").click(function () {
        tz_y = parseInt(tz_y);
        tz_y = tz_y - 1;

        $("#datepicker_" + elem_id + " .year .span-year").text(tz_y + "年");

        dayListReload();
    });

    //加一年
    $("#datepicker_" + elem_id + " .y_right").click(function () {
        tz_y = parseInt(tz_y);
        tz_y = tz_y + 1;

        $("#datepicker_" + elem_id + " .year .span-year").text(tz_y + "年");

        dayListReload();
    });

    //选择时间
    $("#datepicker_" + elem_id)
        .find(".action .selectTime")
        .on("click", function () {
            initTimeList(time);
            autoLayerHeight($("#timelist_" + elem_id), 0);
        });

    //确认选择
    $("#datepicker_" + elem_id)
        .find(".action .changeResult")
        .on("click", function () {
            let seperator = settings.format.substring(13, 14) || ":";
            $(this)
                .parents("#datepicker_" + elem_id)
                .removeClass("hopeui-show");
            _shown = false;
            // $(".content").css({
            //     height: "",
            // });

            if (settings.type == "datetime") {
                $(obj).val(result.join(" "));
                time = [
                    result[1].split(seperator)[0],
                    result[1].split(seperator)[1],
                    result[1].split(seperator)[2],
                ];
                hourAct = parseInt(result[1].split(seperator)[0]);
                minAct = parseInt(result[1].split(seperator)[1]);
                secAct = parseInt(result[1].split(seperator)[2]);
            } else {
                $(obj).val(result[0]);
            }

            if (is.ie() <= 9) {
                $(obj).next().removeClass("hopeui-hide");
            }
            $("#datepicker_" + elem_id)
                .find(".selectTime")
                .attr("data-time", time.join(":"))
                .text(time[0] + "时" + time[1] + "分" + time[2] + "秒");

            if (on && on.change) {
                on.change({
                    ele: $(obj).get(0),
                    date: date_sel,
                    event: "change",
                });
            }
        });

    //清空
    $("#datepicker_" + elem_id)
        .find(".action .clear")
        .on("click", function () {
            $(obj).val("");
            $("#datepicker_" + elem_id).removeClass("hopeui-show");
            time = ["00", "00", "00"];
            hourAct = 0;
            minAct = 0;
            secAct = 0;

            $("#datepicker_" + elem_id)
                .find(".selectTime")
                .attr("data-time", time.join(":"))
                .text("选择时间");

            _shown = false;
            if (on && on.clear) {
                on.clear({
                    ele: $(obj).get(0),
                    event: "clear",
                });
            }
        });

    if (on && on.init) {
        on.init({
            ele: $(obj).get(0),
            event: "init",
        });
    }

    //加载天
    function dayListReload() {
        let days = getDaysOfMonth(tz_m, tz_y);
        let prevDays = null,
            nextDays = null;
        if (tz_m - 1 > 0) {
            prevDays = getDaysOfMonth(tz_m - 1, tz_y);
        } else {
            prevDays = getDaysOfMonth(12, tz_y - 1);
        }
        let dayOfWeek = new Date(tz_y + "/" + tz_m + "/01").getDay();
        $("#datepicker_" + elem_id + " .day li").remove();

        for (let pi = prevDays; pi > prevDays - dayOfWeek; pi--) {
            $("#datepicker_" + elem_id + " .day ul").append(
                "<li class='disable-month'>" + pi + "</li>"
            );
        }

        for (let i = 1; i <= days; i++) {
            let a_str = "";
            if (tz_y == input_y && tz_m == input_m && tz_d == i) {
                a_str = "active";
            }
            $("#datepicker_" + elem_id + " .day ul").append(
                "<li data-id=" + i + " class='" + a_str + "'>" + i + "</li>"
            );
        }

        if (
            $("#datepicker_" + elem_id + " .day ul").find("li").length % 7 !=
            0
        ) {
            nextDays =
                7 -
                ($("#datepicker_" + elem_id + " .day ul").find("li").length %
                    7);
            for (let ni = 1; ni <= nextDays; ni++) {
                $("#datepicker_" + elem_id + " .day ul").append(
                    "<li class='disable-month'>" + ni + "</li>"
                );
            }
        }

        autoLayerHeight([$("#mlist_" + elem_id), $("#ylist_" + elem_id)], 50);

        //选择天
        $("#datepicker_" + elem_id)
            .children(".day")
            .find("li")
            .on("click", function () {
                if ($(this).attr("data-id")) {
                    tz_d = parseInt($(this).attr("data-id"));

                    let tz_m_str, tz_d_str;
                    tz_m < 10 ? (tz_m_str = "0" + tz_m) : (tz_m_str = tz_m);
                    tz_d < 10 ? (tz_d_str = "0" + tz_d) : (tz_d_str = tz_d);
                    let date_sel =
                        tz_y +
                        options.format.substring(4, 5) +
                        tz_m_str +
                        options.format.substring(4, 5) +
                        tz_d_str;

                    // $(obj).val(date_sel);
                    $(this).addClass("active").siblings().removeClass("active");

                    result[0] = date_sel;
                }
            });
    }

    //获取每个月多少天
    function getDaysOfMonth(m, y) {
        switch (m) {
            case 1:
                return 31;
            case 2:
                if (y % 4 == 0) {
                    return 29;
                } else {
                    return 28;
                }
            case 3:
                return 31;
            case 4:
                return 30;
            case 5:
                return 31;
            case 6:
                return 30;
            case 7:
                return 31;
            case 8:
                return 31;
            case 9:
                return 30;
            case 10:
                return 31;
            case 11:
                return 30;
            case 12:
                return 31;
        }
    }

    //隐藏年、月显示
    function hideYearmonth() {
        $("#ylist_" + elem_id).removeClass("hopeui-show");
        $("#ylist_" + elem_id)
            .prev("span")
            .removeClass("active");

        $("#mlist_" + elem_id).removeClass("hopeui-show");
        $("#mlist_" + elem_id)
            .prev("span")
            .removeClass("active");
    }

    //获取选中时间
    function getFocusDate(date) {
        if (date == "") {
            return new Date();
        } else {
            try {
                if (is.isIE() <= 11) {
                    return new Date(date.replace(/-/gi, "/"));
                } else {
                    return new Date(date);
                }
            } catch (e) {
                return new Date();
            }
        }
    }

    // 点击div外面关闭列表
    $(document).on("click", function (event) {
        let e = event || window.event;
        let elem = e.srcElement || e.target;

        if ($(elem).parents("#datepicker_" + elem_id).length != 0) {
            return;
        } else if (elem.id != $(obj).attr("id")) {
            $("#timelist_" + elem_id).removeClass("hopeui-show");
            $("#datepicker_" + elem_id)
                .find(".year-list")
                .removeClass("hopeui-show");
            $("#datepicker_" + elem_id)
                .find(".month-list")
                .removeClass("hopeui-show");

            time = ["00", "00", "00"];
            hourAct = 0;
            minAct = 0;
            secAct = 0;

            if (_shown) {
                _shown = false;
                $("#datepicker_" + elem_id).removeClass("hopeui-show");
                return;
            }
        }
    });

    //弹层自动高度
    function autoLayerHeight(obj, offsetTop) {
        let mainH = $("#datepicker_" + elem_id).height() - offsetTop - 1;
        if (obj instanceof Array) {
            for (let o of obj) {
                o.height(mainH);
            }
        } else {
            obj.height(mainH);
        }
    }

    //时间列表初始化
    function initTimeList(time) {
        if ((!hourBar && !minBar && !secBar) || time.join("") == "000000") {
            let hourlist = "",
                minlist = "",
                seclist = "";
            let hourObj = $("#timelist_" + elem_id)
                    .find(".hour")
                    .children(".list"),
                minObj = $("#timelist_" + elem_id)
                    .find(".min")
                    .children(".list"),
                secObj = $("#timelist_" + elem_id)
                    .find(".sec")
                    .children(".list");
            for (let hi = 0; hi <= 23; hi++) {
                if (hi.toString().length <= 1) {
                    if (hi == hourAct) {
                        hourlist += `<div class="item active" data-id="${hi}">0${hi}</div>`;
                    } else {
                        hourlist += `<div class="item" data-id="${hi}">0${hi}</div>`;
                    }
                } else {
                    if (hi == hourAct) {
                        hourlist += `<div class="item active" data-id="${hi}">${hi}</div>`;
                    } else {
                        hourlist += `<div class="item" data-id="${hi}">${hi}</div>`;
                    }
                }
            }

            for (let mi = 0; mi <= 59; mi++) {
                if (mi.toString().length <= 1) {
                    if (mi == minAct) {
                        minlist += `<div class="item active" data-id="${mi}">0${mi}</div>`;
                    } else {
                        minlist += `<div class="item" data-id="${mi}">0${mi}</div>`;
                    }
                } else {
                    if (mi == minAct) {
                        minlist += `<div class="item active" data-id="${mi}">${mi}</div>`;
                    } else {
                        minlist += `<div class="item" data-id="${mi}">${mi}</div>`;
                    }
                }
            }

            for (let si = 0; si <= 59; si++) {
                if (si.toString().length <= 1) {
                    if (si == secAct) {
                        seclist += `<div class="item active" data-id="${si}">0${si}</div>`;
                    } else {
                        seclist += `<div class="item" data-id="${si}">0${si}</div>`;
                    }
                } else {
                    if (si == secAct) {
                        seclist += `<div class="item active" data-id="${si}">${si}</div>`;
                    } else {
                        seclist += `<div class="item" data-id="${si}">${si}</div>`;
                    }
                }
            }

            hourObj.html(hourlist);
            minObj.html(minlist);
            secObj.html(seclist);

            $("#timelist_" + elem_id).addClass("hopeui-show");

            hourBar = plugin.scrollbarHandler({
                ele: $("#timelist_" + elem_id)
                    .find(".hour")
                    .children(".list"),
                options: {
                    nobar: true,
                },
                on: {
                    scroll: function (e) {
                        console.log(e);
                    },
                    init: function () {
                        hourObj.find(".item").on("click", function () {
                            time[0] = $(this).text();
                            $(this)
                                .addClass("active")
                                .siblings()
                                .removeClass("active");
                            hourAct = +$(this).attr("data-id");
                        });
                    },
                },
            });

            minBar = plugin.scrollbarHandler({
                ele: $("#timelist_" + elem_id)
                    .find(".min")
                    .children(".list"),
                options: {
                    nobar: true,
                },
                on: {
                    init: function () {
                        minObj.find(".item").on("click", function () {
                            time[1] = $(this).text();
                            $(this)
                                .addClass("active")
                                .siblings()
                                .removeClass("active");
                            minAct = +$(this).attr("data-id");
                        });
                    },
                },
            });

            secBar = plugin.scrollbarHandler({
                ele: $("#timelist_" + elem_id)
                    .find(".sec")
                    .children(".list"),
                options: {
                    nobar: true,
                },
                on: {
                    init: function () {
                        secObj.find(".item").on("click", function () {
                            time[2] = $(this).text();
                            $(this)
                                .addClass("active")
                                .siblings()
                                .removeClass("active");
                            secAct = +$(this).attr("data-id");
                        });
                    },
                },
            });

            $("#timelist_" + elem_id)
                .find(".changeTime")
                .on("click", function () {
                    $("#datepicker_" + elem_id)
                        .find(".selectTime")
                        .attr("data-time", time.join(":"))
                        .text(time[0] + "时" + time[1] + "分" + time[2] + "秒");
                    $("#timelist_" + elem_id).removeClass("hopeui-show");
                    result[1] = time.join(":");
                });
            $("#timelist_" + elem_id)
                .find(".return")
                .on("click", function () {
                    $("#timelist_" + elem_id).removeClass("hopeui-show");
                });
        } else {
            $("#timelist_" + elem_id).addClass("hopeui-show");
        }
    }

    //返回一个元素相对于整个文档左上角的坐标
    function getElementPos(elementId) {
        let ua = navigator.userAgent.toLowerCase();
        let isOpera = ua.indexOf("opera") != -1;
        let isIE = ua.indexOf("msie") != -1 && !isOpera; // not opera spoof
        let el = document.getElementById(elementId);
        if (el.parentNode === null || el.style.display == "none") {
            return false;
        }
        let parent = null;
        let pos = [];
        let box;
        if (el.getBoundingClientRect) {
            //IE
            box = el.getBoundingClientRect();
            let scrollTop = Math.max(
                document.documentElement.scrollTop,
                document.body.scrollTop
            );
            let scrollLeft = Math.max(
                document.documentElement.scrollLeft,
                document.body.scrollLeft
            );
            return {
                x: box.left + scrollLeft,
                y: box.top + scrollTop,
            };
        } else if (document.getBoxObjectFor) {
            // gecko
            box = document.getBoxObjectFor(el);
            let borderLeft = el.style.borderLeftWidth
                ? parseInt(el.style.borderLeftWidth)
                : 0;
            let borderTop = el.style.borderTopWidth
                ? parseInt(el.style.borderTopWidth)
                : 0;
            pos = [box.x - borderLeft, box.y - borderTop];
        } // safari & opera
        else {
            pos = [el.offsetLeft, el.offsetTop];
            parent = el.offsetParent;
            if (parent != el) {
                while (parent) {
                    pos[0] += parent.offsetLeft;
                    pos[1] += parent.offsetTop;
                    parent = parent.offsetParent;
                }
            }
            if (
                ua.indexOf("opera") != -1 ||
                (ua.indexOf("safari") != -1 && el.style.position == "absolute")
            ) {
                pos[0] -= document.body.offsetLeft;
                pos[1] -= document.body.offsetTop;
            }
        }
        if (el.parentNode) {
            parent = el.parentNode;
        } else {
            parent = null;
        }
        while (parent && parent.tagName != "BODY" && parent.tagName != "HTML") {
            // account for any scrolled ancestors
            pos[0] -= parent.scrollLeft;
            pos[1] -= parent.scrollTop;
            if (parent.parentNode) {
                parent = parent.parentNode;
            } else {
                parent = null;
            }
        }
        return {
            x: pos[0],
            y: pos[1],
        };
    }
};

function initNowDate(format) {
    let date = new Date();
    let seperator1 = format.substring(4, 5) || "-";
    let seperator2 = format.substring(13, 14) || ":";
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let strDate = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let sec = date.getSeconds();
    if (month <= 9) {
        month = "0" + month;
    }
    if (strDate <= 9) {
        strDate = "0" + strDate;
    }
    if (hour <= 9) {
        hour = "0" + hour;
    }
    if (min <= 9) {
        min = "0" + min;
    }
    if (sec <= 9) {
        sec = "0" + sec;
    }

    return [
        year + seperator1 + month + seperator1 + strDate,
        // hour + seperator2 + min + seperator2 + sec,
        "00" + seperator2 + "00" + seperator2 + "00",
    ];
}

module.exports = Hope_datepicker;
