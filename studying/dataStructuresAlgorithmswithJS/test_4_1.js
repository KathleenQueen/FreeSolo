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
function brackets(n) {
    //采用临近括号先匹配原则
    var countLeft = 0,countRight = 0;
    var s = new Stack();
    for (var i = 0; i < n.length; ++i){
        if(n[i] === "("){countLeft++;}
        else if(n[i] === ")"){countRight++;}
    }
    if (countLeft == countRight){return n+"未出现括号不匹配现象"}
   else if(countLeft > countRight){
       for(var i = 0; i < n.length; ++i){
       if(n[i]==="("){
           s.push(i);
       }
           else if(n[i]===")"){
               s.pop();
       }
   }
   return n+"括号不匹配的位置为第"+(s.peek()+1)+"个字符";
}
   else {
       for(var i=n.length-1; i>=0;--i){
           if(n[i]===")"){
               s.push(i);
           }
           else if(n[i]==="("){
               s.pop();
           }
       }
       return n+"括号不匹配的位置为第"+(s.peek()+1)+"个字符";
    }
}
var ArithmeticExpression = "2.3+23/12+(3.14159*0.24";
console.log(brackets(ArithmeticExpression));

ArithmeticExpression = "2.3+23/12+(3.14159*0.24)";
console.log(brackets(ArithmeticExpression));

ArithmeticExpression = "2.3+(23/12+(3.14159*0.24)";
console.log(brackets(ArithmeticExpression));

ArithmeticExpression = "2.3+23/12+(3.14159)*0.24)";
console.log(brackets(ArithmeticExpression));

//finished