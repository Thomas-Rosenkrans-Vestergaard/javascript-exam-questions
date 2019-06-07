const mongoose = require('mongoose')
const config = require('./config')

module.exports = () => {
    mongoose.connect(config.MONGO_URL, { createIndexes: true, useNewUrlParser: true }, (err) => {
        if (err) {
            console.error("Could not connect to MongoDB:")
            console.error(err)
            return
        }

        console.log("Successfully connected to MongoDB.")
    });
}