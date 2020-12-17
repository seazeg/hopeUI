/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-17 15:31:32
 * @Description  :
 */
export const viewinfo = {
    html: `
<span class="hope-numup-obj" hopeui-numup-num="2345021800" hopeui-numup-time="2000"
hopeui-numup-speed="50">0</span>
<span class="hope-numup-obj" hopeui-numup-num="234500" hopeui-numup-time="2000"
hopeui-numup-speed="50">0</span>
<span class="hope-numup-obj" hopeui-numup-num="21800" hopeui-numup-time="2000"
hopeui-numup-speed="50">0</span>
    `,
    js: `
hope.numup({
    ele: ".hope-numup-obj",
    // options: {  //可选
    //     num: 2345021800
    //     time: 2000,
    //     speed: 50,
    // },
    on: {
        end: function (e) {
            console.log('完成',e);
        }
    }
})
    `,
};