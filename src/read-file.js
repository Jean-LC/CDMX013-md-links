const colors = require('colors');
const fs = require('fs');
const path = require('path');
const http = require('http');
let pathDirsList = []
let mdDirFiles = []


module.exports = (receivedPath) => {
    // validates if the received path is absolute
    validateAbsoluteRoute(receivedPath)
        .then((realPath) => checkDirOrFile(realPath))
         .then((route) => console.log('final', route))
        // .then((route => readReceivedFile(route)))

        .catch((error) => console.log(error))
}


// promise to return absolute path always
const validateAbsoluteRoute = (route) => {
    return new Promise((resolve, reject) => {
        if (route === undefined) {
            reject('Please write a path'.red)
        } else if (path.isAbsolute(route) === true) {
            resolve(route)
        } else {
            resolve(turnAbsolute(route))
        }
    })
}

// turns relative path into absoulte path
const turnAbsolute = (relativePath) => path.resolve(__dirname, relativePath);

// promise to validate the route exists and validate if it's a dir or a .md file
const checkDirOrFile = (route) => {
    return new Promise((resolve, reject) => {
        fs.lstat(route, (err, stats) => {
            if (err) {
                reject('Couldn\'t find: '.red + route.brightRed)
            } else {
                if (stats.isFile() === true) {
                    validationMdFile(route)
                        .then((res) => resolve([res]))
                        .catch((res) => reject(res.red))
                } else if (stats.isDirectory() === true) {
                     resolve(functionLoopDir(route))
                    /*pathDirsList.unshift(route)
                    filterMdFiles(pathDirsList)
                    resolve(mdDirFiles.flat()) */
                }
            }
        })
    })
}

// function to loop into every dir
const functionLoopDir = (route, oldValue) => { 
    // routes.forEach(route => {
        let newTryLoop= []
        if(oldValue){  newTryLoop = [...oldValue]}
        console.log("ov", oldValue)
          
     
         let readDirectoryFirst = fs.readdirSync(route);
         const filterThroughEveryDir = readDirectoryFirst.filter(res => fs.lstatSync(route + '\\' + res).isDirectory());
         const innerFolderPaths = filterThroughEveryDir.map(folder => route + '\\' + folder);
         if (innerFolderPaths.length === 0) {
 
             return
         } else {
             
            
         innerFolderPaths.forEach(folder => {
            // console.log('no sale nadaaaa', innerFolderPaths)
             // const innerFolderPaths = path.join(route, folder)
             newTryLoop.push(folder)
             functionLoopDir(folder, newTryLoop)
              // functionLoopDir(folder)
              })
             
            /* innerFolderPaths.forEach(folder => pathDirsList.push(folder));
             functionLoopDir(innerFolderPaths); */
         } 
        //  console.log('uwu', newTryLoop)
         return newTryLoop.flat()
   // });
 }

// validates it's a .md file
let validationMdFile = (route) => {
    return new Promise((resolve, reject) => {
        if (path.extname(route) === '.md') {
            resolve(route)
        } else {
            reject('Try with a .md file')
        }
    })
}

// function to filter dir .md files
const filterMdFiles = (routes) => {
    routes.forEach(route => {
        let dirList = fs.readdirSync(route);
        let dirListWithPath = dirList.map(file => route + '\\' + file)
        let filterDirFiles = dirListWithPath.filter(file => path.extname(file) === '.md')
        mdDirFiles.push(filterDirFiles)
    })
}

// read the file
let readReceivedFile = (routes) => {
    let linksFiltered = []
    routes.forEach((route) => {
        fs.readFile(route, 'utf-8', (err, data) => {
            const regExp = /\[(.+)\]\((https?:\/\/.+)\)/gi;
            let arrayLinks = [...data.matchAll(regExp)]

            if (arrayLinks.length > 0) {
                arrayLinks.forEach(link => {
                    linksFiltered.push({
                        href: link[2],
                        text: link[1],
                        file: route
                    })
                })
                console.log(linksFiltered)
            }

        })





    });
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

// reads the doc and transforms the content to a string
let readMdFile = (validPath) => {
    return new Promise((resolve, reject) => {
        let data = fs.readFileSync(validPath).toString();
        if (data === undefined) {
            reject('couldn\'t find the path, please try again')
        } else {
            resolve({
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