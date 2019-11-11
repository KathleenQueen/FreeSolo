//创建这样一个对象，它将字母存储在一个数组中，并且用一个方法可以将字母连在一起，显示成一个单词
//方法1
var letter0 = ['b','e','a','u','t','i','f','u','l'];
var letter1=letter0.join("");
console.log(letter1);
//方法2
function concat(accumulatedString,item){
    return accumulatedString + item;
}
var letter2=["g","i","r","l"];
var letter3=letter2.reduce(concat);
console.log(letter3);
