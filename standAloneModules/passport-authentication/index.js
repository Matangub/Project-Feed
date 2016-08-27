/*****************************************

@ copyright Matan-Gubkin 2016

PASSPORT AUTHENTICATION FOR EXPRESS FRAMEWORK

# INSTALLATION
  * npm install --save PATH_TO_FOLDER

# USAGE

 # STEP 1 - create an additional routing file. example:  /routes/passportRoutes.js:

     var auth = require('passport-authentication')

     auth.githubAuth( (req, res) => {

         console.log(req.user);
         res.json(req.user);
     });

     var authRoutes = auth.router;

     module.exports = authRoutes;

 # STEP 2 - add route file to main server file (app.js)

      ...
      var passportRoutes = require('./routes/passportRoutes');
      ...
      app.use('/auth', passportRoutes);

*****************************************/

var express = require('express');
var router = express.Router();
var passport = require('passport');
//passport
var GithubStrategy = require('passport-github').Strategy;
var TwitterStrategy = require('passport-twitter').Strategy;

// Express and Passport Session
var session = require('express-session');
router.use(session({secret: "-- ENTER CUSTOM SESSION SECRET --"}));
router.use(passport.initialize());
router.use(passport.session());

passport.serializeUser(function(user, done) {
  // placeholder for custom user serialization
  // null is for errors
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  // placeholder for custom user deserialization.
  // maybe you are going to get the user from mongo by id?
  // null is for errors
  done(null, user);
});

// Simple middleware to ensure user is authenticated.
// Use this middleware on any resource that needs to be protected.
// If the request is authenticated (typically via a persistent login session),
// the request will proceed.  Otherwise, the user will be redirected to the
// login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    // req.user is available for use here
    return next();
  }

    // denied. redirect to login
    res.redirect('/')
}

module.exports = {
  router: router,

  githubAuth: function( credentials, callback) {

    // we will call this to start the GitHub Login process
    router.get('/github', (req, res, next) => {

      passport.use(new GithubStrategy({
          clientID: credentials.id,
          clientSecret: credentials.secret,
          callbackURL: `${credentials.callbackURL}?action=${req.query.action}&userId=${req.query.userId}`
        },
        function(accessToken, refreshToken, profile, done) {

          return done(null, {
            accessToken: accessToken,
            refreshToken: refreshToken,
            profile: profile
          });
        }
      ));

      passport.authenticate('github')(req, res, next)
    });

    // GitHub will call this URL
    router.get('/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res, next) => {

      // res.sendStatus(200);
      callback(req, res, next);
    });
    //
    // router.get('/protected', ensureAuthenticated, function(req, res) {
    //   res.send("access granted. secure stuff happens here");
    // });

  },

  twitterAuth: function( credentials, callback) {

    // we will call this to start the Twitter Login process
    router.get('/twitter', (req, res, next) => {

      passport.use(new TwitterStrategy({
          consumerKey: credentials.id,
          consumerSecret: credentials.secret,
          callbackURL: `${credentials.callbackURL}?action=${req.query.action}&userId=${req.query.userId}`,
          passReqToCallback: true
        },
        function(req, token, tokenSecret, profile, done) {

          return done(null, {
            accessToken: token,
            tokenSecret: tokenSecret,
            profile: profile
          });
        }
      ));

      passport.authenticate('twitter')(req, res, next)
    });

    // Twitter will call this URL
    router.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/' }), (req, res, next) => {

      // res.sendStatus(200);
      callback(req, res, next);
    });

  }
};
