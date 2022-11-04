module.exports = jest.fn((urlReceived) => {
    return new Promise((resolve, reject) => {
        if(urlReceived.url === 'https://nodejs.or'){
            reject({ response: {status: '404'}})
        } else {
            resolve({ statusText: 'OK', status: '200'})
        }
    })
})