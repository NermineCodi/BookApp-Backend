require("dotenv").config();
var express = require('express');
var path = require('path');
var logger = require('morgan');
var createError = require('http-errors');

const cors = require('cors');
var mongoose = require('mongoose');
var app = express();

//requiring my routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var authorsRouter = require('./routes/authors');

//using middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors()); // allows cross domain requests


// perform a database connection when the server starts
// Connect to DB
mongoose.connect(process.env.CONNECTION_STRING, {
  dbName: process.env.DB_NAME,
  useNewUrlParser: true,
  useUnifiedTopology: true 
  }).then(() => {
  console.log("successfully connected");
  }).catch(console.error);
  


//using my routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api/authors', authorsRouter);

module.exports = app;
