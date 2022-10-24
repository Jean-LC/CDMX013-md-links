const colors = require('colors');
const fn = require('./fn.js')



module.exports = (receivedPath, receivedCommand) => {
    console.log(receivedCommand)
    return new Promise((resolve, reject) => {
        if (receivedCommand === undefined) {
            getListOfLinks(receivedPath)
                .then((links) => resolve(links))
        } else if (receivedCommand === 'validate') {
            getListOfLinks(receivedPath)
                .then((links) => validateLinks(links))
                .then((data) => resolve(data))
        } else {
            console.log('c')
        }
    })
}

// returns list of links
const getListOfLinks = (path) => {
    return new Promise((resolve, reject) => {
        fn.validateAbsoluteRoute(path)
            .then((realPath) => fn.checkDirOrFile(realPath))
            .then((route => fn.readReceivedFile(route)))
            .then((arr) => resolve(arr))
            .catch((error) => reject(error))
    })
}

// returns list of links with validation
const validateLinks = (arr) => {
    return new Promise((resolve) => {
        let arrFn = []
        for (let i = 0; i < arr.length; i++) {
            arrFn.push(fn.axiosValidation(arr[i]))
        }
        Promise.all(arrFn)
            .then((values) => resolve(values))
    })
}
