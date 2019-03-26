module.exports = function error(status, message, validationErrors) {
    const o = {
        status, message
    }

    if (validationErrors)
        o.errors = validationErrors.array()

    return o
}