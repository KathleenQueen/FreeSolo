//使用线性探测法创建一个字典，用来保存单词的定义。该程序需要包含两个部分：
//第一部分从文本文件中读取一组单词和它们的定义，并将其存入散列表；
//第二部分让用户输入单词，程序给出该单词的定义。
function HashTable() {
    this.table = new Array(137);
    this.buildChains = buildChains;
    this.simpleHash = simpleHash;
    this.betterHash = betterHash;
    this.showDistro = showDistro;
    this.put = put;
    this.get = get;
}

// put for separate chaining
function put(key, data) {
    var pos = this.betterHash(key);
    var index = 0;
    if (this.table[pos][index] == undefined) {
        this.table[pos][index] = key;
        this.table[pos][index + 1] = data;
    } else {
        while (this.table[pos][index] != undefined) {
            index++;
        }
        this.table[pos][index] = key;
        this.table[pos][index + 1] = data;
    }
}

function simpleHash(data) {
    var total = 0;
    for (var i = 0; i < data.length; ++i) {
        total += data.charCodeAt(i);
    }
    console.log("Hash value: " + data + " -> " + total);
    return total % this.table.length;
}

function betterHash(string) {
    const H = 37;
    var total = 0;
    for (var i = 0; i < string.length; ++i) {
        total += H * total + string.charCodeAt(i);
    }
    total = total % this.table.length;
    if (total < 0) {
        total += this.table.length - 1;
    }
    return parseInt(total);
}

function showDistro() {
    for (var i = 0; i < this.table.length; ++i) {
        if (this.table[i][0] != undefined) {
            console.log(i + ": " + this.table[i]);
        }
    }
}

function getRandomInt (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function genStuData(arr) {
    for (var i = 0; i < arr.length; ++i) {
        var num = "";
        for (var j = 1; j <= 9; ++j) {
            num += Math.floor(Math.random() * 10);
        }
        num += getRandomInt(50,100);
        arr[i] = num;
    }
}

function buildChains() {
    for (var i = 0; i < this.table.length; ++i) {
        this.table[i] = new Array();
    }
}

function inHash(key, arr) {
    var hash = simpleHash(key, arr);
    var n = 0;
    if (key == arr[hash][n]) {
        return true;
    }
    else {
        while (arr[hash][n] != undefined) {
            if (arr[hash][n] == key) {
                return true;
            }
            ++n;
        }
    }
    return false;
}

// get for separate chaining
function get(key) {
    var index = 0;
    var hash = this.betterHash(key);
    if (this.table[pos][index] = key) {
        return this.table[pos][index+1];
    }
else {
        while (this.table[pos][index] != key) {
            index += 2;
        }
        return this.table[pos][index+1];
    }
    return undefined;
}

var hTable = new HashTable();
hTable.buildChains();
var fs = require("fs");
var data = fs.readFileSync('dictionaryForTest8_1&2.txt','utf-8');
data = data.split("\n");
for(var i = 0;i < data.length;++i){
    data[i] = data[i].trim();
    hTable.put(data[i].substring(0,9).trim(),data[i].substring(11));
}
hTable.showDistro();

//finished