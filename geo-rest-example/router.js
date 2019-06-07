const express = require('express');
const router = express.Router();
const Facade = require('./facade')

router.get('/cities/near', async (req, res) => {
    const {lng, lat, maxDistance} = req.query
    const nearby = await Facade.findNearby(Number(lng), Number(lat), Number(maxDistance))
    res.json(nearby)
});

router.post('/cities', (req, res) => {

});

module.exports = router;