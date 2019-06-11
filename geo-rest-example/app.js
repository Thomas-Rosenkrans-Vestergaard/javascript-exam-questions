const express = require('express')
const cors = require('cors')
const mongooseConnect = require('./mongooseConnect')
const bodyParser = require('body-parser')

mongooseConnect()
const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use('/api', require('./router'))

module.exports = app