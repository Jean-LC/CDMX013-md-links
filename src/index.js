const readFile = require ('./read-file.js');
let receivedPath = process.argv[2];
const path = require ('path');


readFile(receivedPath);
