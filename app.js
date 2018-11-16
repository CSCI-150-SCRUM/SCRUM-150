const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors')
const trunks = require('trunks-log')

var logger = require('morgan');


const app = express();

app.use(cors())
const logs = new trunks('', 'yellow', '')

// const index = require('./src/routes/index');
const { apiRoutes } = require('./src/routes/index')
const { webRoutes } = require('./src/routes/index')

var auth = require('./src/routes/auth');
app.use('/api/auth', auth);


// Use native ES6 Promises since mongoose's are deprecated.
// Connect to the database

mongoose.Promise = global.Promise
mongoose.connect(process.env.MONGO_URI, { useMongoClient: true })


//engine
//app.set('view engine', 'html');
//app.set('views', path.join(__dirname, '/public'));

// Fail on connection error.
mongoose.connection.on('error', error => { throw error })

//
app.use(logger('dev'));



// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));
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

    // render the error page
    res.status(err.status || 500);
    res.json('error');
});



module.exports = app;


logs.success('App running on http://localhost:{}', process.env.PORT)