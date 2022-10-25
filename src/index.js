const readFile = require('./read-file.js');
let receivedPath = process.argv[2];
let firstCommand = process.argv[3];
let secondCommand = process.argv[4];

readFile(receivedPath, firstCommand, secondCommand)
    .then((message) => console.log(message));
