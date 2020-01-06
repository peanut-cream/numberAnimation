先上效果图：
![GIF 2020-1-6 15-58-38.gif](https://upload-images.jianshu.io/upload_images/11146777-1d802e0a8d1be1d2.gif?imageMogr2/auto-orient/strip)

一、首先安装TypeScript，在node上执行npm install -g typescript命令。
二、ts文件需要我们每次编写完成以后都要执行一下命令去编译它，才会生成一个js文件
        因此我们执行tsc -init命令，在项目中生成一个json文件，并对json文件进行修改。
        ![image.png](https://upload-images.jianshu.io/upload_images/11146777-482658d992dd5644.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
三、在scr中创建html文件，引入生成后的文件。
        ![image.png](https://upload-images.jianshu.io/upload_images/11146777-879badf815de3ec6.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)
四、编写ts文件，并进行编译。我们执行tsc -w命令就会自动对我们保存的ts代码进行编译，并根据json文件中的配置进行打包分配。
五、展示TypeScript代码
```js
/*方法说明
*@method fmoney 保留两位小数
*@for 所属类名
*@param {Number} s  需要保留的数据
*@param {Number} n  保留几位小数，0-20之间
*@return {string} 返回数据
*/
function fmoney(s:(number|string), n:number=2):string {
    s = s||0
    n = n > 0 && n <= 20 ? n : 2;
    s = parseFloat((s + '').replace(/[^\d\.-]/g, '')).toFixed(n) + '';
    var l = s.split('.') [0].split('').reverse(),
    r = s.split('.') [1];
    var  t = '';
    for (var i = 0; i < l.length; i++)  {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    return t.split('').reverse().join('') + '.' + r;
};
//接口 关于numberAnimation 函数中第一个变量的声明
interface optionObject { 
    time: number,
    finalNum: number,
    stepTime: number,
    digits:number
}
/*方法说明
*@method numberAnimation 数字自动变化
*@for 所属类名
*@param {Object} option 配置项
option:{
    time:总时间
    finalNum:数字
    stepTime:调速器
    digits:默认开始数据几位数
}
*@return {string} 返回数据
*/

function numberAnimation(option:optionObject,target:string):any{
    option=option||{};
    let $this=document.getElementById(target);
    if (!$this) { 
        alert("未找到该结构！");
        return
    }
    let time=option.time||0;//总耗时
    let finalNum=option.finalNum||0;//最终的数据
    let stepTime=option.stepTime||100;//调速器，改变stepTime，可以改变数字改变的速率
    let digits=option.digits||2;//默认开始数据几位数
    let temp=String(Math.pow(10,digits)).replace("1",'');
    let l=temp.split("").reverse();
    var  t = '';
    for (var i = 0; i < l.length; i++)  {
        t += l[i] + ((i + 1) % 3 == 0 && (i + 1) != l.length ? ',' : '');
    }
    $this.innerHTML=t.split('').reverse().join('') + '.00' ;
    let step=finalNum/(time/stepTime);
    let count=0;//计时器
    let timer=setInterval(()=>{
        count=Number(count)+step;
        if(count>=finalNum){
            clearInterval(timer);
            count=finalNum;
        }
        if ($this) { 
            $this.innerHTML=fmoney(count);
        }
    },30)
}
let btn = document.querySelector("button");
if (btn) { 
    btn.addEventListener("click",()=>{
        numberAnimation({time:1500,finalNum:382671.89,stepTime:50,digits:5},'time');        
    })
}
```
最后编译生成的js文件展示如下
```js
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

```


