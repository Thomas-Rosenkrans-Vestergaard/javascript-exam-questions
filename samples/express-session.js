const express = require('express')
const session = require('express-session')
const app = express()

app.use(session({secret: '|^3x"<EP65z+(lK`Q\ECuGre'})) // apply the session middleware to the entire apps

app.get('/', function(req, res) {
    if(!req.session.visits)
        req.session.visits = 1
    else
        req.session.visits++;

    res.send(`Numbers of visits: ${req.session.visits}`);
})