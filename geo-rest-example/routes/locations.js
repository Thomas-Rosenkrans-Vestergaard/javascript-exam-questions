const express = require('express')
const router = express.Router()
const authorization = require('./authorization')
const User = require('../data/User')
const error = require('./error')
const {point} = require('../data/Location')
const { check, validationResult } = require('express-validator/check');

router.use(authorization)

// Retrieve all my locations
router.get('/', (req, res, next) => {
    const { user } = req
    res.json(user.locations)
});

const locationValidation = [
    check('comment').isLength({ min: 5 }).withMessage("Comment must have length greater than 4."),
    check('coordinates').isArray().withMessage("Coordinates must be latitude and longitude.")
]

router.post('/', locationValidation, (req, res, next) => {
    const { user } = req
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return next(error(422, "Could not validate location.", errors))

    req.body.coordinates = point(req.body.coordinates)
    user.locations.push(req.body)
    user.save((err, ) => {
        if (err)
            return next(error(400, "Could not save the location.", err))

        res.status(201)
        res.json(user.locations[user.locations.length - 1])
    })
})

module.exports = router