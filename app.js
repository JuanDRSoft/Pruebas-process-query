var createError = require('http-errors');
const { requestCaso } = require('./src/utils/cronProcess');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
var cors = require('cors');
const dotenv = require('dotenv');
var cron = require('node-cron');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());
app.use(express.json());

dotenv.config();

//routes
const lawyer = require('./src/routes/Lawyer');
const process = require('./src/routes/Process');
const billing = require('./src/routes/Billing');
const payments = require('./src/routes/Payment');
const ipn = require('./src/routes/IPN');
const event = require('./src/routes/Event');
const collaborator = require('./src/routes/Collaborator');
const {
  requestEvents,
  requestEventsEmail
} = require('./src/utils/eventNotification');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//use routes custom
app.use('/lawyer', lawyer);
app.use('/process', process);
app.use('/billing', billing);
app.use('/payments', payments);
app.use('/IPN', ipn);
app.use('/event', event);
app.use('/collaborator', collaborator);

app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

requestCaso();

cron.schedule('59 * * * *', function () {
  requestEvents();
});

cron.schedule('20 6,12,18 * * *', function () {
  requestEventsEmail();
});

mongoose.connect(
  'mongodb+srv://usr:usr@processquerydb.spacg.mongodb.net/ProcessQuery'
);

module.exports = app;
