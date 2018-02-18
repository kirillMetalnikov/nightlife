var Yelp = require('yelpv3')

var Subsribes = require('../models/subsribes.js')

var yelp = new Yelp({
  app_id: process.env.YELP_CLIENT_ID,
  app_secret: process.env.YELP_CLIENT_SECRET
})

var getSubsribers = id => {
  return new Promise( (resolve, reject) => {
    Subsribes
      .findOne({ 'yelp_id': id})
      .exec( (err, result) => {
          if (err) {reject(err)}
          resolve(result)
        }
      );
  })
}

module.exports = (req, res) => {
  yelp.search({term: 'bar', location: req.params.location})
    .then(data => {
      data = JSON.parse(data)

      var result = data.businesses.map( business => {
        var {name, image_url, url, id} = business
        return {name, image_url, url, id}
      })

      return result
    })
    .then(result => {
      Promise.all(
        result.map( business => {
          return getSubsribers(business.id)
        })
      ).then( subs => {
        var userID = req.user ? req.user._id.toString() : 'anonymous';

        res.json(result.map( (item, index) => {
          var {users} = subs[index] ? subs[index] : []
          return {
            ...item,
             areYouSubsribe: users && (users.indexOf(userID) != -1),
              subscribersCount: users ? users.length : 0
          }
//          return {...item, users}
        }))
      })
      .catch( err => {
        console.log(err)

      })
    })
    .catch(function (err) {
        console.error(err)
    })
}
