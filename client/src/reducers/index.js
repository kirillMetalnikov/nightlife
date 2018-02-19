import {combineReducers} from 'redux';

import {GET_BUSINESSES, GET_FIND} from '../const.js';

var templateState = [{"name":"The Sky Lounge & Rooftop Terrace","image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/Lauem0y3S8sc7qX7hLI54Q/o.jpg","url":"https://www.yelp.com/biz/the-sky-lounge-and-rooftop-terrace-boston-5?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"the-sky-lounge-and-rooftop-terrace-boston-5","areYouSubsribe":false,"subscribersCount":1},{"name":"Moon Bar","image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/YcoqprhXCKtS5qMG3qJ6gw/o.jpg","url":"https://www.yelp.com/biz/moon-bar-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"moon-bar-boston","subscribersCount":0},{"name":"Biddy Early's","image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/8kEgR1yeFVStVone5j4aug/o.jpg","url":"https://www.yelp.com/biz/biddy-earlys-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"biddy-earlys-boston","areYouSubsribe":false,"subscribersCount":3},{"name":"The Corner Pub","image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/4LH1DWovh2U1gvHPLIgjoQ/o.jpg","url":"https://www.yelp.com/biz/the-corner-pub-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"the-corner-pub-boston","areYouSubsribe":false,"subscribersCount":3},{"name":"Lolita Cocina & Tequila Bar Back Bay","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/b5g9aT6A4pnW-O-z2Km18w/o.jpg","url":"https://www.yelp.com/biz/lolita-cocina-and-tequila-bar-back-bay-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"lolita-cocina-and-tequila-bar-back-bay-boston","subscribersCount":0},{"name":"Saltie Girl","image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/YbBUekue-2E--iW6tsWrgA/o.jpg","url":"https://www.yelp.com/biz/saltie-girl-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"saltie-girl-boston","subscribersCount":0},{"name":"21st Amendment","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/C45LPis756W6ZUtH08KFcA/o.jpg","url":"https://www.yelp.com/biz/21st-amendment-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"21st-amendment-boston","subscribersCount":0},{"name":"The Hawthorne","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/tnjac8Q667vJWFEHabMAKA/o.jpg","url":"https://www.yelp.com/biz/the-hawthorne-boston-2?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"the-hawthorne-boston-2","subscribersCount":0},{"name":"Drink","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/gZxcYYhwMkXZO0o0GpJVZg/o.jpg","url":"https://www.yelp.com/biz/drink-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"drink-boston","subscribersCount":0},{"name":"Tiki Rock","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/Oud1HBA3J-FzF3qOoN2QAA/o.jpg","url":"https://www.yelp.com/biz/tiki-rock-boston-3?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"tiki-rock-boston-3","subscribersCount":0},{"name":"City Bar","image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/nspZDBFghuA8OuS3rKPwZw/o.jpg","url":"https://www.yelp.com/biz/city-bar-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"city-bar-boston","subscribersCount":0},{"name":"Durty Nelly’s","image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/Ouhw9d23ZAsq34I4bAlQWQ/o.jpg","url":"https://www.yelp.com/biz/durty-nelly-s-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"durty-nelly-s-boston","subscribersCount":0},{"name":"Wink & Nod","image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/Z4HfFpUdaqKFEXxgIARDBQ/o.jpg","url":"https://www.yelp.com/biz/wink-and-nod-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"wink-and-nod-boston","subscribersCount":0},{"name":"Croke Park Whitey's","image_url":"https://s3-media2.fl.yelpcdn.com/bphoto/Afl64EKLNX8ZwDUd-CuMXw/o.jpg","url":"https://www.yelp.com/biz/croke-park-whiteys-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"croke-park-whiteys-boston","subscribersCount":0},{"name":"The Gallows","image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/g4whiNPtAzvF5PeqANrB5Q/o.jpg","url":"https://www.yelp.com/biz/the-gallows-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"the-gallows-boston","areYouSubsribe":false,"subscribersCount":2},{"name":"Yvonne's","image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/Pd_NUUHzQYF-_zqYsx6CNA/o.jpg","url":"https://www.yelp.com/biz/yvonnes-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"yvonnes-boston","subscribersCount":0},{"name":"Ward 8","image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/GoCcPAHwwCUK9QTAL63vdQ/o.jpg","url":"https://www.yelp.com/biz/ward-8-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"ward-8-boston","subscribersCount":0},{"name":"Bleacher Bar","image_url":"https://s3-media4.fl.yelpcdn.com/bphoto/B3Xykt3OtjBZ34CMaiLrAQ/o.jpg","url":"https://www.yelp.com/biz/bleacher-bar-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"bleacher-bar-boston","subscribersCount":0},{"name":"Bostonia Public House","image_url":"https://s3-media3.fl.yelpcdn.com/bphoto/SS2qfGN1S6tZTWWmn5gTuA/o.jpg","url":"https://www.yelp.com/biz/bostonia-public-house-boston-4?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"bostonia-public-house-boston-4","subscribersCount":0},{"name":"Liberty Bar","image_url":"https://s3-media1.fl.yelpcdn.com/bphoto/wqMZIb803luSG4vZ0oBqmA/o.jpg","url":"https://www.yelp.com/biz/liberty-bar-boston?adjust_creative=0HGgLCbJoSOdi4UchcnxSw&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=0HGgLCbJoSOdi4UchcnxSw","id":"liberty-bar-boston","subscribersCount":0}]

const list = function (state = templateState, action) {
  switch (action.type) {
    case GET_BUSINESSES:
      return action.businesses;
    default:
      return state;
  }
}
const findsText = function(state = '', action) {
  switch (action.type) {
    case GET_FIND:
      return action.text;
    default:
      return state;
  }
}
export default combineReducers({
  list, findsText
})
