//选择排序法
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;//用于交换数组元素
    this.selectionSort = selectionSort;

    for (var i = 0; i < numElements; ++i) {
        this.dataStore[i] = i;//初始值：[0,numElements-1]
    }
}

function setData() {
    for (var i = 0; i < this.numElements; ++i) {
        this.dataStore[i] = this.numElements - i; /*Math.floor(Math.random() * (this.numElements+1));*/
    }
}

function clear() {
    for (var i = 0; i < this.dataStore.length; ++i) {
        this.dataStore[i] = 0;//clear 是把所有的数据清零，那clear之后insert，会从pos++开始添加数据
    }
}

function insert(element) {
    this.dataStore[this.pos++] = element;
}

function toString() {
    var retstr = "";
    for (var i = 0; i < this.dataStore.length; ++i) {
        retstr += this.dataStore[i] + " ";
        if (i > 0 && i % 10 == 0) {
            retstr += "\n";
        }
    }
    return retstr;
}

function swap(arr, index1, index2) {
    var temp = arr[index1];
    arr[index1] = arr[index2];
    arr[index2] = temp;
}

function selectionSort() {
    var min;
    for (var outer = 0; outer <= this.dataStore.length - 2; ++outer) {//outer:0, ... ,this.dataStore.length-2
        min = outer;
        for (var inner = outer + 1; inner <= this.dataStore.length - 1; ++inner) {
            //[1, ... ,this.dataStore.length-1], ... ,[this.dataStore.length-2, ... ,this.dataStore.length-1]
            if (this.dataStore[inner] < this.dataStore[min]) {
                min = inner;//每个[outer+1,this.dataStore.length-1]循环中找到最小值后只换一次，交换次数最多为：this.dataStore.length-2 = numElements-2
            }
        }
        swap(this.dataStore, outer, min);
        //console.log(this.toString());
    }
}

var numElements = 10000;
var mynums = new CArray(numElements);
mynums.setData();
//console.log(mynums.toString());
console.log();
var start = new Date().getTime();
mynums.selectionSort();
var stop =  new Date().getTime();
var elapsed = stop - start;
console.log(elapsed);
console.log();
//console.log(mynums.toString());

//finished