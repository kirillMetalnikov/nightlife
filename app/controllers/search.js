var Yelp = require('yelpv3')

var yelp = new Yelp({
  app_id: process.env.YELP_CLIENT_ID,
  app_secret: process.env.YELP_CLIENT_SECRET
})

module.exports = (req, res) => {
  yelp.search({term: 'bar', location: req.params.location})
    .then(function (data) {
      data = JSON.parse(data)
      
      var result = data.businesses.map( busines => {
        var {name, image_url, url, id} = busines
        return {name, image_url, url, id}
      })

      res.json(result)
    })
    .catch(function (err) {
        console.error(err)
    })
}
