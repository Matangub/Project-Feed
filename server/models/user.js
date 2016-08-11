// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  provider: { type: String, required: true },
  socialId: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  accessToken: { type: String, required: true },
  tokenSecret: { type: String }
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = User;