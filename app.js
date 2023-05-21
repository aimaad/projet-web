var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const { authenticateToken } = require('./middlewares/auth.js');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var registerRouter = require('./routes/registration');
var authentificationRouter = require('./routes/authentification');
var addcatt= require('./routes/categories');
var addarticle= require('./routes/articles');
var paginationRouter = require('./routes/articles');
var articleRouter = require('./routes/articles');
var updatearticles = require('./routes/articles');
var deletearticles = require('./routes/articles');
var pagcategories = require('./routes/categories');
var categoriesid = require('./routes/categories');
var miscategories = require('./routes/categories');
var deleteategories = require('./routes/categories');
var pagcommentaires = require('./routes/commentaires');
var  commentairesid = require('./routes/commentaires');
var  majcommentaires = require('./routes/commentaires');
var  delcommentaires = require('./routes/commentaires');
var paguserss = require('./routes/users');
var usersid =require('./routes/users');
var majusers= require('./routes/users');
require('dotenv').config();
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/register',registerRouter);
app.use('/login',authentificationRouter);
app.use('/ajout',addcatt);
app.use('/ajoutarticle',addarticle);
app.use('/pagination', paginationRouter);
app.use('/articles', articleRouter);
app.use('/updatearticle', updatearticles);
app.use('/deletearticle', deletearticles);
app.use('/pagcategorie', pagcategories);
app.use('/categorieid', categoriesid);
app.use('/miscategorie', miscategories);
app.use('/deleteategorie', deleteategories);
app.use('/pagcommentaire', pagcommentaires);
app.use('/commentaireid', commentairesid);
app.use('/majcommentaire', majcommentaires);
app.use('/delcommentaire', delcommentaires);
app.use('/pagusers', paguserss);
app.use('/userid', usersid);
app.use('/majuser', majusers);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});



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
