//import mongoose, our ODM for mongoDB
const mongoose = require('mongoose');

//mongoose.connect('mongodb://localhost:27017/users', { useNewUrlParser: true });
//mongoose.set('useCreateIndex', true);

//Define all of its fields, like columns of a SQL table
const definition = {
  
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
}
*/
//make the schema as a new instance of a mongoose schema, using our definition and options
var UserSchema = new mongoose.Schema(definition)

module.exports = mongoose.model('User', UserSchema);
