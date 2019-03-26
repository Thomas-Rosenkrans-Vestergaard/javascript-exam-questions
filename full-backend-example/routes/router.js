const express = require('express')
const router = express.Router()

const books = require('./books')
const authors = require('./authors')

router.use('/books', books)
router.use('/authors', authors)

module.exports = router