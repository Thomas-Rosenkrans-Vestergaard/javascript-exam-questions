const express = require('express')
const serverDebug = require('debug')('app:http:server')
const requestDebug = require('debug')('app:http:request')
const calculatorDebug = require('debug')('app:calculator')
const Calculator = require('./Calculator')

console.log("DEBUG=" + process.env.DEBUG)

const port = 3002;
const app = express()
const calculator = new Calculator()

app.set('json spaces', 4)

function handle(op, req, res) {

    const method = calculator[op]
    if (!method) {
        calculatorDebug(`Could not find operation ${op}`)
        res.json({ error: `Cannot find operation ${op}`})
        return null
    }

    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);
    const result = method(a, b)

    calculatorDebug(`${a} ${op} ${b} equals ${result}`)

    res.json({ op, a, b, result })
}

app.use((req, res, next) => {
    requestDebug(`Incoming request ${req.url}`)
    next()
});

app.get('/:op/:a/:b', (req, res) => {
    handle(req.params.op, req, res)
});

app.listen(port, err => {
    if (err) {
        serverDebug("Count not create server")
        serverDebug(err)
        return;
    }

    serverDebug(`Server listening on port ${port}.`)
})