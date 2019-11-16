// 创建一个记录学生成绩的对象，提供一个添加成绩的方法，以及一个显示学生平均成绩的方法
function grades(){
    this.Chinese=[];
    this.Maths=[];
    this.English=[];
    this.add=add;
    this.average=average;
}
function add(str){
    this.Chinese.push(str[0]);
    //82,89,85
    this.Maths.push(str[1]);
    //83,90,90
    this.English.push(str[2]);
    //84,91,95
}
function average(){
    var i;
    var total1 = 0;
    for(i = 0; i<this.Chinese.length; ++i){
        total1 +=this.Chinese[i];}
    var total2 = 0;
    for(i = 0; i<this.Maths.length; ++i){
            total2 +=this.Maths[i];}
    var total3 = 0;
    for(i = 0; i<this.English.length; ++i){
                total3 +=this.English[i];
    }
    var a = [total1/this.Chinese.length, total2/this.Chinese.length, total3/this.Chinese.length];//对列求和取平均
    return a;
}
var thisTerm = new grades();
var student1 = [82, 83, 84];
var student2 = [89, 90, 91];
var student3 = [85, 90, 95];
thisTerm.add(student1);
thisTerm.add(student2);
thisTerm.add(student3);
console.log(thisTerm.average());

//finished