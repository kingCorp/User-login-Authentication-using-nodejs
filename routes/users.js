var express = require('express');
var router = express.Router();
var User = require('../models/user');
var bcrypt = require('bcrypt');
var passport = require('passport');
var localStrategy = require('passport-local').Strategy;


//register page
router.get('/register', function (req, res, next) {
  res.render('register', { title: 'Register' });
});

// posting the register form
router.post('/register', function (req, res, next) {
  //getting content from from
  var username = req.body.username;
  var email = req.body.email;
  var password = req.body.password;
  var password2 = req.body.password2;

  //form validation
  req.checkBody('username', 'Username field is required').notEmpty();
  req.checkBody('email', 'Email is not Valid').isEmail();
  req.checkBody('password', 'Paasword field is required').notEmpty();
  req.checkBody('password2', 'Password field do not match').equals(req.body.password);

  // check for errors
  var errors = req.validationErrors();

  if (errors) {
    res.render('register', {
      errors: errors,
      email: email,
      username: username,
      password: password,
      password2: password2
    });
  } else {
    var newUser = new User({
      email: email,
      username: username,
      password: password
    });

    //hash password
    bcrypt.hash(newUser.password, 10, function (err, hash) {
      if (err) throw err;

      newUser.password = hash;
      //create user
      newUser.save(function (err) {
        if (err) throw err;
        console.log(newUser);
      })
    })


    //success message
    req.flash('success', '  You are now registered and may login');
    res.location('/');
    res.redirect('/');
  }

});

//login page
router.get('/login', function (req, res, next) {
  res.render('login', { title: 'Login' });

});


// user login post
router.post('/login', passport.authenticate('local', {
  failureRedirect: '/users/login',
  failureFlash: 'invalid username or password'
}),
  function(req, res) {
    console.log('Authentication Successfull');
    req.flash('success', 'you have successfully logged in');
    res.redirect('/');
  });






//logout
router.get('/logout', function (req, res, next) {
  req.logout();
  req.flash('success', 'you have successfully logged out');
  res.redirect('/users/login');
});

module.exports = router;
