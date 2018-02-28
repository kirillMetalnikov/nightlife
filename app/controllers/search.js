var Subsribes = require('../models/subsribes.js')
var axios = require('axios')

const QUEUE_LENGTH = 10
const URL = 'https://api.yelp.com/v3/businesses/search?term=nightlife&location='

var yelp = axios.create({
  headers: {'Authorization': 'Bearer 7AxHtMfSYTicIFc1hDSoPhX16coIemp4VhHEYWQTuC2GRGaB1bzrGaf8RT9f4YWdzFLIS8bhWI6u_zxG5nDR8iRHj-LAyvMx8E5sIHxBrkS38H3MidumpoZ9_fGWWnYx'}
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

var addRewies = businesses => {
  const URL_REWIES = 'https://api.yelp.com/v3/businesses/'
  return new Promise ( (resolve, reject) => {
    // [].map or other method is not right for async/await. Then for it need a "for"
    return ( async () => {
      for (let i = 0; i < businesses.length; i++) {
        let response = await yelp.get(URL_REWIES + businesses[i].id + '/reviews')
        let {reviews} = response.data

        businesses[i].reviews = reviews[0] && reviews[0].text
      }
      resolve(businesses)
    })()
  })
}

module.exports = (req, res) => {
  yelp.get(URL + req.params.location)
  .then( ({data}) => {
    return data.businesses.map( business => {
      var {name, image_url, url, id} = business
      return {name, image_url, url, id}
    })
  })
  .then (business => {
    var streams = []
    while (business.length > 0) {
      streams.push(business.splice(-QUEUE_LENGTH))
    }
    return Promise.all (
      streams.map (stream => {
        return addRewies(stream)
      })
    )
  })
  .then(streams => {
    return new Promise( (resolve, reject) => {
      var businesses = []
      while (streams.length > 0) {
        businesses = businesses.concat(streams.pop())
      }
      resolve(businesses)
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
      res.json({type: 'error', err: err.toString()})
  })
}
