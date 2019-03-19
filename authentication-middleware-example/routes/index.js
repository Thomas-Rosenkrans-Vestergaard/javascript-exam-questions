var express = require('express');
var router = express.Router();
var Jokes = require('../model/jokes')
var jokes = new Jokes()

router.get('/', function(req, res, next){
  res.render('index', {userName: req.session.userName, jokes: jokes.getAllJokes()})
})

router.get('/jokes/random', function(req, res, next) {
  res.render('random_joke', {userName: req.session.userName, joke: jokes.getRandomJoke()})
});

router.get('/jokes/add', function(req, res, next) {
  res.render('add_joke', {userName: req.session.userName})
});

router.post('/jokes/add', function(req, res, next) {
  const joke = req.body.joke;
  jokes.addJoke(joke)
  res.redirect('/')
})

router.get('/login', function(req, res, next){
  res.render('login', {userName: req.session.userName})  
})

module.exports = router;
