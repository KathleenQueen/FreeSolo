//为BST类增加一个新方法，该方法返回BST中节点的个数。
//为BST类增加一个新方法，该方法返回BST中边的个数。
function Node(data, left, right) {
  this.data = data;
  this.count = 1;
  this.left = left;
  this.right = right;
  this.show = show;
}

function show() {
  return this.data;
}

function BST() {
  this.root = null;
  this.insert = insert;
  this.countNode = countNode;
  this.orderCounts = orderCounts;
  this.countSide = countSide;
  this.countData = countData;//计某一数据出现的次数
  this.inOrder = inOrder;
  this.preOrder = preOrder;
  this.postOrder = postOrder;
  this.getmin = getmin;
  this.getmax = getmax;
  this.find = find;
  this.remove = remove;
  this.removeNode = removeNode;
  this.getSmallest = getSmallest;
}

function countData(data) {
  var node = this.find(data);
  if (node != null) {
    return node.count;
  } else {
    return 0;
  }
}

function countNode(node) {
  var arr = [];
  this.orderCounts(arr, node);
  return arr.length;
}

function orderCounts(arr, node) {
  if (!(node == null)) {
    arr.push(0);
    orderCounts(arr, node.left);
    orderCounts(arr, node.right);
  }
}

function countSide(node) {
  return this.countNode(node) - 1;
}

function insert(data) {
  if (this.root != null) {
    var node = this.find(data);
    if (node != null) {
      node.count++;
    }
  }
  var n = new Node(data, null, null);
  if (this.root == null) {
    this.root = n;
  } else {
    var current = this.root;
    var parent;
    while (true) {
      parent = current;
      if (data < current.data) {
        current = current.left;
        if (current == null) {
          parent.left = n;
          break;
        }
      } else {
        current = current.right;
        if (current == null) {
          parent.right = n;
          break;
        }
      }
    }
  }
}

function inOrder(node) {
  if (!(node == null)) {
    inOrder(node.left);
    console.log(node.show() + " ");
    inOrder(node.right);
  }
}

function preOrder(node) {
  if (!(node == null)) {
    console.log(node.show() + " ");
    preOrder(node.left);
    preOrder(node.right);
  }
}

function postOrder(node) {
  if (!(node == null)) {
    postOrder(node.left);
    postOrder(node.right);
    console.log(node.show() + " ");
  }
}

function getmin() {
  var current = this.root;
  while (!(current.left == null)) {
    current = current.left;
  }
  return current.data;
}

function getmax() {
  var current = this.root;
  while (!(current.right == null)) {
    current = current.right;
  }
  return current.data;
}

function find(data) {
  var current = this.root;
  while (current.data != data) {
    if (data < current.data) {
      current = current.left;
    } else {
      current = current.right;
    }
    if (current == null) {
      return null;
    }
  }
  return current;
}

function getSmallest(node) {
  if (node.left == null) {
    return node;
  } else {
    return getSmallest(node.left);
  }
}

function remove(data) {
  var root = removeNode(this.root, data);
  var node = this.find(data);
  if (node != null) {
    node.count--;
  }
}

function removeNode(node, data) {
  if (node == null) {
    return null;
  }
  if (data == node.data) {
    // node has no children
    if (node.left == null && node.right == null) {
      return null;
    }
    // node has no left child
    if (node.left == null) {
      return node.right;
    }
    // node has no right child
    if (node.right == null) {
      return node.left;
    }
    // node has two children
    var tempNode = getSmallest(node.right);
    node.data = tempNode.data;
    node.right = removeNode(node.right, tempNode.data);
    return node;
  } else if (data < node.data) {
    node.left = removeNode(node.left, data);
    return node;
  } else {
    node.right = removeNode(node.right, data);
    return node;
  }
}

//中序遍历、先序遍历、后序遍历
var nums = new BST();
nums.insert(23);
nums.insert(45);
nums.insert(16);
nums.insert(37);
nums.insert(3);
nums.insert(99);
nums.insert(22);
console.log("InOrder traversal: ");
inOrder(nums.root);
console.log("\n");
console.log("PreOrder traversal: ");
preOrder(nums.root);
console.log("\n");
console.log("PostOrder traversal: ");
postOrder(nums.root);
console.log("\n");
var min = nums.getmin();
console.log("The minimum value of the BST is: " + min);
var max = nums.getmax();
console.log("The maximum value of the BST is: " + max);
inOrder(nums.root);
console.log("\n");
console.log("Search for 16: ");
var value = 16;
var found = nums.find(value);
if (found != null) {
  console.log("Found " + value + " in the BST.");
} else {
  console.log(value + " was not found in the BST.");
}

//计BST中节点数：
//设置BST的计数属性，每insert一个节点计数++，remove一个节点计数--
//但这样我们只能获取到BST根节点及以下的节点个数，而无法获取任一节点及以下的节点数
//故构造函数countNode(node)，选择遍历获取节点数，可选取BST任意一节点作为根节点计算节点数
nums.remove(16);
nums.inOrder(nums.root);
console.log("BST中节点数：");
console.log(nums.countNode(nums.root));
console.log("BST中边的个数：");
console.log(nums.countSide(nums.root));

//对数据计数：
console.log("3: " + nums.countData(3));
console.log("16: " + nums.countData(16));
console.log("22: " + nums.countData(22));
console.log("23: " + nums.countData(23));
console.log("45: " + nums.countData(45));
console.log("99: " + nums.countData(99));
nums.insert(23);
console.log("23: " + nums.countData(23));

//finished
