const User = require('../data/User')
const jwt = require('jsonwebtoken');
const config = require('../config')
const error = require('./error')

module.exports = function (req, res, next) {
    const header = req.headers['authorization']
    if (!header)
        return next(error(401, "No authorization header provided."))

    const token = header.replace('Bearer ', '')
    jwt.verify(token, config.JWT_KEY, function (err, decoded) {
        if (err)
            return next(error(401, "Could not verify JWT."))

        req.authorization = decoded
        next()
    });
}