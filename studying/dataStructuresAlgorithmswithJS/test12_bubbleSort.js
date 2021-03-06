//冒泡排序法
function CArray(numElements) {
    this.dataStore = [];
    this.pos = 0;
    this.numElements = numElements;
    this.insert = insert;
    this.toString = toString;
    this.clear = clear;
    this.setData = setData;
    this.swap = swap;//用于交换数组元素
    this.bubbleSort = bubbleSort;

    for (var i = 0; i < numElements; ++i) {
        this.dataStore[i] = i;//初始值：[0,numElements-1]
    }
}

function setData() {
    for (var i = 0; i < this.numElements; ++i) {
        this.dataStore[i] = /*this.numElements - i;*/Math.floor(Math.random() * (this.numElements+1));
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

// function bubbleSort() {
//     var numElements = this.dataStore.length;
//     for (var outer = numElements; outer >= 2; --outer) {//outer:numElements, ... ,2
//         for (var inner = 0; inner <= outer-1; ++inner) {//[0, ... ,numElements - 1], ... ,[0, ... ,1]
//             if (this.dataStore[inner] > this.dataStore[inner+1]) {
//                 swap(this.dataStore, inner, inner+1);
//             //[0, ... ,numElements - 1]循环中把index = 0的元素挪到它该挪的位置，且把最大的数据挪到最后一位[numElements]
//             //...的循环中把最大的数据挪到outer - 1的位置
//             }
//         }
//         //console.log(this.toString());
//     }
// }
// function bubbleSort() {
//     let noSwap = false;
//     for (let i = 0; i < this.dataStore.length && !noSwap; i++) {
//         // 每次循环初始化 noSwap ，如果一次循环结束后仍然为 true，说明表完成排序
//         noSwap = true;
//         for (let j = 0; j < this.dataStore.length - i; j++) {
//             if (this.dataStore[j] > this.dataStore[j + 1]) {
//                 // 使用解构赋值，交换两个元素的位置
//                 [this.dataStore[j], this.dataStore[j + 1]] = [this.dataStore[j + 1], this.dataStore[j]];
//                 noSwap = false;
//             }
//         }
//     }
// }
// 冒泡写法
function bubbleSort() {
    let noSwap = false;
    let n = this.dataStore.length;
    for (let i = 1; i < n - 1 && !noSwap; i++) {
        // 每次循环初始化noSwap，如果一次循环结束后仍然为true，说明表完成排序
        noSwap = true;
        for (let j = n - 1; j >= i; j--) { // 从下往上比，上端有序，下端无序
            if (this.dataStore[j - 1] > this.dataStore[j]) {
                // 使用解构赋值，交换两个元素的位置
                [this.dataStore[j], this.dataStore[j - 1]] = [this.dataStore[j - 1], this.dataStore[j]];
                noSwap = false;
            }
        }
    }
}
var numElements = 10;
var mynums = new CArray(numElements);
mynums.setData();
console.log(mynums.toString());
console.log();
var start = new Date().getTime();
mynums.bubbleSort();
var stop =  new Date().getTime();
var elapsed = stop - start;
console.log(elapsed);
console.log();
console.log(mynums.toString());

//finished