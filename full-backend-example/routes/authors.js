const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.send('All authors')
})

router.get('/:id', (req, res) => {
    res.send('Single authors')
})

module.exports = router