const readFile = require ('./read-file.js');
const path = require ('path');
let receivedPath = process.argv[2];

readFile(receivedPath);
console.log(path.extname(receivedPath));
