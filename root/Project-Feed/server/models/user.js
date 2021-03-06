// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var providerSchema = new Schema({
  provider: { type: String  },
  activeFeed: { type: Boolean },
  accessToken: { type: String  },
  tokenSecret: { type: String },
  id: { type: String }
})

// create a schema
var userSchema = new Schema({
  userId: { type: String, unique: true, required: true },
  loginProvider: { type: String, required: true },
  name: { type: String, required: true },
  userName: { type: String, required: true },
  email: { type: String, required: true },
  providers: [providerSchema]
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema);

// make this available to our users in our Node applications
module.exports = User;
