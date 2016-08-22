var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');

/* GET home page. */
router.get('/', function(req, res, next) {

  res.render('index', { title: 'Express' });
});

router.get('/:userId', (req, res, next) => {

  res.sendStatus(200);
})

router.get('/logout', function(req, res, next) {

  console.log('logging out');
  req.logout();
  res.redirect('/');
});

module.exports = router;
