function Dictionary() {
   this.add = add;
   this.datastore = new Array();
   this.find = find;
   this.remove = remove;
   this.showAll = showAll;
   this.count = count;
   this.clear = clear;
}

function add(key, value) {
   this.datastore[key] = value;
}

function find(key) {
   return this.datastore[key];
}

function remove(key) {
   delete this.datastore[key];
}

function showAll() {
   Object.keys(this.dataStore).forEach(function (key) {
      console.log(key + " -> " + this.datastore[key]);
   },this);
}

function count() {
   var n = 0;
   Object.keys(this.dataStore).forEach(function (key){
      ++n;
   },this);
   return n;
}

function clear() {
   Object.keys(this.dataStore).forEach(function (key){
      delete this.datastore[key];
   },this);
}
