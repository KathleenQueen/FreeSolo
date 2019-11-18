//修改本章的影碟租赁程序，当一部影片检出后，将其加入一个已租影片列表。每当有客户检出一部影片，都显示该列表中的内容。

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
function displayList(list){
    for(list.front(); list.currPos()< list.length(); list.next()){
        if(list.getElement() instanceof Customer){
            console.log(list.getElement()["name"]+", "+
                list.getElement()["movie"]);
        }
        else{
            console.log(list.getElement());
        }
    }
}
function Customer(name, movie){
    this.name = name;
    this.movie = movie;
}
function checkOut(name, movie, movieList, customerList){
    if(movieList.contains(movie)){
        var c =new Customer(name, movie);
        customerList.append(c);
        movieList.remove(movie);
    }
    else{
        console.log(movie +" is not available.");
    }
}
// fs.readFile( ) ：异步读取文件内容
// fs.writeFile ( ): 异步写数据到文件中
var fs = require("fs");
var readLine = require("readline");

/**
 * 按行读取文件内容
 *
 * @param fileName 文件名路径
 * @param callback 回调函数
 *
 * @return 字符串数组
 */
function readFileToArr(fileName, callback) {

    var arr = [];
    var readObj = readLine.createInterface({
        input: fs.createReadStream(fileName)
    });

    // 一行一行地读取文件
    readObj.on('line', function (line) {
        arr.push(line);
    });
    // 读取完成后,将arr作为参数传给回调函数
    readObj.on('close', function () {
        callback(arr);
    });
}
readFileToArr('films.txt', function (arr) {
    var movieList =new List();
    var customers =new List();
    for(var i = 0; i < arr.length;++i){
        movieList.append(arr[i]);
    }
    console.log("Available movies: \n");
});




