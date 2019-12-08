//希尔排序法
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.gaps = [];
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;//用于交换数组元素
    this.ShellSort1 = ShellSort1;
    this.ShellSort2 = ShellSort2;
    this.ShellSort3 = ShellSort3;
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

function ShellSort1() {
    var N = this.dataStore.length;
    var h = 1;
    while (h < N/3) {
        h = 3 * h + 1;
    }
    while (h >= 1) {
        for (var i = h; i < N; i++) {
            for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h]; j -= h) {
                swap(this.dataStore, j, j-h);
            }
        }
        h = (h-1)/3;
    }
}

function ShellSort2() {
    var N = this.dataStore.length;
    var h = 1;
    var arr = [];
    arr.push(h);
    while (h < N/3) {
       arr.push(h = 3 * h + 1);
    }
    while ((h = arr.pop())) {
        for (var i = h; i < N; i++) {
            for (var j = i; j >= h && this.dataStore[j] < this.dataStore[j-h]; j -= h) {
                swap(this.dataStore, j, j-h);
            }
        }
    }
}

function ShellSort3(){
    var N = this.dataStore.length;
    var h = 1;
    this.gaps = [1];
    while (h < N/3) {
        this.gaps.push(h = 3 * h + 1);
    }
    for (var g = this.gaps.length - 1; g > 0; --g){
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

var numElements = 10000000;
var mynums = new CArray(numElements);
mynums.setData();
//console.log(mynums.toString());
console.log();
var start = new Date().getTime();
mynums.ShellSort1();
var stop =  new Date().getTime();
console.log();
//console.log(mynums.toString());
var elapsed = stop - start;
console.log(elapsed);

var numElements2 = 10000000;
var mynums2 = new CArray(numElements2);
mynums2.setData();
var start2 = new Date().getTime();
mynums2.ShellSort2();
var stop2 =  new Date().getTime();
console.log();
var elapsed2 = stop2 - start2;
console.log(elapsed2);

var numElements3 = 10000000;
var mynums3 = new CArray(numElements3);
mynums3.setData();
var start3 = new Date().getTime();
mynums3.ShellSort3();
var stop3 =  new Date().getTime();
console.log();
var elapsed3 = stop3 - start3;
console.log(elapsed3);

//大数据时第三种希尔排序法所需时间最少

//finished