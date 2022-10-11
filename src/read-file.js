const colors = require('colors');
const fs = require ('fs');
const path = require('path');
const http = require('http');


module.exports = (receivedPath) => {
    validatePath(receivedPath)
        .then((elements) => {
            console.log(elements.message.green);
            /*validateDoc(elements.validPath)
                .then((elements) => {
                    console.log(elements.message.yellow)
                })
                .catch((message) => {
                    console.log(message)
                }) */
        }) 
        .catch((message) => {
            console.log(message.red);
        })
};

let validatePath = (newPath) => {
    return new Promise((resolve, reject) => {
        if (path.extname(newPath)===undefined) {
            reject ('Try being more specific')
        } else if (path.extname(newPath) !== '.md') {
            reject ('Invalid path, try again')
        } else {
            resolve ({
                message: 'Correct path!',
                validPath: newPath
            })
        }
})}

let validateDoc = (validPath) => {
    return new Promise ((resolve, reject) => {
        let data= fs.readFileSync(validPath).toString();
        if (data === undefined) {
            reject ('couldn\'t find the path, please try again')
        } else {
            resolve ({
                message: 'Reading data',
                data: data.split(" ")
            })
        }
    })
}
/*
module.exports = (receivedPath) => {
    if ( path.extname(receivedPath) === '.md') {
     let receivedFile = fs.readFileSync(receivedPath).toString();
     // let arrayFile = receivedFile.split(" ")
    //  console.log(arrayFile.filter((item) => item == 'http:' ))
    getStatus(receivedFile);
}
// console.log('Intenta con un archivo MD');
};

const fetchLinks = (file) => {

}

const getStatus = (receivedUrl) => {
    http.get(receivedUrl, (response) => {
      let status = response.statusCode;
      if ( status === 404) {
       return console.log('incorrecto: ' + receivedUrl);
      }
       return console.log('correcto: ' + receivedUrl)
    })
} */