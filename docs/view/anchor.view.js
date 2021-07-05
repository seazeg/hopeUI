/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:25:10
 * @LastEditTime : 2021-07-05 15:49:11
 * @Description  :
 */

export const viewinfo = {
    html: `
    <ul class="nav" id="nav">
        <li hope-anchor-key="1">第一页</li>
        <li hope-anchor-key="2">第二页</li>
        <li hope-anchor-key="3">第三页</li>
        <li hope-anchor-key="4">第四页</li>
        <li hope-anchor-key="5">第五页</li>
    </ul>
    <div class="anchor_module_a" hope-anchor-value="1">
        
    </div>
    <div class="anchor_module_b" hope-anchor-value="2">
        
    </div>
    <div class="anchor_module_c" hope-anchor-value="3">
        
    </div>
    <div class="anchor_module_d" hope-anchor-value="4">
        
    </div>
    <div class="anchor_module_e" hope-anchor-value="5">
        
    </div>
    `,
    js: `
    hope.anchor({
        ele: "#nav",
        options: {
            offset: 50
        },
        on:{
            jumpOver: function (e){
                console.log(e);
            }
        }
    })
    `,
};
