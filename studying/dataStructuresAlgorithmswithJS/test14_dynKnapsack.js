//背包问题
function max(a, b) {
    return (a > b) ? a : b;
}

function dKnapsack(capacity, size, value, n) {
    var K = [];
    for (var i = 0; i <= capacity+1; i++) {
        K[i] = [];
    }
    for (var i = 0; i <= n; i++) {//i表示投入的第几个物品
        for (var w = 0; w <= capacity; w++) {//w是已放入物品总占容积,但不是每个w都是有意义的，如果w不能被size元素合成，那么K[i][w] = K[i-1][w]，该元素等于上一行同列元素。表示还无size可放入
            if (i == 0 || w == 0) {
                K[i][w] = 0;
            }
            else if (size[i-1] <= w) {//刚放入的物品大小小于已放入物品总占容积
                K[i][w] = max(value[i-1] + K[i-1][w-size[i-1]],//比较（该物品价值+放入前的价值）同不放入该物品却达到该容积的价值（有点像比密度）
                    K[i-1][w]);
            }
            else {
                K[i][w] = K[i-1][w];
            }
        }
        console.log(K[i]+"\n");
    }

    return K[n][capacity];
}

var value = [4,5,10,11,13];
var size = [3,4,7,8,9];
var capacity = 16;
var n = 5;
console.log(dKnapsack(capacity, size, value, n));

//finished