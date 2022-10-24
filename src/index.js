const readFile = require ('./read-file.js');
let receivedPath = process.argv[2];
let receivedCommand = process.argv[3]


readFile(receivedPath, receivedCommand)
.then ((message) => console.log(message));
