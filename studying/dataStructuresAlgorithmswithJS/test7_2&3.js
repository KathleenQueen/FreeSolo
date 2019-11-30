//使用Dictionary类写一个程序，该程序用来存储一段文本中各个单词出现的次数。
//该程序显示每个单词出现的次数，但每个单词只显示一次。
//比如下面一段话“the brown fox jumped over the blue fox”，程序应输出为：
//the: 2
//brown: 1
//fox: 2
//jumped: 1
//over: 1
//blue: 1
function Dictionary() {
    this.add = add;
    this.datastore = new Array();
    this.find = find;
    this.remove = remove;
    this.showAll = showAll;
    this.count = count;
    this.clear = clear;
    this.showSingle = showSingle;
    this.showAllSort = showAllSort;
}

function showAllSort() {
    var t = Object.keys(this.datastore).sort();
    for (var key in t){
        console.log(t[key]+" -> "+this.datastore[t[key]]);
    }
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
var sentence = "the brown fox jumped over the blue fox";
var sentenceArray =sentence.split(" ");
var wordAppear = new Dictionary();
while (sentenceArray.length != 0) {
    var count = 1;
    for (var i = 1; i < sentenceArray.length; ++i) {
        if(sentenceArray[0] == sentenceArray[i]){sentenceArray.splice(i,1);count++;}
    }
    wordAppear.add(sentenceArray[0],count);
    sentenceArray.shift();
}
wordAppear.showAll();
console.log("按序排列后：")
wordAppear.showAllSort();

//finished