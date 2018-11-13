const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const trunks = require('trunks-log')



var logger = require('morgan');
//var book = require('./routes/book');
var auth = require('./src/routes/auth');


const app = express();

app.use(cors())
const logs = new trunks('', 'yellow', '')

// const index = require('./src/routes/index');
const { apiRoutes } = require('./src/routes/index')
const { webRoutes } = require('./src/routes/index')

// Use native ES6 Promises since mongoose's are deprecated.


mongoose.Promise = global.Promise
//mongoose.Promise = require('bluebird')

// Connect to the database
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })

//mongoose.connect(process.env.MONGO_URI, { useMongoClient: true }, { promiseLibrary: require('bluebird') })
//  .then(() =>  console.log('connection succesful'))
// .catch((err) => console.error(err));

//mongoose.connect('mongodb://localhost:27017/mydb', { useMongoClient: true });

// Fail on connection error.
mongoose.connection.on('error', error => { throw error })


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

//user auth
app.use(logger('dev'));
//app.use('/books', express.static(path.join(__dirname, 'dist')));
//app.use('/book', book);
app.use('/api/auth', auth);
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', apiRoutes);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
});

module.exports = app;


logs.success('App running on http://localhost:{}', process.env.PORT)