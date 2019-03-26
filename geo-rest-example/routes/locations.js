const express = require('express')
const router = express.Router()
const authorization = require('./authorization')

router.use(authorization)

// Retrieve all my locations
router.get('/', (req, res) => {
    res.json([])
});

module.exports = router