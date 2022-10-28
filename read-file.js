const fn = require('./fn.js')

module.exports = (receivedPath, validate, stats) => {
    return new Promise((resolve, reject) => {
        if (validate === true && stats === true) {
            getListOfLinks(receivedPath)
                .then((links) => fn.validateLinks(links))
                .then((data) => resolve(fn.statsLinks(data, stats)))
                .catch((error) => reject(error))
        } else if (validate === false && stats === false) {
            getListOfLinks(receivedPath)
                .then((links) => resolve(links))
                .catch((error) => reject(error))
        } else if (validate === true) {
            getListOfLinks(receivedPath)
                .then((links) => fn.validateLinks(links))
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        } else if (stats === true) {
            getListOfLinks(receivedPath)
                .then((links) => resolve(fn.statsLinks(links)))
                .catch((error) => reject(error))
        } else {
            reject('Try again')
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
