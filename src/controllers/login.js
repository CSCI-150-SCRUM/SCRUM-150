var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;

var User = require('../database/models/user');

/* GET users listing. */


//serialize

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.getUserById(id, function(err, user) {
    done(err, user);
  });
});

//passport

passport.use(new LocalStrategy(function(username, password, done){
   User.getUserByUsername(username, function(err, user){
		   if(err) throw err;
		   if(!user){
				   return done(null, false, {message: 'Unknown User'});
   }
   User.comparePassword(password, user.password, function(err, ismatch){
		   if(err) return done(err);
		   if(isMatch){
				    return done(null, user);
		   } else {
            return done(null, false, {message:'Invalid Password'});
       }
   });
  });
}));


router.post('/register', function(req, res, next) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

//Form Validator

  req.checkBody('name','Name field is required').notEmpty();
  req.checkBody('email','Email field is required').notEmpty();
  req.checkBody('email','Email field is not valid').isEmail();
  req.checkBody('username','Username field is required').notEmpty();
  req.checkBody('password','Password field is required').notEmpty();
  req.checkBody('password2','Passwords do not match').equals(req.body.password);
  //Check Errors
  var errors = req.validationErrors();
  
  if(errors){
    res.render('register', {
        errors: errors
     });
   } else { 
     var newUser = new User({
       name: name,
       email: email,
       username: username,
       password: password,
   });

   User.createUser(newUser, function(err, user){
     if(err) throw err;
     console.log(user);
   });

   req.flash('success', 'You are now registered and can login!');

   res.location('/');
   res.redirect('/');
 }
});


module.exports = router;
