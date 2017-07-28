var path = require("path");
var express = require("express");
var app = express();
var routes = require('./routes/index.js');
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var passport = require("passport");
var session = require('express-session');
var flash = require("connect-flash");
var baseUrl = require('url');
require('dotenv').config();

mongoose.Promise = Promise;

var database = process.env.VOTING_APP_DB || "mongodb://localhost/voting-app";
mongoose.connect(database);

app.set('view engine', 'ejs');

//Setting the paths to static files
app.use("/controllers", express.static(path.join(__dirname, 'controllers')));
app.use(express.static(path.join(__dirname, 'commons')));
app.use(express.static(path.join(__dirname, 'public')));

//Setting sessions and passport to work with auth
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

//middleware to pass the flash messages
app.use(function(req, res, next){
   res.locals.error = req.flash("error");
   res.locals.success = req.flash("success");
   next();
});

//Middleware to parse POST requests
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true }));

routes(app);


app.listen((process.env.PORT || 3000), () => {
    console.log("Server up");
});