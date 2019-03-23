var express           = require('express'),
    app               = express(),
    request           = require('request'),
    bodyParser        = require('body-parser'),
    mongoose          = require('mongoose'),
    passport          = require('passport'),
    LocalStrategy     = require('passport-local'),
    Patient           = require('./models/patient'),
    User              = require('./models/user');

//seedDB();
mongoose.connect('mongodb://localhost/mrs');
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + '/public'));

app.use(require("express-session")({
  secret: "bla bla bla food is good bla bla bla",
  resave: false,
  saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(function(req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

app.use("/", require('./routes/index'));
app.use("/patients", require('./routes/patients'));
app.use("/records", require('./routes/records'));

app.listen(5000, '0.0.0.0', function() {
  console.log("App started on localhost:5000/");
});
