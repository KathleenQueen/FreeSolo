var array = [[1,2],[3,4],[5,6]];
for(var i = 0;i < 3;++i){
array[i].forEach(function (item,index,arr) {
    // item当前元素
    // index	可选。当前元素的索引值。
    // arr	可选。当前元素所属的数组对象。
    console.log(index);
})
}
var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

//这里不用on，也可以用addEventListener
life.on('doSth', function(who,guest){
    console.log(who + ' 给 ' + guest + ' 倒水');
})
life.addEventListener;
life.emit('doSth','Lucy','Kathy');

var d = [];
d=[1,2,3,4,5,6];
d=[0];
console.log(d);

function max3(a, b, c){
    a = a > b ? a : b;
    return a > c ? a : c;
}
console.log(max3(1,5,3));
console.log(Array.prototype.push);
function Node(element) {
    this.element = element;
    this.next = null;
    this.previous = null;
}

function LList() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.remove = remove;
    this.findLast = findLast;
    this.dispReverse = dispReverse;
}

function dispReverse() {
    var currNode = this.head;
    currNode = this.findLast();
    while (!(currNode.previous == null)) {
        console.log(currNode.element);
        currNode = currNode.previous;
    }
}

function findLast() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        currNode = currNode.next;
    }
    return currNode;
}

function remove(item) {
    var currNode = this.find(item);
    if (!(currNode.next == null)) {
        currNode.previous.next = currNode.next;
        currNode.next.previous = currNode.previous;
        //currNode.next = null;
        //currNode.previous = null;
    }
}

// findPrevious is no longer needed
/*function findPrevious(item) {
   var currNode = this.head;
   while (!(currNode.next == null) &&
           (currNode.next.element != item)) {
      currNode = currNode.next;
   }
   return currNode;
}*/

function display() {
    var currNode = this.head;
    while (!(currNode.next == null)) {
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

function find(item) {
    var currNode = this.head;
    while (currNode.element != item) {
        currNode = currNode.next;
    }
    return currNode;
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    newNode.previous = current;
    current.next = newNode;
}


var cities = new LList();
cities.insert("Conway", "head");
cities.insert("Russellville", "Conway");
cities.insert("Carlisle", "Russellville");
cities.insert("Alma", "Carlisle");
cities.display();
console.log();
cities.remove("Carlisle");
cities.display();
console.log();
cities.dispReverse();
console.log(cities);