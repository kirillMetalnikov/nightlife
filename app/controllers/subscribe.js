var Subsribe = require('../models/subsribes')

module.exports = (req, res) => {
  let userID = req.user ? req.user._id.toString() : 'anonymous'
    Subsribe
      .findOne({ 'yelp_id': req.params.id})
      .exec()
      .then(subsc => {
        if(!subsc) {
          let users = []
          let newSubsribe = new Subsribe()
          newSubsribe.yelp_id = req.params.id
          newSubsribe.users = users.concat(userID)

          return newSubsribe.save()
        } else {
          if (subsc.users.indexOf(userID) == -1) {
            users = subsc.users.concat(userID)
          } else {
            users = subsc.users.filter (user => {
              return (user != userID)
            })
          }

          return  Subsribe.findOneAndUpdate(
              {'yelp_id': req.params.id},
              {$set: {'users' : users}},
              {new: true})
            .exec()
        }
      })
      .then( subs => {
        let {users} = subs ? subs : []
        res.json(
          {id: subs.yelp_id,
            areYouSubsribe: users && (users.indexOf(userID) != -1),
            subscribersCount: users ? users.length : 0
          })
      })
      .catch( err => {
        res.json({status: 'error', err: err.toString()})
      })
}
