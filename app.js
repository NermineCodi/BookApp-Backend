require("dotenv").config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');

const cors = require('cors');
var mongoose = require('mongoose');
var app = express();

// perform a database connection when the server starts
// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true 
  }).then(() => {
  console.log("successfully connected");
  }).catch(console.error);

// Resolve routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorsRouter = require('./routes/authors');
var booksRouter = require('./routes/books');
var categoriesRouter = require('./routes/categories');

//using middleware
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // allows cross domain requests


//using my routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/authors', authorsRouter);
app.use('/api/books', booksRouter);
app.use('/api/categories', categoriesRouter);


// create an error object,catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
 });

// error handler executed when calling next(err)
app.use(function(err, req, res, next) {
  console.log("error:::", err)
  res.status(err.status || 500).send({
      success: false,
      message: err.message
  });
});

module.exports = app;
