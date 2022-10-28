const readFile = require("./read-file.js");
const colors = require('colors')


module.exports = (arg) => {
    const pathReceived = arg[2]
    const validate = arg.includes('--validate')
    const stats = arg.includes('--stats')

    console.log(' Welcome to MdLinks! '.bgYellow.black)
    console.log(('Reading path: ' + pathReceived).yellow + '\n')
    readFile(pathReceived, validate, stats)
        .then((array) => array.forEach((obj) => {
            if (obj.status) {
                console.log(
                    'status: '.cyan + obj.status,
                    '\n',
                    'href: '.cyan + obj.href,
                    '\n',
                    'text: '.cyan + obj.text,
                    '\n',
                    'file: '.cyan + obj.file,
                    '\n'
                )
            } else if (obj.href) {
                console.log(
                    'href: '.cyan + obj.href,
                    '\n',
                    'text: '.cyan + obj.text,
                    '\n',
                    'file: '.cyan + obj.file,
                    '\n'
                )
            } else {
                console.log(obj.cyan)
            }
        }))

        .catch(err => console.log(err.red))
};
