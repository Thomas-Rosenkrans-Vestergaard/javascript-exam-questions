const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./config')

mongoose.connect(config.MONGO_URL, { createIndexes: true, useNewUrlParser: true }, (err) => {
    if(err){
        console.error("Could not connect to MongoDB:")
        console.error(err)
        return
    }

    console.log("Successfully connected to MongoDB.")
});

const app = express()

app.use(cors())
app.use(express.json());
app.use('/api', require('./routes/api'))

module.exports = app