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
interface optionObject { 
    time: number,
    finalNum: number,
    stepTime: number,
    digits:number
}
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