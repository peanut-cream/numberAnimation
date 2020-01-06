"use strict";
/*方法说明
*@method fmoney 保留两位小数
*@for 所属类名
*@param {Number} s  需要保留的数据
*@param {Number} n  保留几位小数，0-20之间
*@return {string} 返回数据
*/
function fmoney(s, n) {
    if (n === void 0) { n = 2; }
    s = s || 0;
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    var l = s.split('.')[0].split('').reverse(), r = s.split('.')[1];
    var t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
}
;
function numberAnimation(option, target) {
    option = option || {};
    var $this = document.getElementById(target);
    if (!$this) {
        alert("未找到该结构！");
        return;
    }
    var time = option.time || 0; //总耗时
    var finalNum = option.finalNum || 0; //最终的数据
    var stepTime = option.stepTime || 100; //调速器，改变stepTime，可以改变数字改变的速率
    var digits = option.digits || 2; //默认开始数据几位数
    var temp = String(Math.pow(10, digits)).replace("1", '');
    var l = temp.split("").reverse();
    var t = '';
    for (var i = 0; i < l.length; i++) {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    $this.innerHTML = t.split('').reverse().join('') + '.00';
    var step = finalNum / (time / stepTime);
    var count = 0; //计时器
    var timer = setInterval(function () {
        count = Number(count) + step;
        if (count >= finalNum) {
            clearInterval(timer);
            count = finalNum;
        }
        if ($this) {
            $this.innerHTML = fmoney(count);
        }
    }, 30);
}
var btn = document.querySelector("button");
if (btn) {
    btn.addEventListener("click", function () {
        numberAnimation({ time: 1500, finalNum: 382671.89, stepTime: 50, digits: 5 }, 'time');
    });
}
