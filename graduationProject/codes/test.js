const tf = require("@tensorflow/tfjs");
const  a = [2,6];
const  b = [1,4];
const c = a.map((item, idx) => [item, b[idx]]);
console.log(c);
console.log(c.length);
d = c.map(d => console.log(d))