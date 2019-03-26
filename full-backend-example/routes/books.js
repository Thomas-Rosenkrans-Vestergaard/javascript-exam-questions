const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('All books')
})

router.get('/:id', (req, res) => {
    res.send('Single book')
})

module.exports = router