//Js内置排序函数
var a = [];
for (var i = 0; i < 10000000; ++i) {
    a[i] = Math.floor((Math.random() * 100) + 1);
}
function compare(num1, num2) {
    return num1 - num2;
}
var start = new Date().getTime();
a.sort(compare);
var stop =  new Date().getTime();
var elapsed = stop - start;
console.log(elapsed);

//finished