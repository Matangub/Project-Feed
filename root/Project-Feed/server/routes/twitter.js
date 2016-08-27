var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var config = require('../config.js');
var request = require('request');
var oauth_nonce = require( 'oauth_nonce' );
var oauth_signature = require('oauth-signature')

var UserDB = require('../models/user');

/* GET home page. */
router.get('/:action/:userId', (req, res, next) => {

  var userId = req.params.userId;
  var urlAction = req.params.action;
  var requestUrl = '';

  UserDB.find( {userId: userId}, (err, results) => {

    if(results.length === 0) return res.json({success: false, msg: "invalid url params"});

    console.log(results[0].accessToken, results[0].tokenSecret);
    var accessToken = '';
    var accessTokenSecret = '';

    results[0].providers.map( (item) => {

      if(item.provider == 'twitter') {

        accessToken = item.accessToken;
        accessTokenSecret = item.tokenSecret;
      }
    })
    /* SETTING UP REQUEST URL ACCORDING TO USER ACTION */
    switch(urlAction) {
      case 'FEED':
        requestUrl = "https://api.twitter.com/1.1/statuses/home_timeline.json";
        break;
      default:
        res.json("Invalid action")
    }

    if(requestUrl === '') return res.json("invalid action");

    /* SETTING UP URL HEADERS FOR TWITTER API */
    var timeStamp = Math.floor(new Date().getTime() / 1000);
    var httpMethod = 'GET';
    var url = requestUrl;
    var parameters = {
        oauth_consumer_key : config.social.twitter.id,
        oauth_token : accessToken,
        oauth_nonce : oauth_nonce(),
        oauth_timestamp : timeStamp,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    };
    var consumerSecret = config.social.twitter.secret;
    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    encodedSignature = oauth_signature.generate(httpMethod, url, parameters, consumerSecret, accessTokenSecret),

    // signature = oauth_signature.generate(httpMethod, url, parameters, consumerSecret, tokenSecret,
    //     { encodeSignature: false});

    console.log('\n\n\n\n');
    // console.log(httpMethod, url, parameters, consumerSecret, tokenSecret);
    // console.log(signature);

    var headers =  {
      'User-Agent': 'request',
      //new Date().getTime() / 1000
      'Authorization': `OAuth oauth_consumer_key=${parameters.oauth_consumer_key},oauth_nonce=${parameters.oauth_nonce},oauth_signature=${encodedSignature},oauth_signature_method="HMAC-SHA1",oauth_timestamp="${parameters.oauth_timestamp}",oauth_token=${parameters.oauth_token},oauth_version="1.0"`
    };

    // ACTUALL REQUEST TO THE API
    request({url: requestUrl, headers: headers}, (err, response, body) => {

      res.json({response: response});
    })

    // res.json({success: true, id: userId})
  })

});

module.exports = router;
