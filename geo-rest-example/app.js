const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

mongoose.connect('mongodb+srv://node:JegIKaZo1nrw866r@cluster0-kedzx.mongodb.net/geo-rest-example?authSource=admin&retryWrites=true', { createIndexes: true, useNewUrlParser: true });

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', require('./routes/api'))

module.exports = app