var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var User = new Schema({
	github: {
		id: String,
		displayName: String,
		username: String,
	},
  google: {
		id: String,
		displayName: String,
	}
});

module.exports = mongoose.model('Users', User);
