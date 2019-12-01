//修改Set类，将存储方式从数组替换为链表。写一段测试代码来测试你的修改。
function Node(element) {
    this.element = element;
    this.next = null;
}

function Set() {
    this.head = new Node("head");
    this.find = find;
    this.insert = insert;
    this.findPrevious = findPrevious;
    this.remove = remove;
    this.add = add;//add用来全部insert至第一位，即this.head之后
    this.size = size;
    this.union = union;
    this.intersect = intersect;
    this.subset = subset;
    this.difference = difference;
    this.display = display;
}
function intersect(set){
    var tempSet = new Set();
    for (var currNode = this.head; currNode != null; currNode = currNode.next) {
        if (set.find(currNode.element)!= set.head) {
            tempSet.add(currNode.element);
        }
    }
    return tempSet;
}

function union(set) {
    var tempSet = new Set();
    var currNode = this.head;
    while (!(currNode.next == null)) {
        tempSet.add(currNode.next.element);
        currNode = currNode.next;
    }
    currNode = set.head;
    while (!( currNode.next == null)){
        tempSet.add(currNode.next.element);
        currNode = currNode.next;
    }
    return tempSet;
}
function size() {
    var currNode = this.head;
    var length = 0;
    while (!(currNode.next == null)){
        currNode = currNode.next;
        length++;
    }
    return length;
}
function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == null)) {
        prevNode.next = prevNode.next.next;
    }
    console.log(item + " has been removed.")
}

function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == null) &&
    (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function display() {//循环链表修改2
    var currNode = this.head;
    console.log("[Set]");
    while (!(currNode.next == null)){
        console.log(currNode.next.element);
        currNode = currNode.next;
    }
}

function find(item) {
    var currNode = this.head;
    while (currNode.next != null){
        if (currNode.element != item){
        currNode = currNode.next;
        }
        else {return currNode;}
    }
    {return this.head;}//除head外无成员/找不到该成员时返回的是this.head
}

function insert(newElement, item) {
    var newNode = new Node(newElement);
    var current = this.find(item);
    newNode.next = current.next;
    current.next = newNode;
}

function add(newElement) {
    if(this.find(newElement) == this.head){
        this.insert(newElement,"head");
    }
}
function subset(set) {
    if (this.size() > set.size()) {
        return false;
    }
    else {
        for (var currNode = this.head; currNode.next != null; currNode = currNode.next) {
            if (set.find(currNode.next.element)!= set.head) {
                ;
            }
            else {return false;}
        }
        return true;
    }
}
function difference(set) {
    var tempSet = new Set();
    for (var currNode = this.head; currNode.next != null; currNode = currNode.next) {
        if (set.find(currNode.next.element) == set.head) {
            tempSet.add(currNode.next.element);
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
cis.display();
var it = new Set();
it.add("Bryan");
it.add("Clayton");
it.add("Jennifer");
it.display();
var u = new Set();
u = cis.union(it);//测试union功能
console.log("并集:");
u.display();
var i = new Set();
i = cis.intersect(it);//测试intersect功能
console.log("交集:");
i.display();
i.remove("Clayton");//测试remove功能
i.display();
console.log(i.subset(cis));
console.log(cis.subset(it));//测试subset功能
var diff = new Set();
diff = cis.difference(it);
console.log("属于cis，但不属于it：")
diff.display();//测试difference功能

//finished
