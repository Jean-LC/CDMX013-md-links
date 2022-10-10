const readFile = require ('./read-file.js');

let receivedPath = process.argv[2];

readFile(receivedPath);
