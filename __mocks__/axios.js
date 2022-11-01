module.exports = (urlReceived) => {
    return new Promise((resolve, reject) => {
        if(urlReceived.url === 'https://nodejs.or'){
            reject()
        } else {
            resolve({ statusText: 'OK', status: '200'})
        }
    })
}