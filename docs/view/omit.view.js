/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-12-21 11:19:25
 * @Description  :
 */
export const viewinfo = {
    html: `
<p class="hope-omit-run" hope-omit-xl="5" hope-omit-md="3" hope-omit-xs="1">
7月16日上午，谷歌（Google）联合凯度（Kantar），在线发布了“2020年BrandZ中国全球化品牌50强”：华为、联想、阿里巴巴分列前三；海尔排名第六，稳居行业第一。值得一提的是：该榜单中，“海尔”全球品牌力的评估是基于海尔集团子公司海尔智家的全球业务。BrandZ指出：在2019年经济条件不景气的情况下，海尔致力于开展产品创新、零售转型、全球运营和多品牌运营，实现持续增长。今年，中国家电品类整体品牌力下降8%，而海尔品牌力则逆势上扬8%，表现突出。海信、TCL、格力分别位列第7、22、39位。今年是主办方连续第四年发榜。它将BrandZ全球最大的以消费者为中心的品牌资产知识和洞察数据库，与Google消费者调查问卷和搜索数据相结合，成为衡量中国品牌国际化影响力的一把“标尺”。
</p>
    `,
    js: `
hope.omit({
    ele: ".hope-omit-run",
    options:{
        // breakpoint: {
        //     'xl': {
        //         point: 1200,
        //         row: 4
        //     },
        //     'xs': {
        //         point: 360,
        //         row: 1
        //     }
        // }
    },
    on: {
        resize: function (e) {
            console.log(e);
        }
    }
})
    `,
};
