//创建Person类，该类用于保存人的姓名和性别信息。
// 创建一个至少包含10个Person对象的列表。写一个函数显示列表中所有拥有相同性别的人。
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
var matesList = new List();
var womenList = new List();
var menList = new List();
function Person(name,sex){
    this.name = name;
    this.sex = sex;
}
var classmate1 = new Person("Alice","W");
var classmate2 = new Person("Lucy","W");
var classmate3 = new Person("Edward","M");
var classmate4 =new Person("Kathleen","W");
var classmate5 = new Person("Lucky","W");
var classmate6= new Person("Leon","M");
var classmate7 = new Person("David","M");
var classmate8 = new Person("Angel","W");
var classmate9 = new Person("Kris","M");
var classmate10 = new Person("William","M");
var classmates=[classmate1,classmate2,classmate3,classmate4,classmate5,classmate6,classmate7,classmate8,classmate9,classmate10];
for (var i=0;i<classmates.length;++i){
    matesList.append(classmates[i]);
}
function getTheSameSex(list) {
    for(list.front();list.hasNext();list.next()){
        if(list.getElement() instanceof Person){
            if(list.getElement().sex=="W"){
                womenList.append(list.getElement());
            }
            else {
                menList.append(list.getElement());
            }
            }
        }
}
function displayTheName(list) {
    for(list.front();list.hasNext();list.next()){
        if(list.getElement() instanceof Person){
            console.log(list.getElement()["name"]);
        }
    }
}
getTheSameSex(matesList);
console.log("Women:");
displayTheName(womenList);
console.log("Men:");
displayTheName(menList);