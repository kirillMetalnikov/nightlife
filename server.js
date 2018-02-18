var express = require('express')
var passport = require('passport')
var session = require('express-session')
//var fallback = require('express-history-api-fallback');
var bodyParser = require('body-parser')
var mongoose = require('mongoose')

var app = express()
require('./app/config/passport')(passport)

mongoose.connect(process.env.MONGO_URI)

app.use(bodyParser.json())
app.use('/client', express.static(process.cwd() + '/client'))
app.use('/public', express.static(process.cwd() + '/client/public'))
app.use(session({
	secret: process.env.SESSION_KEY,
	resave: false,
	saveUninitialized: true,
	maxAge: 60000,
	expires: 60000
}));
app.use(passport.initialize())
app.use(passport.session())


require('./app/routes/index.js')(app, passport)

var port = process.env.PORT || 8080
app.listen(port, () => {
  console.log(`Node.js is listening on port ${port}...`)
})
