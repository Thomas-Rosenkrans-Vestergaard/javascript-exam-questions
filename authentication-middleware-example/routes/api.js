var express = require('express');
var router = express.Router();
var Jokes = require('../model/jokes')
var jokes = new Jokes()

router.get('/jokes/random', (req, res) => {
    res.json(jokes.getRandomJoke())
});

router.get('/jokes', (req, res) => {
    res.json(jokes.getAllJokes())
});

router.post('/jokes', (req, res) => {
    const joke = req.body.joke;
    jokes.addJoke(joke)
    res.json(joke)
});

module.exports = router