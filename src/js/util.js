Date.prototype.format = function(fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份
        "d+": this.getDate(), //日
        "h+": this.getHours(), //小时
        "m+": this.getMinutes(), //分
        "s+": this.getSeconds(), //秒
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
        "S": this.getMilliseconds() //毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp("(" + k + ")").test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
        }
    }
    return fmt;
};

//产生一个hash值，只有数字，规则和java的hashcode规则相同

//获取hashcode
export function gethashcode() {
    function hashCode(str) {
        var h = 0;
        var len = str.length;
        var t = 2147483648;
        for (var i = 0; i < len; i++) {
            h = 31 * h + str.charCodeAt(i);
            if (h > 2147483647) h %= t; //java int溢出则取模
        }
        return h;
    }

    function randomWord(randomFlag, min, max) {
        var str = "",
            range = min,
            arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
        // 随机产生
        if (randomFlag) {
            range = Math.round(Math.random() * (max - min)) + min;
        }
        for (var i = 0; i < range; i++) {
            var pos = Math.round(Math.random() * (arr.length - 1));
            str += arr[pos];
        }
        return str;
    }
    var timestamp = (new Date()).valueOf();
    var myRandom = randomWord(false, 6);
    var hashcode = hashCode(myRandom + timestamp.toString());
    return hashcode;
}
export default function timeFormate(dateTime, formate) {
    let Y = new Date(dateTime).getFullYear();
    let M = (new Date(dateTime).getMonth() + 1) < 10 ? ('0' + (new Date(dateTime).getMonth() + 1)) : (new Date(dateTime).getMonth() +
        1);
    let D = new Date(dateTime).getDate() < 10 ? ('0' + new Date(dateTime).getDate()) : new Date(dateTime).getDate();
    let H = new Date(dateTime).getHours() < 10 ? ('0' + new Date(dateTime).getHours()) : new Date(dateTime).getHours();
    let Min = new Date(dateTime).getMinutes() < 10 ? ('0' + new Date(dateTime).getMinutes()) : new Date(dateTime).getMinutes();
    let S = new Date(dateTime).getSeconds() < 10 ? ('0' + new Date(dateTime).getSeconds()) : new Date(dateTime).getSeconds();

}