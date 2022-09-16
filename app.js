var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');
const passport = require('passport')
const helmet = require('helmet');
const rateLimit = require("express-rate-limit");
const cors = require('cors');

//require config
const config =require('./config/index')
//import middleware
const errorHandler = require('./middleware/errorHandler');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var shopRouter = require('./routes/shop');

var app = express();

app.use(cors());
// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
app.set('trust proxy', 1);
 
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 10 วินาที
    max: 100 // limit each IP to 100 requests per windowMs
});
   
//  apply to all requests
app.use(limiter);
//use helmet
app.use(helmet());

mongoose.connect(config.MONGODB_URI);

app.use(logger('dev'));
app.use(express.json({
    limit: '50mb'
}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


//init passport
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/shop', shopRouter);


app.use(errorHandler);

module.exports = app;
