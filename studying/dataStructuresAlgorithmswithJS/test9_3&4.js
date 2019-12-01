//为Set类增加一个higher(element)方法，该方法返回比传入元素大的元素中最小的那个。写一段测试代码来测试这个方法。
//为Set类增加一个lower(element)方法，该方法返回比传入元素小的元素中最大的那个。写一段测试代码来测试这个方法。
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
    this.higher = higher;
    this.lower = lower;
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

function higher(element) {
    var i = this.size() - 1;
    var t = this.dataStore[i];
    if(t < element){
        console.log("不存在比" + element + "大的元素");
        return "false";
    }
    else{
        for (var i = 0; i < this.size(); ++i){
            if(element < this.dataStore[i]){
                return this.dataStore[i];
            }
        }
    }
}

function lower(element){
    var i = this.size() - 1;
    var t = this.dataStore[i];
    if(t > element){
        console.log("不存在比" + element + "小的元素");
        return "false";
    }
    else{
        for (var i = this.size()-1; i >= 0; --i){
            if(element > this.dataStore[i]){
                return this.dataStore[i];
            }
        }
    }
}

var cis = new Set();
cis.add("Clayton");
cis.add("Jennifer");
cis.add("Danny");
console.log(cis.show());
console.log(cis.higher("Alice"));
console.log(cis.higher("Kathleen"));
console.log(cis.lower("Alice"));
console.log(cis.lower("Kathleen"));

//finished