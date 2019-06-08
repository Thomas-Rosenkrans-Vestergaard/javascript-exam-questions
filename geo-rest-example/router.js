const express = require('express');
const router = express.Router();
const Facade = require('./facade')

router.get('/cities/near', async (req, res) => {
    const {latitude, longitude, maxDistance} = req.query
    if(!latitude || !longitude || !maxDistance)
        return res.json(await Facade.all())
    const nearby = await Facade.findNearby(Number(longitude), Number(latitude), Number(maxDistance))
    res.json(nearby)
});

router.post('/cities/within', async (req, res) => {
    const within = await Facade.findWithin(req.body)
    res.json(within)
});

router.post('/cities', async (req, res) => {
    res.json(await Facade.createCity(req.body))
});

module.exports = router;