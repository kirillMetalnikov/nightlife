var Yelp = require('yelpv3')

var Subsribes = require('../models/subsribes.js')

var yelp = new Yelp({
  app_id: process.env.YELP_CLIENT_ID,
  app_secret: process.env.YELP_CLIENT_SECRET
})

var addSubsribers = (business, userID) => {
  var {id} = business
  return new Promise( (resolve, reject) => {
    Subsribes
      .findOne({ 'yelp_id': id})
      .exec( (err, subs) => {
          if (err) {reject(err)}
          var {users} = subs ? subs : []
          resolve(
            {...business,
              areYouSubsribe: users && (users.indexOf(userID) != -1),
              subscribersCount: users ? users.length : 0
            }
          )
        }
      )
  })
}

var getRewies = id => {
  return new Promise( (resolve, reject) => {
    yelp.reviews(id)
      .then( data => {
        resolve(data)
      })
      .catch (err => {
        console.log(err)
      })
  })
}

module.exports = (req, res) => {
  yelp.search({term: 'bars', location: req.params.location})
    .then(data => {
      data = JSON.parse(data)

      return data.businesses.map( business => {
        var {name, image_url, url, id} = business
        return {name, image_url, url, id}
      })
    })
    .then(businesses => {
      var userID = req.user ? req.user._id.toString() : 'anonymous';
      return Promise.all(
        businesses.map( business => {
          return addSubsribers(business, userID)
        })
      )
    })
    .then( withSubs => {
      res.json(withSubs)
    })
    .catch(function (err) {
        console.error(err)
    })
}
