var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const enums = require('./utils/enums');


require('./config/passport');
require('./config/storage');

const authMiddleWare = require('./middleware/auth');

const db = require('./database/db');
db.connectToDatabase(process.env.DB_URL);

var indexRouter = require('./routes/index');

/** Account Router */
var accountRouter = require('./routes/account');

/** Manager Router */
var managerRouter = require('./routes/manager');

/** Employee Router */
var employeeRouter = require('./routes/employee');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));


app.use('/', indexRouter);

/** Account Route */
app.use('/account', accountRouter);

/** Manager Route */
app.use("/manager", authMiddleWare.isAuthenticated(enums.roles.ProjectManager), managerRouter);

/** Employee Route */
app.use('/positions', authMiddleWare.isAuthenticated(enums.roles.Employee), employeeRouter);


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
  if (err.name === 'UnauthorizedError') {
    res.redirect('account/login');
  }else if (err.status == 404) {
    res.render('error', {
      message: 'Page not found.'
    });
  } else {
    res.render('error', {
      message: 'Some unexpected error occured.'
    });
  }
});

module.exports = app;
