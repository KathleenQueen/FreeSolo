//修改Set类，使里面的元素按顺序存储，写一段测试代码来测试你的修改。

//感觉有点简单，这个在add的时候对dataStore进行sort操作不就可以了吗?
//当然这样元素是按顺序储存了，但意义不大，最好是在显示的时候显示sort过的元素
//下一题用链表我也觉得是最后一步执行一次排序比较好

function Set() {
    this.dataStore = [];
    this.add = add;
    this.remove = remove;
    this.size = size;
    this.union = union;
    this.contains = contains;
    this.intersect = intersect;
    this.subset = subset;
    this.difference = difference;
    this.show = show;
}

function add(data) {
    if (this.dataStore.indexOf(data) < 0) {
        this.dataStore.push(data);
        this.dataStore.sort();
        return true;
    }
    else {
        return false;
    }
}

function remove(data) {
    var pos = this.dataStore.indexOf(data);
    if (pos > -1) {
        this.dataStore.splice(pos,1);
        return true;
    }
    else {
        return false;
    }
}

function size() {
    return this.dataStore.length;
}

function show() {
    return "[" + this.dataStore + "]";
}

function contains(data) {
    if (this.dataStore.indexOf(data) > -1) {
        return true;
    }
    else {
        return false;
    }
}

function union(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        tempSet.add(this.dataStore[i]);
    }
    for (var i = 0; i < set.dataStore.length; ++i) {
        tempSet.add(set.dataStore[i]);
    }
    return tempSet;
}

function intersect(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (set.contains(this.dataStore[i])) {
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}

function subset(set) {
    if (this.size() > set.size()) {
        return false;
    }
    else {
        for (var i = 0; i < this.dataStore.length; ++i) {
            if (set.contains(this.dataStore[i])) {
                ;
            }
            else {return false;}
        }
    }
    return true;
}

function difference(set) {
    var tempSet = new Set();
    for (var i = 0; i < this.dataStore.length; ++i) {
        if (!set.contains(this.dataStore[i])) {
            tempSet.add(this.dataStore[i]);
        }
    }
    return tempSet;
}


// main program
var cis = new Set();
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Danny");
cis.add("Danny");//测试add功能
console.log(cis.show());
var it = new Set();
it.add("Bryan");
it.add("Clayton");
it.add("Jennifer");
console.log(it.show());
var u = new Set();
u = cis.union(it);//测试union功能
console.log("并集:" + u.show());
var i = new Set();
i = cis.intersect(it);//测试intersect功能
console.log("交集:" + i.show());
i.remove("Clayton");//测试remove功能
console.log(i.show());
console.log(i.show()+i.subset(cis)+cis.show()+"子集");
console.log(cis.show()+cis.subset(it)+it.show()+"子集");//测试subset功能
var diff = new Set();
diff = cis.difference(it);
console.log(cis.show() + " difference " + it.show() + " -> " + diff.show());//测试difference功能

//finished