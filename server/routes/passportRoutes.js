var auth = require('passport-authentication')
var mongoose = require('mongoose');
var config = require('../config.js');
var uuid = require('uuid');

// models
var UserDB = require('../models/user');

/**************** GITHUB AUTHENTICATION *******************/
auth.githubAuth( {
  id: config.social.github.id,
  secret: config.social.github.secret,
  callbackURL: config.credentials.host + '/auth/github/callback'
}, (req, res, next) => {

  var user = req.user.profile._json;

  UserDB.find( {userName: user.login, provider: 'github'}, (err, results) => {

    if(results.length > 0) return res.redirect('/' + results[0].userId);

    var userId = uuid.v4();

    UserDB.create({
      userId: userId,
      provider: 'github',
      name: user.name,
      userName: user.login,
      email: user.email,
      providers: [{
        provider: 'github',
        socialId: user.id,
        accessToken: req.user.accessToken,
        tokenSecret: 'none'
      }]
    }, (err) => {
      if(err) return next(err);

      res.redirect('/' + userId);
    });

  })

});

/**************** TWITTER AUTHENTICATION *******************/
auth.twitterAuth( {
  id: config.social.twitter.id,
  secret: config.social.twitter.secret,
  callbackURL: config.credentials.host + '/auth/twitter/callback'
}, (req, res, next) => {

  var user = req.user;

  UserDB.find( {userName: user.profile.username, provider: 'twitter'}, (err, results) => {

    console.log(results[0].userId);
    if(results.length > 0) return res.redirect('/' + results[0].userId);
    var myid = uuid.v4();

    UserDB.create({
      userId: uuid.v4(),
      provider: 'twitter',
      name: user.profile._json.screen_name,
      userName: user.profile.username,
      email: 'none',
      providers: [{
        provider: 'twitter',
        socialId: user.profile.id,
        accessToken: user.accessToken,
        tokenSecret: user.tokenSecret
      }]
    }, (err) => {
      if(err) return next(err);

      res.redirect('/' + userId);
    });
  })


});

var authRoutes = auth.router;

module.exports = authRoutes;
