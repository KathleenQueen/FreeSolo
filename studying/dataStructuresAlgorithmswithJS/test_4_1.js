// 栈可以用来判断一个算术表达式中的括号是否匹配。
// 编写一个函数，该函数接受一个算术表达式作为参数，返回括号不匹配的位置。
// 下面是一个括号不匹配的算术表达式的例子：2.3 + 23 / 12 + (3.14159 * 0.24。
function Stack() {
    this.dataStore=[];
    this.top=0;
    this.push=push;
    this.pop=pop;
    this.peek=peek;
    this.length=length;
    this.clear=clear;
}
function push(element) {
    this.dataStore[this.top++]=element;
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
    this.top=0;
}
var ArithmeticExpression = "2.3+23/12+(3.14159*0.24";
function brackets(n) {
    var s = new Stack();
   for(var i = 0;i < n.length; ++i){
       if(n[i]==="("){
           s.push(i);
       }
           else if(n[i]===")"){
               s.pop();
       }
   }
   if(s.length()!=0){return n+"括号不匹配的位置为第"+(s.peek()+1)+"个字符";}
   else {return n+"未出现括号不匹配现象"}
}
console.log(brackets(ArithmeticExpression));
ArithmeticExpression = "2.3+23/12+(3.14159*0.24)";
console.log(brackets(ArithmeticExpression));

//finished