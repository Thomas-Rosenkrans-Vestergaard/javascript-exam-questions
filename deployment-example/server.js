const express = require('express')
const app = express()
const port = 3009
const log = require('simple-node-logger').createSimpleLogger('project.log');

app.get('/', (req, res) => {
    log.info(`Incomming request ${req.url}`)
    res.send(`internally, this application runs on port ${port}, but is accessable through port 80`)
})

app.listen(port, err => {
    if(err){
        console.error(err)
        return
    }

    console.log(`running on port ${port}`)
})