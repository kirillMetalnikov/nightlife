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
          newSubsribe.save(function (err, subs) {
            if (err) {
              throw err
            }
            let {users} = subs ? subs : []
            res.json(
              {id: subs.yelp_id,
                areYouSubsribe: users && (users.indexOf(userID) != -1),
                subscribersCount: users ? users.length : 0
              })
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
            .exec(function (err, subs) {
                if (err) { throw err}
                let {users} = subs ? subs : []
                res.json(
                  {id: subs.yelp_id,
                    areYouSubsribe: users && (users.indexOf(userID) != -1),
                    subscribersCount: users ? users.length : 0
                  })

              }
            )
        }
      })
}
