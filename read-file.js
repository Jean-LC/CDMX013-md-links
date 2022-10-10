const fs = require ('fs');
const path = require('path');
const http = require('http');

module.exports = (receivedPath) => {
    if ( path.extname(receivedPath) === '.md') {
     let receivedFile = fs.readFileSync(receivedPath).toString();
     getStatus(receivedFile);
};
};

const getStatus = (receivedUrl) => {
    http.get(receivedUrl, (response) => {
      let status = response.statusCode;
      if ( status === 404) {
       return console.log('incorrecto: ' + receivedUrl);
      }
       return console.log('correcto: ' + receivedUrl)
    })
}