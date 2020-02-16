//修改例5-5中的优先队列，是的优先级高的元素优先码也大。写一段程序测试你的改动。
function Queue() {
    this.dataStore = [];
    this.enqueue = enqueue;
    this.dequeue = dequeue;
    this.front = front;
    this.back = back;
    this.toString = toString;
    this.empty = empty;
}
function enqueue(element) {
    this.dataStore.push(element);
}
function dequeue() {
    return this.dataStore.shift();
}
function front() {
    return this.dataStore[0];
}
function back() {
    if(this.dataStore.length > 0)
        return this.dataStore[this.dataStore.length - 1];
    else
        return undefined;
}
function toString() {
    var retStr = "";
    for (var i = 0; i < this.dataStore.length; ++i){
        retStr += "name: " + this.dataStore[i].name +", code: " + this.dataStore[i].code + "\n";
    }
    return retStr;
}
function empty() {
    if (this.dataStore.length == 0){
        return true;
    }
    else {
        return false;
    }
}
function Patient(name,code) {
    this.name = name;
    this.code = code;
}
function dequeue() {
    var entry = 0;
    for(var i = 1; i < this.dataStore.length; i++){
        if(this.dataStore[i].code > this.dataStore[entry].code){
            entry = i;
        }
    }
    return this.dataStore.splice(entry,1);
}
var p = new Patient("Smith",5);
var ed = new Queue();
ed.enqueue(p);
p = new Patient("Jones",1);
ed.enqueue(p);
p = new Patient("Fehrenbach",6);
ed.enqueue(p);
p = new Patient("Brown",1);
ed.enqueue(p);
p = new Patient("Ingram",1);
ed.enqueue(p);
console.log(ed.toString());
var seen = ed.dequeue();
console.log("Patient being treated: "+seen[0].name);
console.log("Patients waiting to be seen: ");
console.log(ed.toString());

seen = ed.dequeue();
console.log("Patient being treated: "+seen[0].name);
console.log("Patients waiting to be seen: ");
console.log(ed.toString());

seen = ed.dequeue();
console.log("Patient being treated: "+seen[0].name);
console.log("Patients waiting to be seen: ");
console.log(ed.toString());

seen = ed.dequeue();
console.log("Patient being treated: "+seen[0].name);
console.log("Patients waiting to be seen: ");
console.log(ed.toString());

seen = ed.dequeue();
console.log("Patient being treated: "+seen[0].name);
console.log("Patients waiting to be seen: ");
console.log(ed.toString());

//finished