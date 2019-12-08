//快速排序法
function qSort(arr)
{
    if (arr.length == 0) {
        return [];
    }
    var left = [];
    var right = [];
    var pivot = arr[0];
    for (var i = 1; i < arr.length; i++) {

        if (arr[i] < pivot) {

            left.push(arr[i]);
        } else {

            right.push(arr[i]);
        }
    }
    return qSort(left).concat(pivot, qSort(right));
}
var a = [];
for (var i = 0; i < 10; ++i) {
    a[i] = Math.floor((Math.random()*100)+1);//Maximum call stack size exceededs 递归，数据太多会超出栈大小限制,node.js:12561
}
console.log(a);
// console.log();
var start = new Date().getTime();
console.log(qSort(a));
var stop =  new Date().getTime();
var elapsed = stop - start;
console.log(elapsed);

/*
function computeMaxCallStackSize() {
    try {
        return 1 + computeMaxCallStackSize();
    } catch (e) {
        // Call stack overflow
        return 1;//try 测试代码块的错误。catch 语句处理错误。throw 创建并跑出错误
    }
}
console.log(computeMaxCallStackSize());//stack size:12561
 */

//finished