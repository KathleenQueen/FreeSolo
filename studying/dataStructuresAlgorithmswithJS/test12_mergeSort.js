//自底向上的归并排序法
function mergeSort(arr) {
    if (arr.length < 2) {
        return;//空数据和1个数据不用排了
    }
    //length=10时，
    var step = 1;
    var left, right;
    while (step < arr.length) {
        left = 0;
        right = step;
        while (right + step <= arr.length) {//step,2step,3step...10step=10
            mergeArrays(arr, left, left+step, right, right+step);//left+step=right
            left = right + step;
            right = left + step;//step = 1时，right = 11时跳出循环
        }
        if (right < arr.length) {
            mergeArrays(arr, left, left+step, right, arr.length);
        }
        step *= 2;//1,2,4.8.16
    }
}

function mergeArrays(arr, startLeft, stopLeft, startRight, stopRight) {
    var rightArr = new Array(stopRight - startRight + 1);//当不过arr.length时创建数组长度为step+1，否则创建数组长度为arr.length-Nstep+1
    var leftArr = new Array(stopLeft - startLeft + 1);//step+1
    k = startRight;//Nstep
    for (var i = 0; i < (rightArr.length-1); ++i) {
        rightArr[i] = arr[k];//给rightArr除最后一位设置为Infinity外，其他都赋值为arr的Nstep后可用区间（<=step）
        ++k;
    }

    k = startLeft;//(N-1)step
    for (var i = 0; i < (leftArr.length-1); ++i) {//i = 0...leftArr.length-2
        leftArr[i] = arr[k];//给leftArr除最后一位设置为Infinity外，其他都赋值为arr的Nstep,(N+1)step-1区间
        ++k;
    }

    rightArr[rightArr.length-1] = Infinity; // a sentinel value
    leftArr[leftArr.length-1] = Infinity; // a sentinel value
    var m = 0;
    var n = 0;
    for (var k = startLeft; k < stopRight; ++k) {
        if (leftArr[m] <= rightArr[n]) {
            arr[k] = leftArr[m];
            m++;
        }//leftArr与rightArr中的数逐位比较，取较小的那个数放到arr中，被取走数字的数组index++
        else {
            arr[k] = rightArr[n];
            n++;
        }
    }
    // console.log("left array - ", leftArr);
    // console.log("right array - ", rightArr);
}

//var nums = [6,10,1,9,4,8,2,7,3,5];
var nums = [];
for (var i = 0; i < 10000; ++i) {
    nums[i] = 10000 - i;
        //Math.floor((Math.random()*100)+1);//Maximum call stack size exceededs 递归，数据太多会超出栈大小限制,node.js:12561
}
//console.log(nums);
console.log();
var start = new Date().getTime();
mergeSort(nums);
var stop =  new Date().getTime();
var elapsed = stop - start;
//console.log(elapsed);
//console.log(nums);

//finished
module.exports={
    mergeArrays,mergeSort
};