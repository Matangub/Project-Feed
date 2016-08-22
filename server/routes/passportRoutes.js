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

    if(results.length > 0) return res.json({success: true, userId: results[0].userId, msg: "signed in successfuly!"});

    UserDB.create({
      userId: uuid.v4(),
      provider: 'github',
      socialId: user.id,
      name: user.name,
      userName: user.login,
      email: user.email,
      accessToken: req.user.accessToken,
      tokenSecret: 'none'
    }, (err) => {
      if(err) return next(err);

      res.json({success: true, msg: "signed up successfuly!"});
    });

  })

});

/**************** TWITTER AUTHENTICATION *******************/
auth.twitterAuth( {
  id: config.social.twitter.id,
  secret: config.social.twitter.secret,
  callbackURL: 'http://192.168.1.16:3000' + '/auth/twitter/callback'
}, (req, res, next) => {

  var user = req.user;

  UserDB.find( {userName: user.profile.username, provider: 'twitter'}, (err, results) => {

    if(results.length > 0) return res.json({success: true, userId: results[0].userId, msg: "signed in successfuly!"});
    var myid = uuid.v4();

    UserDB.create({
      userId: uuid.v4(),
      provider: 'twitter',
      socialId: user.profile.id,
      name: user.profile._json.screen_name,
      userName: user.profile.username,
      email: 'none',
      accessToken: user.accessToken,
      tokenSecret: user.tokenSecret
    }, (err) => {
      if(err) return next(err);

      res.json({success: true, msg: "signed up successfuly!"});
    });
  })


});

var authRoutes = auth.router;

module.exports = authRoutes;
