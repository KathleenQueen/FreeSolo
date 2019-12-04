//编写一个程序，测试广度优先和深度优先这两种图搜索算法哪一种速度更快。
//请使用不同大小的图来测试你的程序。

//个人猜想是广度优先更快，同一行找未marked，不需要跳来跳去的

//猜想错误：广度优先属于一种盲目搜寻法，目的是系统地展开并检查图中的所有节点，以找寻结果。
//换句话说，它并不考虑结果的可能位置，彻底地搜索整张图，直到找到结果为止。
//深度优先即在搜索其余的超链结果之前必须先完整地搜索单独的一条链。

//广度优先有出栈入栈的回溯操作，运行速度慢
//海量数据选择深度优先搜索算法

function Graph(v) {
    this.vertices = v;
    this.vertexList = [];
    this.edges = 0;
    this.adj = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.adj[i] = [];
    }
    this.addEdge = addEdge;
    this.showGraph = showGraph;
    this.dfs = dfs;
    this.marked = [];
    for (var i = 0; i < this.vertices; ++i) {
        this.marked[i] = false;
    }
    this.bfs = bfs;
    this.edgeTo = [];
    this.hasPathTo = hasPathTo;
    this.pathTo = pathTo;
    this.topSort = topSort;
}

function topSort() {
    var stack = [];
    var visited = [];
    for (var i = 0; i < this.vertices; i++) {
        visited[i] = false;
    }
    for (var i = 0; i < this.vertices; i++) {
        if (visited[i] == false) {
            topSortHelper(this.adj, i, visited, stack);
        }
    }
    while ((t = stack.pop()) != undefined) {
        console.log(this.vertexList[t]);
    }
}

function topSortHelper(arr, v, visited, stack) {
    visited[v] = true;
    for (var j = 0; arr[v][j] != undefined; j++){
        var t = arr[v][j];
        if(!visited[t]){
            topSortHelper(arr,t,visited,stack)
        }
    }
    stack.push(v);
}

function addEdge(v,w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
    this.edges++;
}



//display numbers
function showGraph() {
   for (var i = 0; i < this.vertices; ++i) {
      console.log(i + " -> ");
      for (var j = 0; j < this.vertices; ++j) {
         if (this.adj[i][j] != undefined)
            console.log(this.adj[i][j] + ' ');
      }
      console.log();
   }
}

// //a new function to display symbolic names instead of numbers
// function showGraph() {
//     for (var i = 0; i < this.vertices; ++i) {
//         console.log(this.vertexList[i] + " -> ");
//         for (var j = 0; j < this.vertices; ++j) {
//             if (this.adj[i][j] != undefined) {
//                 var t=this.adj[i][j];
//                 console.log(this.vertexList[t] + ' ');
//             }
//         }
//     }
//     console.log();
// }


function dfs(v) {
    this.marked[v] = true;
    if (this.adj[v] != undefined) {
        console.log("Visited vertex: " + v);
    }
    for (var j = 0; j < this.adj[v][j]; ++j){
        var item = this.adj[v][j];
        if(!this.marked[item]){
            this.dfs(item);
        }
    }
}

function bfs(s) {
    var queue = [];
    this.marked[s] = true;
    queue.unshift(s);
    while (queue.length > 0) {
        var v = queue.shift();
        if (this.adj[v] != undefined) {
            console.log("Visited vertex: " + v);
        }
        for (var j = 0; j < this.adj[v].length; ++j) {
            item = this.adj[v][j];
            if (!this.marked[item]) {
                //this.edgeTo[item] = v;
                this.marked[item] = true;
                queue.push(item);
            }
        }

    }
}

function hasPathTo(v) {
    return this.marked[v];
}

function pathTo(v) {
    var source = 0;
    if (!this.hasPathTo(v)) {
        return undefined;
    }
    var path = [];
    for (var i = v; i != source; i = this.edgeTo[i]) {
        path.push(i);
    }
    path.push(s);
    return path;
}

//图1

var g = new Graph(6);
g.addEdge(1,2);
g.addEdge(2,5);
g.addEdge(1,3);
g.addEdge(2,4);
g.addEdge(0,1);
g.vertexList = ["CS1","CS2","Data Structures","Assembly Language","Operating Systems","Algorithms"];//由前至后无环图
//g.showGraph();
console.log("bfs:");
var time1 = new Date();
g.bfs(0);
var time2 = new Date();
console.log("dfs:");
for (var i = 0; i < g.vertices; ++i) {
    g.marked[i] = false;
}
var time3 = new Date();
g.dfs(0);
var time4 = new Date();
//输出为：各有快慢

/*
//图2
var g2 = new Graph(25);
g2.addEdge(0,1);g2.addEdge(1,2);g2.addEdge(2,3);g2.addEdge(3,4);
g2.addEdge(5,6);g2.addEdge(6,7);g2.addEdge(7,8);g2.addEdge(8,9);
g2.addEdge(10,11);g2.addEdge(11,12);g2.addEdge(12,13);g2.addEdge(13,14);
g2.addEdge(15,16);g2.addEdge(16,17);g2.addEdge(17,18);g2.addEdge(18,19);
g2.addEdge(20,21);g2.addEdge(21,22);g2.addEdge(22,23);g2.addEdge(23,24);
g2.addEdge(0,5);g2.addEdge(5,10);g2.addEdge(10,15);g2.addEdge(15,20);
g2.addEdge(4,9);g2.addEdge(9,14);g2.addEdge(14,19);g2.addEdge(19,24);
g2.addEdge(1,7);g2.addEdge(2,6);g2.addEdge(3,9);g2.addEdge(4,8);
g2.addEdge(11,17);g2.addEdge(12,16);g2.addEdge(13,19);g2.addEdge(14,18);
g2.addEdge(16,22);g2.addEdge(17,21);g2.addEdge(18,24);g2.addEdge(19,23);
//g2.showGraph();
console.log("bfs:");
var time1 = new Date();
g2.bfs(0);
var time2 = new Date();
console.log("dfs:");
for (var i = 0; i < g2.vertices; ++i) {
    g2.marked[i] = false;
}
var time3 = new Date();
g2.dfs(0);
var time4 = new Date();
*/

console.log(time1.getTime()+" "+time2.getTime()+" "+time3.getTime())
var timeBfs = time2.getTime() - time1.getTime();//ms
var timeDfs = time4.getTime() - time3.getTime();
console.log(timeBfs  + ":" + timeDfs);
if(timeBfs > timeDfs){
    console.log("深度优先搜索算法快于广度优先搜索算法");
}
else if((timeBfs <timeDfs)){
    console.log("广度优先搜索算法快于深度优先搜索算法");
}
else {
    console.log("一样快");
}
//输出为：深度优先算法快于广度优先算法

fs = require("fs");
for (var i = 0; i < g.vertices; ++i) {
    fs.writeFile("graphForTest11_1&2.txt",i + " -> ",(err)=>{
        console.log("写入成功")
    });
    for (var j = 0; j < this.vertices; ++j) {
        if (this.adj[i][j] != undefined)
            fs.writeFile("graphForTest11_1&2.txt",this.adj[i][j] + ' ',(err)=>{
            console.log("写入成功")
        });
    }
    fs.writeFile("graphForTest11_1&2.txt", " ",(err)=>{
        console.log("写入成功")
    });
}
