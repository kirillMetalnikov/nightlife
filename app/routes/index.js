var searchHandler = require('../controllers/search')
var subscribeHandler = require('../controllers/subscribe')
var path = process.cwd()

function isLoggedIn (req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  } else {
    res.json({type: 'need_login', message: 'You need login'})
  }
}

module.exports = function(app, passport) {
  app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/client/public/index.html');
		})

  app.route('/auth/github/')
    .get(passport.authenticate('github'))
  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/',
			failureRedirect: '/failure'
    }))

  app.route('/auth/google/')
    .get(passport.authenticate('google', { scope: ['profile'] }))
  app.route('/auth/google/callback')
    .get(passport.authenticate('google', {
      successRedirect: '/',
			failureRedirect: '/failure'
    }))

  app.route('/failure')
    .get( (req, res) => {
      res.json({autht: 'failure'})
    })

  app.route('/logout')
		.get(function (req, res) {
			req.logout();
			res.redirect('/');
		});
    
  app.route('/search/:location')
    .get(searchHandler)

  app.route('/subscribe/:id')
    .put(isLoggedIn, subscribeHandler)
}
