var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Subsribes = new Schema({
	yelp_id: String,
  users: Array
});

module.exports = mongoose.model('subsribes', Subsribes);
