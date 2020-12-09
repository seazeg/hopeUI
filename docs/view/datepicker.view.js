/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-09 14:59:21
 * @Description  :
 */
export const viewinfo = {
    html: `
    <input name="text" type="text" value="" id="hope-datepicker" class="hopeui-input" placeholder="请选择日期" readonly/>
    `,
    js: `
    hope.datepicker({
        ele: '#hope-datepicker',
        options:{
            format:'yyyy-MM-dd HH:mm:ss',
            type:'datetime'//date：日期，datetime:日期+时间
        },
        on:{
            init: function (e){
                console.log(e);
            },
            change: function (e){
                console.log(e);
            },
            clear: function (e){
                console.log(e);
            }
        }
    })
    `,
};
