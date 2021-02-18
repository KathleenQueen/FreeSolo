const fs = require('fs');
const d3 = require('d3-node')().d3;
const csvString = fs.readFileSync('train.csv').toString();
const data = d3.csvParse(csvString);
console.log(data)
const datasets = data.map(d => d.date - "")
console.log(datasets);