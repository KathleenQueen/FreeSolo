//Fibonacci
//0,1,1,2,3,5,8,13,21,34,55...(data)
//0,1,2,3,4,5,6 ,7 ,8 ,9,10...(index)
function dynFib(n) {
    var val = [];
    for (var i = 0; i <= n; ++i) {
        val[i] = 0;
    }
    if (n == 0){
        return 0;
    }
    else if (n == 1 || n == 2) {
        return 1;
    }
    else {
        val[1] = 1;
        val[2] = 2;
        for (var i = 3; i <= n; ++i) {
            val[i] = val[i-1] + val[i-2];
        }
        return val[n-1];
    }
}
console.log(dynFib(10));

//finished