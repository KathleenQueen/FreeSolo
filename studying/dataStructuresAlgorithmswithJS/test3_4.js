//修改本章的影碟租赁程序，当一部影片检出后，将其加入一个已租影片列表。每当有客户检出一部影片，都显示该列表中的内容。

//引用相关模块fs、path、read、readline
const fs = require('fs');
const path = require('path');
const readline = require('readline');
//创建文件流读取器

//filename代表该文件的绝对物理路径，可使用path.join()与__dirname拼接完成。
var filename=path.join(__dirname,'films.txt');
var rl = readline.createInterface({
    input:fs.createReadStream(filename)
});
rl.on('line',(line)=>{
//console.log(line);
});
var readFilename=path.join(__dirname,'films.txt');
var writeFilename=path.join(__dirname,'films2.txt');
var reader = fs.createReadStream(readFilename);
var writer = fs.createWriteStream(writeFilename);
// reader.pipe(writer);
reader.on('end',()=>{

});

// function List(){
//     //属性
//     this.listSize = 0;
//     this.pos = 0;
//     this.dataStore = [];//初始化一个空数组保存列表元素
//     //方法
//     this.clear = clear;
//     this.find = find;
//     this.toString = toString;
//     this.insert = insert;
//     this.append = append;
//     this.remove = remove;
//     this.front = front;
//     this.end = end;
//     this.prev = prev;
//     this.next = next;
//     this.hasNext = hasNext;
//     this.hasPrev = hasPrev;
//     this.length = length;
//     this.currPos = currPos;
//     this.moveTo = moveTo;
//     this.getElement = getElement;
//     this.contains = contains;
// }
// //给列表添加新元素
// function append(element) {
//     this.dataStore[this.listSize++] = element;
// }
// //查找列表元素
// function find(element) {
//     for(let i = 0; i < this.dataStore.length; i++) {
//         if(this.dataStore[i] == element)
//             return i;
//     }
//     return -1;
// }
// //从列表中删除元素
// function remove(element) {
//     let foundAt = this.find(element);
//     if(foundAt > -1) {
//         this.dataStore.splice(foundAt, 1);
//         --this.listSize;
//         return true;
//     }
//     return false;
// }
// //列表中元素的个数(长度)
// function length() {
//     return this.listSize;
// }
// //显示列表中的元素
// function toString() {
//     return this.dataStore;
// }
//
// //向列表插入新元素
// function insert(element, after) {
//     let insertPos = this.find(after);
//     if(insertPos > -1) {
//         this.dataStore.splice(insertPos + 1, 0, element);
//         ++this.listSize;
//         return true;
//     }
//
//     return false;
// }
// //清空列表
// function clear() {
//     delete this.dataStore;
//     this.dataStore = [];
//     this.listSize = this.pos = 0;
// }
// //判断给定值是否在列表中
// function contains(element) {
//     for(let i = 0; i < this.dataStore.length; i++) {
//         if(this.dataStore[i] == element) {
//             return true;
//         }
//     }
//     return false;
// }
// //最前位置
// function front() {
//     this.pos = 0;
// }
// //最后位置
// function end() {
//     this.pos = this.listSize - 1;
// }
// //移动至前一个元素
// function prev() {
//     --this.pos;
// }
// //移动至下一个元素
// function next() {
//     if(this.pos < this.listSize) {
//         ++this.pos;
//     }
// }
// function hasNext() {
//     return this.pos <= this.listSize - 1;
// }
// function hasPrev() {
//     return this.pos >= 0;
//
// }
// //当前位置
// function currPos() {
//     return this.pos;
// }
// //移动至指定位置
// function moveTo(position) {
//     this.pos = position;
// }
// //获取当前元素
// function getElement() {
//     return this.dataStore[this.pos];
// }
// function createArr(file){
//     var arr = read(file).split("\n");
//     for(var i =0; i < arr.length;++i){
//         arr[i]= arr[i].trim();
//     }
//     return arr;
// }
// function displayList(list){
//     for(list.front(); list.currPos()< list.length(); list.next()){
//         if(list.getElement() instanceof Customer){
//             console.log(list.getElement()["name"]+", "+
//                 list.getElement()["movie"]);
//         }
//         else{
//             console.log(list.getElement());
//         }
//     }
// }
// function Customer(name, movie){
//     this.name = name;
//     this.movie = movie;
// }
// function checkOut(name, movie, movieList, customerList){
//     if(movieList.contains(movie)){
//         var c =new Customer(name, movie);
//         customerList.append(c);
//         movieList.remove(movie);
//     }
//     else{
//         console.log(movie +" is not available.");
//     }
// }
// var movies = createArr("films.txt");
// console.log(movies);
// var movieList =new List();
// var customers =new List();
// for(var i =0; i < movies.length;++i){
//     movieList.append(movies[i]);
// }
// console.log("Available movies: \n");
// displayList(movieList);
// putstr("\nEnter your name: ");
// var name = readline();
// putstr("What movie would you like? ");
// var movie = readline();
// checkOut(name, movie, movieList, customers);
// console.log("\nCustomer Rentals: \n");
// displayList(customers);
// console.log("\nMovies Now Available\n");
// displayList(movieList);