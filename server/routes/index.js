var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var UserDB = require('../models/user');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

/* GET USER PROFILE */
router.get('/:userId', (req, res, next) => {

  UserDB.find( {userId: req.params.userId}, (err, result) => {
    if(err) return next(err);

    res.json(result[0]);
  })
})

/* currently not implemented */
router.get('/logout', function(req, res, next) {

  console.log('logging out');
  // req.logout();
  res.redirect('/');
});

module.exports = router;
