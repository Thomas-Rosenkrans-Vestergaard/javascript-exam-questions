const express = require('express')
const port = 3004
const app = express()
const hbs = require( 'express-handlebars');
const createData = require('./createData')

const {genres, books} = createData()

app.use(express.static('./public'))
app.set('view engine', 'hbs');

app.engine( 'hbs', hbs( {
  extname: 'hbs',
  defaultView: 'default',
  layoutsDir: __dirname + '/views/layouts',
  partialsDir: __dirname + '/views/partials'
}));

app.get('/', function(req, res) {
    res.render('home', {layout: 'default'})
});

app.get('/dynamic', function(req, res) {
    res.render('dynamic', {layout: 'default', genres, books})
});

app.listen(port)
console.log(`Listening on port ${port}`)
