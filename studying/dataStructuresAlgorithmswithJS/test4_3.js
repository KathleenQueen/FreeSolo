//现实生活中栈的一个例子是佩兹糖果盒。
//想象一下你有一盒佩兹糖果，里面塞满了红色、黄色和白色的糖果，但是你不喜欢黄色的糖果。
// 使用栈（有可能用到多个栈）写一段程序，在不改变盒内其他糖果叠放顺序的基础上，将黄色糖果移除。
function Stack() {
    this.dataStore=[];
    this.top = 0;
    this.push=push;
    this.pop=pop;
    this.peek=peek;
    this.length=length;
    this.clear=clear;
}
function push(element) {
    this.dataStore[this.top++] = element;
}
function pop() {
    return this.dataStore[--this.top];
}
function peek() {
    return this.dataStore[this.top-1];
}
function length() {
    return this.top;
}
function clear() {
    this.top = 0;
}
var sweets = ["yellow","red","white","yellow","yellow","red","yellow","red","white","red","red"];
var get = new  Stack();
var out = new Stack();
for (var i = 0;i < sweets.length;++i){
    if(sweets[i]=="yellow"){
        out.push(sweets[i]);
    }
    else get.push(sweets[i]);
}
console.log(get.dataStore);

//finished