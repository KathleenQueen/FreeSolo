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
var ArithmeticExpression="2.3+23/12+(3.14159*0.24";
function brackets(n) {
    var s = new Stack();
    var countleft = 0, countright = 0;
    var leftbrackets= ['(', '{', '['];
    var rightbrackets = [')', '}', ']'];
    for(var i=0;i<n.length;++i){
        s.push(n[i]);
        if(n[i]=='('){countleft++;}
        else if(n[i]==')'){countright++;}
    }
    if(countleft==countright) {return "No brackets missing";}
    else if(countleft>countright){
        for (;;){}
    }
    console.log(s);
}
console.log(brackets(ArithmeticExpression));