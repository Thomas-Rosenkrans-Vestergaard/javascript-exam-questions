function createApplication(database) {

    const express = require('express')
    const app = express()

    app.set('json spaces', 2)
    app.use(express.json())

    app.get('/people', async function (req, res) {
        const result = await database.all()
        res.json(result)
    })

    app.get('/people/:id', async function (req, res) {
        const result = await database.get(req.params.id)
        if (!result) {
            res.status(404)
            res.json({
                message: "Could not find person"
            })
        } else {
            res.json(result)
        }
    })

    app.post('/people', async function (req, res) {
        const result = await database.add(req.body)
        res.status(201)
        res.json(result)
    })

    app.put('/people/:id', async function (req, res) {
        const result = await database.put(req.params.id, req.body)
        if (!result) {
            res.status(404)
            res.json({
                message: "Could not find person"
            })
        } else {
            res.json(result)
        }
    })

    app.delete('/people/:id', async function (req, res) {
        const result = await database.delete(req.params.id)
        if (!result) {
            res.status(404)
            res.json({
                message: "Could not find person"
            })
        } else {
            res.json(result)
        }
    })

    return app
}

module.exports = createApplication