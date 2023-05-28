var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { authMiddlware } = require('./middlewares/auth.js');
const cors = require('cors');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/registration');
var authentificationRouter = require('./routes/authentification');
var articleRouter = require('./routes/articles');
var categorieRouter = require('./routes/categories');
var commentaireRouter = require('./routes/commentaires');
//var logoutrouter =  require('./routes/authentification');
require('dotenv').config();
var app = express();

// view engine setup
app.use(cors({origin : "http://localhost:3000", credentials: true}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(authMiddlware)
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/auth',authentificationRouter);
app.use('/articles', articleRouter);
app.use('/categories', categorieRouter);
app.use('/commentaires', commentaireRouter);
//app.use('/logout', logoutrouter);


// catch 404 and forward to error handler
//app.use(function(req, res, next) {
  
  //next(createError(404));
//});



// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
