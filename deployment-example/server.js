const express = require('express')
const app = express()
const port = 3009

app.get('/', (req, res) => {
    res.send(`internally, this application runs on port ${port}`)
})

app.listen(port, err => {
    if(err){
        console.error(err)
        return
    }

    console.log(`running on port ${port}`)
})