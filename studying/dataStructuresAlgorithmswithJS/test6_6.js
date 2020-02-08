//故事源于1世纪的犹太战争。
//写一段程序将n个人围成一圈，第m个人会被杀掉，计算一圈人中哪两个人最后会存活。
//使用循环链表解决该问题。
function Node(element) {
    this.element = element;
    this.next = null;
}

function CircularLinkedList() {
    this.head = new Node("head");
    this.head.next = this.head;//循环链表修改1
    this.find = find;
    this.insert = insert;
    this.display = display;
    this.findPrevious = findPrevious;
    this.remove = remove;
}

function remove(item) {
    var prevNode = this.findPrevious(item);
    if (!(prevNode.next == this.head)) {
        prevNode.next = prevNode.next.next;
    }
}

function findPrevious(item) {
    var currNode = this.head;
    while (!(currNode.next == this.head) &&
    (currNode.next.element != item)) {
        currNode = currNode.next;
    }
    return currNode;
}

function display() {//循环链表修改2
    var currNode = this.head;
    while (!(currNode.next == this.head)){
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
    current.next = newNode;
}

function killOrSave(m,n){
    var circle= new CircularLinkedList();
    circle.insert(1,"head");
    for(var i = 1; i <= n-1; ++i){
        circle.insert(i+1,i);
    }
    var currNode = circle.head.next;//head不算第1个人，此处定位至第1个人
    console.log("Killed:");
    while (circle.head.next.next.next != circle.head){//这里是在设置最后存活人数
    var k = 1;
        while (k < m){
            if(currNode.next != circle.head){
                currNode = currNode.next;
            }
            else {
                currNode = currNode.next.next;
            }
            ++k;
        }
        console.log(currNode.element);
        circle.remove(currNode.element);
        if(currNode.next != circle.head){currNode = currNode.next;}
        else {currNode = currNode.next.next;}
    }
    console.log("Saved:");
    console.log(circle.head.next.element);
    console.log(circle.head.next.next.element);
}
killOrSave(3,40);//m>2
console.log("\nAnother");
killOrSave(5,40);

//finished