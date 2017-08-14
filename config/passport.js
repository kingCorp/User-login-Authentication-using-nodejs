var passport = require('passport');
var User = require('../models/user');
var localStrategy = require('passport-local').Strategy;

//session for passport
  passport.serializeUser(function (user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
      done(err, user);
    });
  });

  //passport authentication
  passport.use('local', new localStrategy(
    function (username, password, done) {
      User.getUserByUsername(username, function (err, user) {
        if (err) throw err;
        if (!user) {
          console.log('Unknown User');
          return done(null, false, { messaege: 'Unknown User' });
        }
        User.comparePassword(password, user.password, function (err, isMatch) {
          if (err) throw err;
          if (isMatch) {
            return done(null, user);
          } else {
            console.log('wrong password');
            return done(null, false, { messaege: 'Wrong Password' });
          }
        })
      });
    }));