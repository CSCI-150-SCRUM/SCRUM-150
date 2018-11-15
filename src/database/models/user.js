//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

//mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
//mongoose.set('useCreateIndex', true);

//Define all of its fields, like columns of a SQL table
const definition = {
<<<<<<< HEAD
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  email: {
    type: String,
    required: true
  }
}

//Set any options for the schema
/*const options = {
  timestamps: true
=======
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true
    }
}

//Set any options for the schema
const options = {
    timestamps: true
>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887
}
*/
//make the schema as a new instance of a mongoose schema, using our definition and options
var UserSchema = new mongoose.Schema(definition)

var User = module.exports = mongoose.model('User', UserSchema);



module.exports.getUserById = function(id, callback){
	User.findById(id, callback);
}

module.exports.getUserByUsername = function(username, callback){
	var query = {username: username};
	User.findOne(query, callback);
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
	bcrypt.compare(candidatePassword, hash, function(err, isMatch) {
		callback(null, isMatch);
	});
}

module.exports.createUser = function(newUser, callback){
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(newUser.password, salt, function(err, hash) {
        	newUser.password = hash;
			newUser.save(callback);
    	});
	});
}