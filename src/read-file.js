const colors = require('colors');
const fn = require('./fn.js')



module.exports = (receivedPath, firstCommand, secondCommand) => {
    return new Promise((resolve) => {
        if (secondCommand) {
            getListOfLinks(receivedPath)
                .then((links) => validateLinks(links))
                .then((data) => resolve(statsLinks(data, secondCommand)))
                .catch((error) => resolve(error))
        } else if (firstCommand === undefined) {
            getListOfLinks(receivedPath)
                .then((links) => resolve(links))
                .catch((error) => resolve(error))
        } else if (firstCommand === 'validate') {
            getListOfLinks(receivedPath)
                .then((links) => validateLinks(links))
                .then((data) => resolve(data))
                .catch((error) => resolve(error))
        } else if (firstCommand === 'stats') {
            getListOfLinks(receivedPath)
                .then((links) => resolve(statsLinks(links)))
                .catch((error) => resolve(error))
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
        console.log(arrFn)
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