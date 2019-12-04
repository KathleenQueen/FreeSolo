var array = [[1,2],[3,4],[5,6]];
for(var i = 0;i < 3;++i){
array[i].forEach(function (item,index,arr) {
    // item当前元素
    // index	可选。当前元素的索引值。
    // arr	可选。当前元素所属的数组对象。
    console.log(index);
})
}