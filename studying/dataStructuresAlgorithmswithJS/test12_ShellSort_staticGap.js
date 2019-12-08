//希尔排序法
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.gaps = [5,3,1];
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;//用于交换数组元素
    this.ShellSort = ShellSort;
    this.setGaps = setGaps;

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

function ShellSort(){
    for (var g = 0; g < this.gaps.length; ++g){
        for(var i = this.gaps[g]; i < this.dataStore.length; ++i){
            var temp = this.dataStore[i];
            for (var j = i; j >= this.gaps[g] && this.dataStore[j - this.gaps[g]] > temp; j -= this.gaps[g]){//每隔this.gaps[g]个元素作比较看是否腾空
                this.dataStore[j] = this.dataStore[j - this.gaps[g]];
            }
            this.dataStore[j] = temp;
        }
    }
}

function setGaps(arr) {
    this.gaps = arr;
}

var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.toString());
console.log();
mynums.ShellSort();
console.log();
console.log(mynums.toString());


//finished