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

  switch( req.query.action ) {

    case 'CONNECT': {

      UserDB.find( {userName: user.login, loginProvider: 'github'}, (err, results) => {

        if(results.length > 0) return res.redirect('/' + results[0].userId);

        var userId = uuid.v4();

        UserDB.create({
          userId: userId,
          loginProvider: 'github',
          name: user.name,
          userName: user.login,
          email: user.email,
          providers: [{
            provider: 'github',
            socialId: user.id,
            activeFeed: false,
            accessToken: req.user.accessToken,
            tokenSecret: 'none'
          }]
        }, (err) => {
          if(err) return next(err);

          res.redirect('/' + userId);
        });

      })
      break;
    }
    case 'ADD_NEW_PROVIDER': {

      var updateData = {
        providers: {
          provider: 'github',
          socialId: user.id,
          activeFeed: false,
          accessToken: req.user.accessToken,
          tokenSecret: 'none'
        }
      }

      UserDB.find( { userId: req.query.userId } ,(err, results) => {

        /************************ VALIDATION *************************/
        if( results.length === 0) return next({message: 'bad userId', error: 400});
        if( results[0].loginProvider === 'github' ) return next({message: 'duplicate login provider', error: 400});

        for(var i = 0; i<results[0].providers.length;i++) {

            if( results[0].providers[i].provider === 'github' ) {
                return next({message: 'duplicate login provider', error: 400});
            }
        }
        /************************ VALIDATION *************************/

        UserDB.update( {userId: req.query.userId}, { $push: updateData }, ( err, results ) => {

          if(err) return next(err);

          res.sendStatus(200);
        })
      })
      break;
    }
    default: return res.sendStatus(400).json( 'invalid action' );
  }

});

/**************** TWITTER AUTHENTICATION *******************/
auth.twitterAuth( {
  id: config.social.twitter.id,
  secret: config.social.twitter.secret,
  callbackURL: config.credentials.host + '/auth/twitter/callback'
}, (req, res, next) => {
  var user = req.user;

  console.log('action');
  console.log( req.params );
  switch( req.query.action ) {

    case 'CONNECT': {

      UserDB.find( {userName: user.profile.username, loginProvider: 'twitter'}, (err, results) => {

        if(results.length > 0) return res.redirect('/' + results[0].userId);

        var newId = uuid.v4();

        UserDB.create({
          userId: newId,
          loginProvider: 'twitter',
          name: user.profile._json.screen_name,
          userName: user.profile.username,
          email: 'none',
          providers: [{
            provider: 'twitter',
            socialId: user.profile.id,
            activeFeed: false,
            accessToken: user.accessToken,
            tokenSecret: user.tokenSecret
          }]
        }, (err) => {
          if(err) return next(err);

          res.redirect('/' + newId);
        });
      })
      break;
    }

    case 'ADD_NEW_PROVIDER': {

      var updateData = {
        providers: {
          provider: 'twitter',
          socialId: user.profile.id,
          activeFeed: false,
          accessToken: user.accessToken,
          tokenSecret: user.tokenSecret
        }
      }

      UserDB.find( { userId: req.query.userId } ,(err, results) => {
        /************************ VALIDATION *************************/
        if( results.length === 0) return next({message: 'bad userId', error: 400});
        if( results[0].loginProvider === 'twitter' ) return next({message: 'duplicate login provider', error: 400});

        for(var i = 0; i<results[0].providers.length;i++) {

            if( results[0].providers[i].provider === 'twitter' ) {
                return next({message: 'duplicate login provider', error: 400});
            }
        }
        /************************ VALIDATION *************************/

        UserDB.update( {userId: req.query.userId}, { $push: updateData }, ( err, results ) => {

          if(err) return next(err);

          return res.sendStatus(200);
        })
      })
      break;
    }
    default: return res.sendStatus(400).json( 'invalid action' );
  }

});

/* ********************* FACEBOOK AUTH ******************** */
auth.facebookAuth( {
  id: config.social.facebook.id,
  secret: config.social.facebook.secret,
  callbackURL: config.credentials.host + '/auth/facebook/callback'
}, (req, res, next) => {
  var user = req.user;
  console.log('params');
  console.log(req.query);

  switch( req.query.action ) {

    case 'CONNECT': {
      console.log('CREATE ACTION!!!!');
    }
  }

  res.json(user);
});

var authRoutes = auth.router;

module.exports = authRoutes;
