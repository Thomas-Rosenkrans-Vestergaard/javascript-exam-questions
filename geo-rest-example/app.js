const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const mongooseConnect = require('./mongooseConnect')
const bodyParser = require('body-parser')

mongooseConnect()
const app = express()

app.use(cors())
// app.use(express.json());
app.use(bodyParser.json());
app.use('/api', require('./router'))

module.exports = app