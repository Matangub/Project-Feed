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

    var accessToken = '';
    var accessTokenSecret = '';
    var httpMethod = 'GET';
    var formParams = {}; // for a more complicated request params
    var signatureFields = {}; // some requests require to add more params to signature algorithm

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
      case 'MORE_FEED':
        requestUrl = `https://api.twitter.com/1.1/statuses/home_timeline.json?max_id=${req.query.max_id}?count=${req.query.count}`;
        break;
      case 'LIKE':
        httpMethod="POST";
        formParams = { id: req.query.postId }
        requestUrl = `https://api.twitter.com/1.1/favorites/create.json`;
        break;
      case 'UNLIKE':
        httpMethod="POST";
        formParams = { id: req.query.postId }
        requestUrl = `https://api.twitter.com/1.1/favorites/destroy.json`;
        break;
      case 'GET_REPLIES':
        signatureFields = { q: req.query.q};
        requestUrl = `https://api.twitter.com/1.1/search/tweets.json?q=${encodeURIComponent(req.query.q)}`;
        break;
      default:
        return res.json("Invalid action")
    }

    if(requestUrl === '') return res.json("invalid action");

    /* SETTING UP URL HEADERS FOR TWITTER API */
    var timeStamp = Math.floor(new Date().getTime() / 1000);
    var url = requestUrl;
    var parameters = {
        oauth_consumer_key : config.social.twitter.id,
        oauth_token : accessToken,
        oauth_nonce : oauth_nonce(),
        oauth_timestamp : timeStamp,
        oauth_signature_method : 'HMAC-SHA1',
        oauth_version : '1.0'
    };
    parameters = Object.assign( parameters, signatureFields );

    var consumerSecret = config.social.twitter.secret;
    // generates a RFC 3986 encoded, BASE64 encoded HMAC-SHA1 hash
    var encodedSignature = oauth_signature.generate(httpMethod, url, parameters, consumerSecret, accessTokenSecret)
    // console.log(signature);

    var headers =  {
      'User-Agent': 'request',
      'Authorization': `OAuth oauth_consumer_key=${parameters.oauth_consumer_key},oauth_nonce=${parameters.oauth_nonce},oauth_signature=${encodedSignature},oauth_signature_method="HMAC-SHA1",oauth_timestamp="${parameters.oauth_timestamp}",oauth_token=${parameters.oauth_token},oauth_version="1.0"`
    };

    // ACTUALL REQUEST TO THE API
    request({
      url: requestUrl,
      method: httpMethod.toLowerCase(),
      headers: headers,
      // form: { q: '%40StackOverflow'}
      formData: formParams
    }, (err, response, body) => {

      // if( JSON.parse( response.body ).errors ) return res.json(JSON.parse(response.body));

      switch(urlAction) {

        case 'FEED': {
          handleFeed(req, res, response, body);
          // res.json(JSON.parse(response.body));
          break;
        }
        case 'MORE_FEED': {
          handleFeed(req, res, response, body);
          // res.json(JSON.parse(response.body));
          break;
        }
        case 'GET_REPLIES': {

          handleReplies(req, res, response, body);
          break;
        }
        default: {
          console.log('\n');
          console.log(response);
          console.log('\n');
          res.json({response: response});
        }
      }
    })
  })

});

function handleFeed(req, res, response, body) {

  const getMedia = (media) => {

    var exportMedia = media.map( (item) => {

      return {
        id: item.id_str,
        media: item.media_url_https,
        type: item.type,
        videoLink: item.video_info ? item.video_info.variants[0].url : null
      }
    })
    return exportMedia;
    // return media;
  }

  var data = JSON.parse(response.body);
  var exportData = data.map( (item) => {

    var jsonItem = item.retweeted_status ? item.retweeted_status : item;

    return {
      original: item,
      retweet: item.retweet,
      postId: item.id,
      id: item.id_str,
      like: item.favorited,
      likeCounter: item.favorite_count,
      title: jsonItem.user.name,
      name: jsonItem.user.screen_name,
      text: jsonItem.text,
      created_at: jsonItem.created_at,
      banner: jsonItem.user.profile_image_url_https,
      media: jsonItem.extended_entities ? getMedia( jsonItem.extended_entities.media ) : [],
    }
  })

  res.json(exportData);
}

function handleReplies (req, res, response, body) {

  var data = JSON.parse(response.body);
  var replies = data.statuses.filter( (item) => {

    if(item.in_reply_to_status_id_str == req.query.postId) {
      return item;
    }
  })

  res.json({response: replies});
}

module.exports = router;
