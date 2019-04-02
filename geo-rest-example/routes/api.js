const express = require('express')
const router = express.Router()

function errorHandler(err, req, res, next) {
    console.error(err)
    err.status = err.status || 400
    res.status(err.status)
    res.json(err)
}

router.use('/account', require('./account'))
router.use('/locations', require('./locations'))
router.use(errorHandler)

module.exports = router