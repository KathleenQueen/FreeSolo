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

//finished1

//使用前面完成的Deque类来判断一个给定单词是否为回文
var words = ["dad","racecar","1001","banana"];
function judgePalindrome(word) {
    var s = new Deque();
    for(var i = 0;i < word.length; ++i){
        s.enqueueLast(word[i]);
    }
    while (s.dataStore.length > 1) {
        if (s.dequeueLast() == s.dequeueFirst()) {
            ;
        } else {
            return false;
        }
    }
    return true;
}
function print(word) {
    if(judgePalindrome(word)){console.log(word+"是回文")}
    else {console.log(word+"不是回文")}
}
for(var i = 0; i < words.length; ++i){
    print(words[i]);
}