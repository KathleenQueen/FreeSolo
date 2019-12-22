var array = [[1,2],[3,4],[5,6]];
for(var i = 0;i < 3;++i){
array[i].forEach(function (item,index,arr) {
    // item当前元素
    // index	可选。当前元素的索引值。
    // arr	可选。当前元素所属的数组对象。
    console.log(index);
})
}
var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

//这里不用on，也可以用addEventListener
life.on('doSth', function(who,guest){
    console.log(who + ' 给 ' + guest + ' 倒水');
})
life.addEventListener;
life.emit('doSth','Lucy','Kathy');

var d = [];
d=[1,2,3,4,5,6];
d=[0];
console.log(d);

function max3(a, b, c){
    a = a > b ? a : b;
    return a > c ? a : c;
}
console.log(max3(1,5,3));