var createError = require('http-errors');
var express = require('express');
var cors = require('cors');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const mongoose = require('mongoose');

var getStudentList = require('./controller/getStudentList');

var app = express();

 var bodyParser = require('body-parser')
 app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', getStudentList);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});
 // MongoDB connection

mongoose
    .connect('mongodb://127.0.0.1:27017/StudentData') //Db Name
    .then(res => console.log('DB connected'))
    .catch (error => console.log(error));

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(4000, () => {console.log("Port started at 4000")})

module.exports = app;
