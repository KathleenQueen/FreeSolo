//增加一个向列表中插入元素的方法，该方法只在待插元素大于列表的所有元素时才执行插入操作。
// 这里的大于有多重含义，对于数字，它是指数值上的大小；对于字母，它是指在字母表中出现的先后顺序。
function List(){
    //属性
    this.listSize = 0;
    this.pos = 0;
    this.dataStore = [];//初始化一个空数组保存列表元素
    //方法
    this.clear = clear;
    this.find = find;
    this.toString = toString;
    this.insert = insert;
    this.append = append;
    this.remove = remove;
    this.front = front;
    this.end = end;
    this.prev = prev;
    this.next = next;
    this.hasNext = hasNext;
    this.hasPrev = hasPrev;
    this.length = length;
    this.currPos = currPos;
    this.moveTo = moveTo;
    this.getElement = getElement;
    this.contains = contains;
}
//给列表添加新元素
function append(element) {
    this.dataStore[this.listSize++] = element;
}
//查找列表元素
function find(element) {
    for(let i = 0; i < this.dataStore.length; i++) {
        if(this.dataStore[i] == element)
            return i;
    }
    return -1;
}
//从列表中删除元素
function remove(element) {
    let foundAt = this.find(element);
    if(foundAt > -1) {
        this.dataStore.splice(foundAt, 1);
        --this.listSize;
        return true;
    }
    return false;
}
//列表中元素的个数(长度)
function length() {
    return this.listSize;
}
//显示列表中的元素
function toString() {
    return this.dataStore;
}

//向列表插入新元素
function insert(element, after) {
    let insertPos = this.find(after);
    if(insertPos > -1) {
        this.dataStore.splice(insertPos + 1, 0, element);
        ++this.listSize;
        return true;
    }

    return false;
}
//清空列表
function clear() {
    delete this.dataStore;
    this.dataStore = [];
    this.listSize = this.pos = 0;
}
//判断给定值是否在列表中
function contains(element) {
    for(let i = 0; i < this.dataStore.length; i++) {
        if(this.dataStore[i] == element) {
            return true;
        }
    }
    return false;
}
//最前位置
function front() {
    this.pos = 0;
}
//最后位置
function end() {
    this.pos = this.listSize - 1;
}
//移动至前一个元素
function prev() {
        --this.pos;
}
//移动至下一个元素
function next() {
    if(this.pos < this.listSize) {
        ++this.pos;
    }
}
function hasNext() {
    return this.pos <= this.listSize - 1;
}
function hasPrev() {
    return this.pos >= 0;

}
//当前位置
function currPos() {
    return this.pos;
}
//移动至指定位置
function moveTo(position) {
    this.pos = position;
}
//获取当前元素
function getElement() {
    return this.dataStore[this.pos];
}
function putsBig(list,n){
    for (list.front();list.hasNext(); list.next()){
        if(list.getElement() >= n) {
            break;
        }
    }
    if(list.currPos() == list.length()){
        list.append(n);
    }
}
var putInBig = new List();
var numbers=[3,1,10,7,26,5,39];
for(var i=0;i<numbers.length;++i){
    putInBig.append(numbers[i]);
}
console.log(putInBig.dataStore);
var a=40;//数字
 putsBig(putInBig,a);
console.log(putInBig.dataStore);//append在最后一位添上即可
function compare(num1,num2) {
    return num1-num2;
}
console.log(putInBig.dataStore.sort(compare));
//若最后得到的是要排序的，可以先排序再同最后一个元素作比较即可
var b="Watermelon";//字母
var Fruits=["Banana","Peach","Orange","Apple"];
putInBig.clear();
for(var i=0;i<Fruits.length;++i){
    putInBig.append(Fruits[i]);
}
console.log(putInBig.dataStore)
putsBig(putInBig,b);
console.log(putInBig.dataStore);
console.log(putInBig.dataStore.sort());
//增加一个向列表中插入元素的方法，该方法只在待插元素小于列表的所有元素时才执行插入操作。(一个意思不再重复)

//finished