//插入排序法
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;//用于交换数组元素
    this.insertionSort = insertionSort;

    for (var i = 0; i < numElements; ++i) {
        this.dataStore[i] = i;//初始值：[0,numElements-1]
    }
}

function setData() {
    for (var i = 0; i < this.numElements; ++i) {
        this.dataStore[i] = Math.floor(Math.random() * (this.numElements+1));
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

function insertionSort() {
    var temp, inner;
    for (var outer = 1; outer <= this.dataStore.length-1; ++outer) {//outer = 1, ... ,this.dataStore.length-1
        temp = this.dataStore[outer];//先取第二个数据this.dataStore[1]，前2位比较,前两位先小后大；
        // 再取第三个数据，this.dataStore[2]，若第二个数据比它大就把第二个数据往后挪一挪，最后--inner把空腾出来给保存好的this.dataStore[2]
        inner = outer;
        while (inner > 0 && (this.dataStore[inner-1] > temp)) {//inner = outer, ... ,1 ：this.dataStore[0] > this.dataStore[1]
            this.dataStore[inner] = this.dataStore[inner-1];//this.dataStore[1] = this.dataStore[0];
            --inner;
        }
        this.dataStore[inner] = temp;//this.dataStore[0] = this.dataStore[1];
        console.log(this.toString());
    }
}

var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.toString());
console.log();
mynums.insertionSort();
console.log();
console.log(mynums.toString());

//finished