//修改Queue类，形成一个Deque类。
// 这是一个和队列类似的数据结构，允许从队列两端添加和删除元素，因此也叫双向队列。写一段测试程序测试该类。
function Deque() {
    this.dataStore = [];
    this.enqueueLast = enqueueLast;
    this.enqueueFirst = enqueueFirst;
    this.dequeueFirst = dequeueFirst;
    this.dequeueLast = dequeueLast;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}
function enqueueLast(element) {
    this.dataStore.push(element);
}
function enqueueFirst(element) {
    this.dataStore.unshift(element);
}
function dequeueFirst() {
    return this.dataStore.shift();
}
function dequeueLast() {
    return this.dataStore.pop();
}
function front() {
    return this.dataStore[0];
}
function back() {
    return this.dataStore[this.dataStore.length-1];
}
function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i){
        retStr += this.dataStore[i] + "\n";
    }
    return retStr;
}
function empty() {
    if (this.dataStore.length == 0){
        return true;
    }
    else {
        return false;
    }
}
function compare(num1,num2) {
    return num1-num2;
}
var s = new Deque();
var m=5;
s.enqueueFirst(m);
m=6;
s.enqueueLast(m);
m=4;
s.enqueueFirst(m);
m=3;
s.enqueueFirst(m);
console.log(s.toString());
s.dequeueFirst();
s.dequeueLast();
console.log(s.toString());

//finished