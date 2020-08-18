/*
 * @Author       : Evan.G
 * @Date         : 2020-08-18 16:04:09
 * @LastEditTime : 2020-08-18 16:05:18
 * @Description  : is类
 */
module.exports.is = {
    phone() {
        return /Android|webOS|iPhone|iPod|BlackBerry/i.test(
            window.navigator.userAgent
        );
    },
};
