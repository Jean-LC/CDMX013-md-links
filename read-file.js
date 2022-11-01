const fn = require('./fn.js')

module.exports = (receivedPath, validate, stats) => {
    return new Promise((resolve, reject) => {
        if (validate === true && stats === true) {
            fn.getListOfLinks(receivedPath)
                .then((links) => fn.validateLinks(links))
                .then((data) => resolve(fn.statsLinks(data, stats)))
                .catch((error) => reject(error))
        } else if (validate === false && stats === false) {
            fn.getListOfLinks(receivedPath)
                .then((links) => resolve(links))
                .catch((error) => reject(error))
        } else if (validate === true) {
            fn.getListOfLinks(receivedPath)
                .then((links) => fn.validateLinks(links))
                .then((data) => resolve(data))
                .catch((error) => reject(error))
        } else if (stats === true) {
            fn.getListOfLinks(receivedPath)
                .then((links) => resolve(fn.statsLinks(links)))
                .catch((error) => reject(error))
        } else {
            reject('Try again')
        }
    })
}
