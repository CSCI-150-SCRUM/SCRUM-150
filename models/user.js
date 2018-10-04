var mongoose = require ('mongoose');
var bcrypt = require('bcryptjs');

mongoose.connect('mongodb://localhost:27017/nodeauth', { useNewUrlParser: true });
mongoose.set('useCreateIndex', true);

var db = mongoose.connection;

//User Schema
var UserSchema = mongoose.Schema({
	username: {
		type: String,
		unique: true
	},
	password: {
		type: String
	},
	email: {
		type: String
	},
	name: {
		type: String
	},
	profileimage: {
		type: String
	}
});

var User = module.exports = mongoose.model('User', UserSchema);

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        	newUser.password = hash;
			newUser.save(callback);
    	});
	});
}
