const express = require('express');
const router = express.Router();
const Jokes = require('../model/jokes')
const jokes = new Jokes()
const { authenticationMiddleware } = require('./middleware')


router.get('/login', function (req, res, next) {
  res.render('login')
})

router.post('/login', function (req, res, next) {
  const userName = req.body.userName
  if (userName) {
    req.session.userName = userName;
    res.redirect('/')
    return
  }

  res.redirect('/login')
})

router.get('/logout', function (req, res) {
  req.session.userName = null
  res.redirect('/login')
})

router.use('/', authenticationMiddleware)

router.get('/', function (req, res, next) {
  console.log(req.session.userName)
  res.render('index', { userName: req.session.userName, jokes: jokes.getAllJokes() })
})

router.get('/jokes/random', function (req, res, next) {
  res.render('random_joke', { userName: req.session.userName, joke: jokes.getRandomJoke() })
});

router.get('/jokes/add', function (req, res, next) {
  res.render('add_joke', { userName: req.session.userName })
});

router.post('/jokes/add', function (req, res, next) {
  const joke = req.body.joke;
  jokes.addJoke(joke)
  res.redirect('/')
})

module.exports = router;
