//拓扑排序法
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

var g =new Graph(6);
g.addEdge(1,2);
g.addEdge(2,5);
g.addEdge(1,3);
g.addEdge(2,4);
g.addEdge(0,1);
g.vertexList = ["CS1","CS2","Data Structures","Assembly Language","Operating Systems","Algorithms"];
g.showGraph();
g.topSort();

//finished