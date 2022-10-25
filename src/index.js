const readFile = require('./read-file.js');

module.exports = (path, firstComm, secondComm) => {
    readFile(path, firstComm, secondComm)
    .then((message) => console.log(message)); 
}
