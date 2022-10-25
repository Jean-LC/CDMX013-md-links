const fn = require('./fn.js')

module.exports = (receivedPath, firstCommand, secondCommand) => {
    return new Promise((resolve) => {
        if (secondCommand) {
            getListOfLinks(receivedPath)
                .then((links) => fn.validateLinks(links))
                .then((data) => resolve(fn.statsLinks(data, secondCommand)))
                .catch((error) => resolve(error))
        } else if (firstCommand === undefined) {
            getListOfLinks(receivedPath)
                .then((links) => resolve(links))
                .catch((error) => resolve(error))
        } else if (firstCommand === 'validate') {
            getListOfLinks(receivedPath)
                .then((links) => fn.validateLinks(links))
                .then((data) => resolve(data))
                .catch((error) => resolve(error))
        } else if (firstCommand === 'stats') {
            getListOfLinks(receivedPath)
                .then((links) => resolve(fn.statsLinks(links)))
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
