var Subsribe = require('../models/subsribes')

module.exports = (req, res) => {
  var userID = req.user ? req.user._id.toString() : 'anonymous'

    Subsribe
      .findOne({ 'yelp_id': req.params.id})
      .exec((err, result) => {
        if (err) { throw err }

        var users = []

        if (!result) {
          var newSubsribe = new Subsribe()
          newSubsribe.yelp_id = req.params.id
          newSubsribe.users = users.concat(userID)
          newSubsribe.save(function (err) {
            if (err) {
              throw err
            }
            res.json(newSubsribe)
          })
        } else {

          if (result.users.indexOf(userID) == -1) {
            users = result.users.concat(userID)
          } else {
            users = result.users.filter (user => {
              return (user != userID)
            })
          }

          Subsribe
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
      })
}
