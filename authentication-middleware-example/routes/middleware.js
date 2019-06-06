function authenticationMiddleware(req, res, next) {
    if (!req.session.userName) {
        res.redirect('/login')
        return
    }

    next()
}

module.exports = { authenticationMiddleware }