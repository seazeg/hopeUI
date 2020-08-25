/*
 * @Author       : Evan.G
 * @Date         : 2020-08-04 11:43:06
 * @LastEditTime : 2020-08-25 13:38:43
 * @Description  :
 */
export const viewinfo = {
    html:`
    <div id="scrollbar" class="hopeui-scrollbar">
    <div>1 丽江被抱走3岁男孩已成功解救 476万</div>
    <div>2 特朗普被提名为美国总统候选人 460万</div>
    <div>3 忘带身份证考生700分考入清华 444万</div>
    <div>4 婆婆用树叶做衣服给儿媳村头走秀 413万</div>
    <div>5 北京市政协副主席李伟被查 399万</div>
    <div>6 舒畅为刘亦菲庆生 385万</div>
    <div>7 官方证实博尔特新冠检测阳性 358万</div>
    <div>8 警方透露生父摔死幼童案细节 346万</div>
    <div>9 男生踹伤猥亵女生男子被刑拘 334万</div>
    <div>10 特朗普现身会场民众高喊再来4年 322万</div>
    <div>1 丽江被抱走3岁男孩已成功解救 476万</div>
    <div>2 特朗普被提名为美国总统候选人 460万</div>
    <div>3 忘带身份证考生700分考入清华 444万</div>
    <div>4 婆婆用树叶做衣服给儿媳村头走秀 413万</div>
    <div>5 北京市政协副主席李伟被查 399万</div>
    <div>6 舒畅为刘亦菲庆生 385万</div>
    <div>7 官方证实博尔特新冠检测阳性 358万</div>
    <div>8 警方透露生父摔死幼童案细节 346万</div>
    <div>9 男生踹伤猥亵女生男子被刑拘 334万</div>
    <div>10 特朗普现身会场民众高喊再来4年 322万</div>
    <div>1 丽江被抱走3岁男孩已成功解救 476万</div>
    <div>2 特朗普被提名为美国总统候选人 460万</div>
    <div>3 忘带身份证考生700分考入清华 444万</div>
    <div>4 婆婆用树叶做衣服给儿媳村头走秀 413万</div>
    <div>5 北京市政协副主席李伟被查 399万</div>
    <div>6 舒畅为刘亦菲庆生 385万</div>
    <div>7 官方证实博尔特新冠检测阳性 358万</div>
    <div>8 警方透露生父摔死幼童案细节 346万</div>
    <div>9 男生踹伤猥亵女生男子被刑拘 334万</div>
    <div>10 特朗普现身会场民众高喊再来4年 322万</div>
</div>
    
    `,
    js:`
hope.scrollbar({
    ele: '#scrollbar',
    options:{
        height:200,
    },
    on: {
        init: function () {},
        scroll: function (e) {
            console.log(e.distance);
        }
    }
})`
}