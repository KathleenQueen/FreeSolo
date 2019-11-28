//写一个程序，该程序从一个文本文件中读入名字和电话号码，然后将其存入一个字典。
//该程序需包含如下功能：显示单个电话号码、显示所有电话号码、增加新电话号码、删除电话号码、清空所有电话号码。
function Dictionary() {
    this.add = add;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
    this.showSingle = showSingle;
}
function showSingle(key) {
    console.log(key+" -> "+this.find(key));
}
function add(key, value) {
    this.datastore[key] = value;
}

function find(key) {
    return this.datastore[key];
}

function remove(key) {
    delete this.datastore[key];
}

function showAll() {
    for(var key in this.datastore) {
        console.log(key + " -> " + this.datastore[key]);
    }
}

function count() {
    var n = 0;
    for(var key in this.datastore) {
        ++n;
    }
    return n;
}

function clear() {
    for(var key in this.datastore) {
        delete this.datastore[key];
    }
}
var telBook = new Dictionary();
var fs = require("fs");
var data = fs.readFileSync('telNumber.txt','utf-8');
data = data.split("\n");
for(var i = 0;i < data.length;++i){
    data[i] = data[i].trim();
    var nameTel = data[i].split("");
    var name = nameTel.splice(0,10);
    name = name.join("").trim();
    nameTel=nameTel.join("");
    telBook.add(name,nameTel);

}
console.log("显示所有电话号码：");
telBook.showAll();
console.log("counts:"+telBook.count())
console.log("显示单个电话号码：");
var name = "Lucy";
telBook.showSingle(name);
console.log("删除Lucy的电话号码后：");
telBook.remove(name);
telBook.showAll();
console.log("counts:"+telBook.count())
console.log("清空所有的电话号码后：");
telBook.clear();
telBook.showAll();
console.log("counts:"+telBook.count());

//finished