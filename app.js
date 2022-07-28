
var createError = require('http-errors');
var express = require('express');
const session = require('express-session');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let db = require('../service/public/javascripts/db');
const bcrypt = require("bcryptjs");


var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var engineerRouter = require('./routes/engineer');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/engineer', engineerRouter);
module.exports = app;
