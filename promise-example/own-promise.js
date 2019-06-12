const request = require('request')

function get(url) {
    return new Promise((resolve, reject) => {
        request.get(url, function (err, response, body) {
            if (err) {
                reject(err)
                return;
            }

            resolve({
                ...response,
                body
            })
        })
    })
}

get("http://google.com")
    .then(response => console.log(Object.keys(response)))
    .catch(e => {
        console.error("An error occured")
        console.error(e)
    })
