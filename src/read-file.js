const colors = require('colors');
const fs = require ('fs');
const path = require('path');
const http = require('http');

module.exports = (receivedPath) => {
    // validates if the received path is absolute
    validateAbsoluteRoute(receivedPath)
        .then((realPath) => checkDirOrFile(realPath))
        .then((message => console.log(message)))
        .catch((error) => console.log(error))
    
    }


// promise to return absolute path always
const validateAbsoluteRoute = (route) => {
    return new Promise((resolve) => {
        if (path.isAbsolute(route)===true) {
            resolve (route)
        } else {
            resolve(turnAbsolute(route))
        }
    })
}

// turns relative path into absoulte path
const turnAbsolute = (relativePath) => path.resolve() + '\\' + relativePath;

// function to filter dir .md files
const filterMdFiles = (route) => {
return new Promise((resolve, reject) => {
    fs.readdir(route, (err, files) => {
        if (err) {
            reject(err)
        } else {
        resolve (files.filter((file) =>  path.extname(file) === '.md'))
        }
    })
})
}


// promise to validate the route exists and validate if it's a dir or a .md file
const checkDirOrFile = (route) => {
    return new Promise ((resolve, reject) => {
        fs.lstat(route, (err, stats) => {
            if (err) {
                console.log('Couldn\'t find: '.red + route.brightRed)
            } else {
            if (stats.isFile() === true) {
                resolve(route)
            } else if (stats.isDirectory() === true) {
                filterMdFiles(route)
                .then ((files) => {
                    if (files.length === 0) {
                        resolve('There are no .md files in the directory'.red)
                    } else {
                        let absoluteFiles = []
                        for (let i = 0; i<files.length; i++) {
                            absoluteFiles.push(turnAbsolute(files[i]))
                        }
                        resolve(absoluteFiles)
                        
                    }
                })
            }
            }
        })
        })
    }

/*
module.exports = (receivedPath) => {
// Validate the route and return a function if it's a file or a dir
    fs.lstat(receivedPath, (err, stats) => {
        if (err) {
             console.log('Couldn\'t find:'.red);
             console.log(receivedPath.brightRed)
        } else {
            if (stats.isFile() === true) {
                // analyze if it's absolte or relative path
                validateDoc(receivedPath)
                .then ((data) => {
                    linksToAnalyze = [];
                   console.log((data.links.filter( link => link.startsWith('http' | 'https://' | '(htt') )).length)
                })
            } else if (stats.isDirectory() === true) {
                // return a list with the files to read
                fs.readdir(receivedPath, (err, files) => {
                    if (err) {
                        console.log('Please try with other dir'.red)
                    } else {
                        console.log('Validating files: '.yellow)
                        console.log(files.filter(file =>  path.extname(file) === '.md'));
                    }
                })
            };
        }
    }) 
} */

/*
let pathTry = path.resolve()
let newPath = pathTry + '\\' + receivedPath
readFile(newPath);
// console.log(path.isAbsolute(receivedPath)) */


// Validates de path to be a MD doc
let validateMDPath = (newPath) => {
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

// reads the doc and transforms the content to a string
let validateDoc = (validPath) => {
    return new Promise ((resolve, reject) => {
        let data= fs.readFileSync(validPath).toString();
        if (data === undefined) {
            reject ('couldn\'t find the path, please try again')
        } else {
            resolve ({
                message: 'Reading data',
                links: data.split(/\n|\r|\s/)

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