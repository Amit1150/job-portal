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
var loginRouter = require('./routes/login');
var registerRouter = require('./routes/register');

/** Manager Router */
var positionListRouter = require('./routes/manager/position-list');
var positionAddRouter = require('./routes/manager/position-add');
var positionEditRouter = require('./routes/manager/position-edit');

/** Employee Router */
var positionsRouter = require('./routes/employee/position');


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
app.use('/login', loginRouter);
app.use('/register', registerRouter);

/** Manager Route */
app.use('/position/list', authMiddleWare.isAuthenticated(enums.roles.ProjectManager), positionListRouter);
app.use('/position/add', authMiddleWare.isAuthenticated(enums.roles.ProjectManager), positionAddRouter);
app.use('/position/edit', authMiddleWare.isAuthenticated(enums.roles.ProjectManager), positionEditRouter);

/** Employee Route */
app.use('/positions', authMiddleWare.isAuthenticated(enums.roles.Employee), positionsRouter);


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
    res.render('login', {error: 'Please login to continue'});
  }
  res.render('error');
});

module.exports = app;
