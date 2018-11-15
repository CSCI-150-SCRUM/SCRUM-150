const express = require('express');
const path = require('path');
<<<<<<< HEAD

=======
>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const trunks = require('trunks-log')

var createError = require('http-errors');
var logger = require('morgan');
var session = require('express-session');
var passport = require('passport');
var expressValidator = require('express-validator');
var LocalStrategy = require('passport-local').strategy;
var flash = require('connect-flash');
var bcrypt = require('bcryptjs');

const app = express();

app.use(cors())
const logs = new trunks('', 'yellow', '')

// const index = require('./src/routes/index');
const { apiRoutes } = require('./src/routes/index')
const { webRoutes } = require('./src/routes/index')

//var indexRouter = require('./src/routes/index');
var usersRouter = require('./src/controllers/login');

// Use native ES6 Promises since mongoose's are deprecated.
// Connect to the database
<<<<<<< HEAD

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })
=======
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true }).catch(function(reason) {
    console.log('Unable to connect to the mongodb instance. Error: ', reason);
});

>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887


//engine
//app.set('view engine', 'html');
//app.set('views', path.join(__dirname, '/public'));

// Fail on connection error.
mongoose.connection.on('error', error => { throw error })


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);

// Passport (authentication system)
app.use(passport.initialize());
app.use(passport.session());


//
//app.use('/users', usersRouter);


//Handle Sessions
app.use(session({ 
	secret: 'secret', 
	saveUninitialized: true,
	resave: true
}));

// Validator
app.use(expressValidator({
	errorFormatter: function(param, msg, value) {
		var namespace = param.split('.')
		, root = namespace.shift()
		, formParam = root;

		while(namespace.length) {
			formParam += '[' + namespace.shift() + ']';
		}
		return {
			param 	: formParam,
			msg	: msg,
			value	: value
		};
	}
}));

//express-messages
app.use(require('connect-flash')());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  next();
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function(err, req, res, next) {
<<<<<<< HEAD
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
=======
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
>>>>>>> 2f58d62308108ab88360f019c12e0353f1ece887
});



module.exports = app;


logs.success('App running on http://localhost:{}', process.env.PORT)