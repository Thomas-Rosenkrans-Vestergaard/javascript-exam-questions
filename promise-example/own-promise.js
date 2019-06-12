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


const url = "http://google.com"; 
get(url)
    .then(response => console.log(response.statusCode))
    .catch(e => console.error("An error occured: " + e.message));

(async function () {
    try {
        const response = await get(url)
        console.log(response.statusCode)
    } catch (e) {
        console.error("An error occured: " + e.message)
    }
})()