var searchHandler = require('../controllers/search')
var path = process.cwd()

module.exports = function(app, passport) {
  app.route('/')
		.get((req, res) => {
			res.sendFile(path + '/client/public/index.html');
		})

  app.route('/auth/github/')
    .get(passport.authenticate('github'))
  app.route('/auth/github/callback')
    .get(passport.authenticate('github', {
      successRedirect: '/success',
			failureRedirect: '/failure'
    }))

  app.route('/auth/google/')
    .get(passport.authenticate('google', { scope: ['profile'] }))
  app.route('/auth/google/callback')
    .get(passport.authenticate('google', {
      successRedirect: '/success',
			failureRedirect: '/failure'
    }))

  app.route('/success')
    .get( (req, res) => {
      res.json({autht: 'success'})
    })
  app.route('/failure')
    .get( (req, res) => {
      res.json({autht: 'failure'})
    })

  app.route('/search/:location')
    .get(searchHandler)
}
