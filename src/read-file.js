const colors = require('colors');
const fn = require('./fn.js')


module.exports = (receivedPath, receivedCommand) => {
    console.log(receivedCommand)
    return new Promise((resolve, reject) => {
        if (receivedCommand === undefined) {
            console.log('a')
            fn.validateAbsoluteRoute(receivedPath)
            .then((realPath) => fn.checkDirOrFile(realPath))
            .then((route => fn.readReceivedFile(route)))
            .then((arr) => resolve(arr))

            .catch((error) => reject(error)) 
        } else if ( receivedCommand === 'validate') {
            console.log('b')
        } else {
            console.log('c')
        }
    })
}
