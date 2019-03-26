const express = require('express')
const router = express.Router()
const User = require('../data/User')
const { check, validationResult } = require('express-validator/check');

function error(status, message, validationErrors) {
    return {
        status, message, errors: validationErrors.array()
    }
}

const registrationValidators = [
    check('email').isEmail().withMessage("Must be a valid email address."),
    check('password').isLength({ min: 6 }).withMessage('Must have length 6 or more.')
]

router.post('/register', registrationValidators, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return next(error(422, "Could not perform registration", errors))

    const { email, password } = req.body
    User.register(email, password, (err, created) => {
        if (err)
            return next(err(422, err))

        res.status(201)
        res.json(created)
    })
})

const authenticationValidators = [
    check('email').exists().withMessage("Must not be null."),
    check('password').exists().withMessage("Must not be null.")
]

router.post('/authenticate', authenticationValidators, (req, res, next) => {
    const errors = validationResult(req)
    if (!errors.isEmpty())
        return next(error(422, "Could not perform authentication", errors))

    const { email, password } = req.body
    User.authenticate(email, password, (err, authenticated) => {
        if (err)
            return next(error(401, err))

        res.status(400)
        res.json(authenticated)
    })
})

module.exports = router