//修改本章的影碟租赁程序，当一部影片检出后，将其加入一个已租影片列表。
// 每当有客户检出一部影片，都显示该列表中的内容。

//为影碟租赁程序创建一个check-in()函数，
// 当客户归还一部影片时，将该影片从已租列表中删除，同时添加到现有影片列表中。
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
    this.contains = contains;//用不了自定义类型
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
    for(var i = 0; i < this.dataStore.length; ++i) {
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
function checkOut(name, movie, movieList, customersList,lentOutMovieList){
    if(movieList.contains(movie)){
        var c =new Customer(name, movie);
        customersList.append(c);
        movieList.remove(movie);
        lentOutMovieList.append(movie);
        console.log(customersList)
    }
    else{
        console.log(movie +" is not available.");
    }
}
function containing(list,nameReturn,movieReturn){
    for(list.front(); list.currPos()< list.length(); list.next()){
        if(list.getElement() instanceof Customer){
            if((list.getElement().name==nameReturn)&&(list.getElement().movie==movieReturn)){
                return list.currPos;
            }
        }
        else{
            return false;
        }
    }
}
function removing(list,nameReturn,movieReturn) {
    if(containing(list,nameReturn,movieReturn)) {
        var d=containing(list,nameReturn,movieReturn);
        list.dataStore.splice(list.dataStore[d], 1);
        --list.listSize;
        return true;
    }
        else{
            return false;
        }
}
function checkIn(name, movie, movieList, customersList,lentOutMovieList){

    if(containing(customersList,name,movie)){
        var d=containing(customersList,name,movie);
        removing(customersList,name,movie);
        movieList.append(movie);
        lentOutMovieList.remove(movie);
    }
    else{
        console.log(movie +" is not our company's.");
    }
}
// fs.readFile( ) ：异步读取文件内容
// fs.writeFile ( ): 异步写数据到文件中
var fs = require("fs");
var movieList =new List();
var customersList = new List();
var lentOutMovieList = new List();
var data=fs.readFileSync('films.txt','utf-8');
data=data.split("\n");
for(var i=0;i<data.length;++i){
    data[i]=data[i].trim();
    movieList.append(data[i]);
}
console.log("Available movies:");
displayList(movieList);
var name="Joe";
var movie="The Godfather";
checkOut(name, movie, movieList, customersList,lentOutMovieList);
name="Lucy";
movie="Star Wars";
checkOut(name, movie, movieList, customersList,lentOutMovieList);
console.log("\nCustomer Rentals: ");
displayList(customersList);//客户租借列表
console.log("\nMovies Lent Out: ");
displayList(lentOutMovieList);//已租影片列表


console.log("\n\nAfter Returning...");
name="Lucy";movie="Star Wars";
checkIn(name,movie, movieList, customersList,lentOutMovieList);
console.log("Available movies:");
displayList(movieList);
console.log("\nCustomer Rentals: ");
displayList(customersList);
console.log("\nMovies Lent Out: ");
displayList(lentOutMovieList);

// finished





