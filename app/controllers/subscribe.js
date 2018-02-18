var Subsribes = require('../models/subsribes')

module.exports = (req, res) => {
  var userID = req.user ? req.user._id.toString() : 'anonymous'

    Subsribes
      .findOne({ 'yelp_id': req.params.id})
      .exec((err, result) => {
          if (err) { throw err }
          var users = []
          if (result.users.indexOf(userID) == -1) {
            users = result.users.concat(userID)
          } else {
            users = result.users.filter (user => {
              return (user != userID)
            })
          }

          Subsribes
            .findOneAndUpdate(
              {'yelp_id': req.params.id},
              {$set: {'users' : users}},
              {new: true}
            )
            .exec(function (err, result) {
                if (err) { throw err; }
                res.json(result)
              }
            )
        }
      )
}
