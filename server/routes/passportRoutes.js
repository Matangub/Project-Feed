var auth = require('passport-authentication')

auth.githubAuth( {
  clientID: "700fe3db804f3467c860",
  clientSecret: "4bef9aae7c30a008d3754ac60c768651ee011445",
  callbackURL: "http://localhost:3000/auth/github/callback"
}, (req, res) => {

  res.json(req.user);

  // mongoose.model('users').find( (err, users) => {
  //
  //   res.json({users})
  // })
});

var authRoutes = auth.router;

module.exports = authRoutes;
