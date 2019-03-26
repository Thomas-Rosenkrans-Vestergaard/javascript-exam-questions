const express = require('express')
const router = express.Router()

function errorHandler(err, req, res, next) {
    console.log(err)
    err.status = err.status || 400
    res.status(err.status)
    res.json(err)
}

router.use('/users', require('./users'))
router.use('/locations', require('./locations'))
router.use(errorHandler)

module.exports = router