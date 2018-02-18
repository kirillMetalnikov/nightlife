var GitHubStrategy = require('passport-github').Strategy
var GoogleStrategy = require('passport-google-oauth20').Strategy

var User = require('../models/users')

module.exports = (passport) => {
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  })

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
			done(err, user);
		});
  })


	passport.use(new GitHubStrategy({
      clientID: process.env.GITHUB_KEY,
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: process.env.APP_URL + 'auth/github/callback'
    },
  	function (token, refreshToken, profile, done) {
      User.findOne({ 'github.id': profile.id }, function (err, user) {
				if (err) {
					return done(err);
				}
				if (user) {
					return done(null, user)
				} else {
					var newUser = new User()
					newUser.github.id = profile.id
					newUser.github.username = profile.username
					newUser.github.displayName = profile.displayName
					newUser.save(function (err) {
						if (err) {
							throw err
						}
						return done(null, newUser)
					})
				}
			})
  	}
  ));

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
  		clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  		callbackURL: process.env.APP_URL + 'auth/google/callback'
    },
    function (accessToken, refreshToken, profile, done) {
      User.findOne({ 'google.id': profile.id }, function (err, user) {
				if (err) {
					return done(err)
				}
				if (user) {
					return done(null, user)
				} else {
					var newUser = new User()
					newUser.google.id = profile.id
					newUser.google.displayName = profile.displayName
					newUser.save(function (err) {
						if (err) {
							throw err
						}
						return done(null, newUser)
					})
				}
			})
    }
  ));
}
