var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/logout', function(req, res, next) {

  console.log('logging out');
  req.logout();
  res.redirect('/');
});

/* users */
router.get('/users', function(req, res, next) {

  mongoose.model('users').find( (err, users) => {

    res.json({users})
  })
});


module.exports = router;
