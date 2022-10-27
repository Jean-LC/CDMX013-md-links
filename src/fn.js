const fs = require('fs');
const path = require('path');
const axios = require('axios');

let pathDirsList = []
let mdDirFiles = []
 
// promise to return absolute path always
 const validateAbsoluteRoute = (route) => {
    return new Promise((resolve, reject) => {
        if (route === undefined) {
            reject('Please write a path')
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
                reject('Couldn\'t find: ' + route)
            } else {
                if (stats.isFile() === true) {
                    validationMdFile(route)
                        .then((res) => resolve([res]))
                        .catch((res) => reject(res.red))
                } else if (stats.isDirectory() === true) {
                    functionLoopDir([route])
                    pathDirsList.unshift(route)
                    filterMdFiles(pathDirsList)
                    resolve(mdDirFiles.flat())
                }
            }
        })
    })
}

// function to loop into every dir
const functionLoopDir = (routes) => {
    routes.forEach(route => {
        const readDirectoryFirst = fs.readdirSync(route);
        const filterThroughEveryDir = readDirectoryFirst.filter(res => fs.lstatSync(route + '\\' + res).isDirectory());
        const innerFolderPaths = filterThroughEveryDir.map(folder => route + '\\' + folder);
        if (innerFolderPaths === 0) {
            return
        } else {
            innerFolderPaths.forEach(folder => pathDirsList.push(folder));
            functionLoopDir(innerFolderPaths);
        }
    });
}


// validates it's a .md file
const validationMdFile = (route) => {
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
const readReceivedFile = (routes) => {
    let linksFiltered = []
    return new Promise((resolve) => {

        if (routes.length > 0) {
            // readLinks(routes)
            routes.forEach((route) => {
                let data = fs.readFileSync(route, 'utf-8')
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
                }
            })    
        } 
        resolve(linksFiltered)
    })
}

const axiosValidation = (element) => {
    return new Promise((resolve) => {
            axios({
                url: element.href
            }) .then((data) => {
                    resolve({
                        status: data.statusText + ': ' + data.status,
                        href: element.href,
                        text: element.text,
                        file: element.file
                    })    
            })
            .catch( () => resolve({
                status: 'FAIL: 404',
                href: element.href,
                text: element.text,
                file: element.file
            }))
    })      
}


// returns list of links with validation
const validateLinks = (arr) => {
    return new Promise((resolve) => {
        let arrFn = []
        for (let i = 0; i < arr.length; i++) {
            arrFn.push(axiosValidation(arr[i]))
        }
        Promise.all(arrFn)
            .then((values) => resolve(values))
    })
}

// returns stats of links
const statsLinks = (arr, command) => {
    let countLinks = []
    let countFiles = new Set()
    let countValidatedTrue = []
    let countValidatedFalse = []
    let finalArray = []

    if (command) {
        for (let i = 0; i < arr.length; i++) {
            countLinks.push(arr[i].href)
            countFiles.add(arr[i].file)
            if (arr[i].status === 'FAIL: 404') {
                countValidatedFalse.push(arr[i].status)
            } else {
                countValidatedTrue.push(arr[i].status)
            }
        }
        finalArray = [
            'files: ' + countFiles.size,
            'links: ' + countLinks.length,
            'OK links: ' + countValidatedTrue.length,
            'Failed links: ' + countValidatedFalse.length
        ]

    } else {
        for (let i = 0; i < arr.length; i++) {
            countLinks.push(arr[i].href)
            countFiles.add(arr[i].file)
        }
        finalArray = [
            'files: ' + countFiles.size,
            'links: ' + countLinks.length,
        ]
    }

    return (finalArray)
} 

// export functions
module.exports = {
    validateAbsoluteRoute, 
    checkDirOrFile, 
    readReceivedFile,
    axiosValidation,
    validateLinks,
    statsLinks
}