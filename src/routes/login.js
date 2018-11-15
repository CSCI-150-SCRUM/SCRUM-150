//Here is where we declare the modules and shit we will need
const express = require('express')


//import the controllers and middleware
const {
  usersController
} = require('../controllers/index')

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


//set up the router
const router = express.Router()

router.get('/', function (req, res, next) {
  res.send('respond with a resource');
});

router.get('/users', function (req, res, next) {
  res.render('register', {
    title: 'Register'
  });
});

router.get('/login', function (req, res, next) {
  res.render('login', {
    title: 'Login'
  });
});

router.post('/login',
  passport.authenticate('local', {
    failureRedirect: '/users/login',
    failureFlash: 'Invalid Username or Password'
  }),
  function (req, res) {
    req.flash('success', 'You are now logged in!');
    res.redirect('/');
  });


var User = require('../database/models/user');

/* GET users listing. */


//serialize

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(function (id, done) {
  User.getUserById(id, function (err, user) {
    done(err, user);
  });
});

//passport

passport.use(new LocalStrategy(function (username, password, done) {
  User.getUserByUsername(username, function (err, user) {
    if (err) throw err;
    if (!user) {
      return done(null, false, {
        message: 'Unknown User'
      });
    }
    User.comparePassword(password, user.password, function (err, ismatch) {
      if (err) return done(err);
      if (isMatch) {
        return done(null, user);
      } else {
        return done(null, false, {
          message: 'Invalid Password'
        });
      }
    });
  });
}));

module.exports = router