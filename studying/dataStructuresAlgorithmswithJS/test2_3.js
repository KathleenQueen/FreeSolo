//修改本章前面出现过的weekTemps对象，使它可以使用一个二维数组来存储每月的有用数据。增加一些方法用以显示月平均数，具体某一周和所有周的平均数。
//这个题目讲得不清楚不楚的，我就改成使用一个二维数组来存储每周的有用数据，显示每周平均数，具体某一天数据和这些周的平均数据。
Array.matrix=function(numrows,numcols,initial){
    var arr=[];
    for(var i=0;i<numrows;++i){
        var columns =[];
        for(var j=0;j<numcols;++j){
            columns[j]=initial;
        }
        arr[i]=columns;
    }
    return arr;
}
function weekTemps(){
    this.dataStore=Array.matrix(0,0,0);//列：第几周，周几，温度
     this.add=add;
     this.average=average;
}
function add(str) {
    this.dataStore.push(str)
}
function average(num) {
    var total = 0;
    var count = 0;
    if (num == 0) {
        for (i = 0; i<this.dataStore.length;i+=3) {
            total += this.dataStore[i][2];
            return total / this.dataStore.length;
        }
    }
    else {
        for (i = 0; i<this.dataStore.length; i+=3) {//在add次序有问题时依旧可以通过完整遍历得到正确结果
            if (this.dataStore[i][0] == num) {
                total += this.dataStore[i][2];
                count++;
            }
            return total / count;
        }
    }
}
var weekdata=new weekTemps();
var data=[[7,1,15],[7,2,16],[7,3,14],[7,4,17],[7,5,16],[7,6,15],[7,7,16],[8,1,18],[8,2,19],[8,3,19],[8,4,19],[8,5,20],[8,6,21],[8,7,23]];
weekdata.add(data);
console.log(weekdata.dataStore);
var average1=weekdata.average(7);
var average2=weekdata.average(8);
var average3=weekdata.average(0);
console.log(average1,average2,average3);





