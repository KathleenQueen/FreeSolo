//一个算术表达式的后缀表达式形式如下：
//op1 op2 operator
//使用两个栈，一个用来存储操作数，另一个用来存储操作符，设计并实现一个JavaScript函数，
//该函数可以将中缀表达式转换为后缀表达式，然后利用栈对该表达式求值。

// 如何把该式子转换成后缀表达式呢？其实就是分三步：
//
// 1、按运算符优先级对所有运算符和它的运算数加括号，（原本的括号不用加）
// 2、把运算符移到对应的括号后
// 3、去掉括号
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
//后缀表达式的计算
//从左至右扫描表达式，遇到数字时，将数字压入堆栈
//遇到运算符时，弹出栈顶的两个数，用运算符对它们做相应的计算（后缀是次顶 op 栈顶！！！）,并将结果入栈
//重复上述过程直到表达式最右端，最后运算得出的值即为表达式的结果。

// 如何将一个中缀表达式转化为后缀表达式？我们需要借助栈的力量，用它来存放运算符。算法流程如下：
// 首先将各种运算符（包括括号）的优先级排列如下（数字越大，优先级越高）：
// 1：（
// 2：+ -
// 3：* /
// 4：）
// 对输入的中缀表达式从左到右遍历：

// 1）如果遇到数字，直接添加到后缀表达式末尾；
// 2）如果遇到运算符+、-、*、/：
// 先判断栈是否为空。若是，则直接将此运算符压入栈。若不是，则查看当前栈顶元素。
//（数字）栈内<栈外：入栈操作符(栈外优先级高则入)
// 　　   栈内>=栈外：循环弹出栈内的操作符添加到后缀表达式中，并对栈外操作符和下一位栈内操作符继续进行上述判断。(最后还是要入栈该位操作符的，不然不是丢了吗)
// 3）遇到'('：直接入栈
// 4) 遇到')'：出栈所有操作符直到遇到'(',弹出'('
// 字符串遍历结束后，如果栈不为空，则弹出栈中所有元素，将它们添加到后缀表达式的末尾，直到栈为空。

function opPriorityLevel(n) {
    if(n==="("){return 1;}
    if((n==="+")||(n==="-")){return 2;}
    if((n==="*")||(n==="/")){return 3;}
    if(n===")"){return 4;}
}
function infixChangePostfix(Expression) {
    var postfixExpression="";
    var s = new Stack();//用于存储操作符
    for(var i = 0; i < Expression.length; ++i){
        if((Expression[i] <= "9")&&(Expression[i] >= "0")){
            postfixExpression += Expression[i];
        }
        else if((Expression[i] === "+")||(Expression[i] === "-")||(Expression[i] === "*")||(Expression[i] === "/")){
            if(s.length() == 0){
                s.push(Expression[i]);continue;
            }
            else {
                while (s.length() != 0){
                if(opPriorityLevel(s.peek()) < opPriorityLevel(Expression[i])){
                    break;
                }
                else { //栈内>=栈外：循环弹出栈内的操作符添加到后缀表达式中，并对栈外操作符和下一位栈内操作符继续进行上述判断。(最后还是要入栈该位操作符的，不然不是丢了吗)
                    while ((opPriorityLevel(s.peek()) >= opPriorityLevel(Expression[i]))&&((opPriorityLevel(s.peek()) != "("))){
                        postfixExpression += s.pop();
                    }
                }
                }
                s.push(Expression[i]);
            }
        }
        else if(Expression[i] === "("){
            s.push(Expression[i]);
        }
        else if(Expression[i] === ")"){
            //出栈所有操作符直到遇到'(',弹出'('
            while(s.peek()!=="("){postfixExpression += s.pop();}
            s.pop();
        }
    }
    while (s.length() != 0){
        if(s.peek()!=="("){postfixExpression += s.pop();}
        else {s.pop();}
    }
    return postfixExpression;
}
function calculating(a,b,c) {
    if(a==="+"){return (b+c);}
    else if(a==="-"){return (b-c);}
    else if(a==="*"){return (b*c);}
    else {return (b/c);}
}
function calculatePostfix(postfix){
    var sData = new Stack();
    for(var i = 0; i < postfix.length; ++i){
        if((postfix[i] <= "9")&&(postfix[i] >= "0")){
            sData.push(parseInt(postfix[i]));
        }
        else {
            var opData2 = sData.pop();
            var opData1 = sData.pop();
            var opData3 = calculating(postfix[i], opData1, opData2);
            sData.push(opData3);
        }
    }
    return sData.pop();
}
var infixExpression = "(3+4)*5-6";//34+5*6-     //29
var postfix = infixChangePostfix(infixExpression);
console.log(infixExpression+" is changed into "+postfix+" results "+calculatePostfix(postfix));


infixExpression = "1+((2+3)*4)-5 ";//1 2 3 + 4 * + 5 -   //16
postfix = infixChangePostfix(infixExpression);
console.log(infixExpression+" is changed into "+postfix+" results "+calculatePostfix(postfix));

infixExpression = "8 + 4 - 6 * 2";//84+62*-   //0
postfix = infixChangePostfix(infixExpression);
console.log(infixExpression+" is changed into "+postfix+" results "+calculatePostfix(postfix));

//finished