var express   = require('express'),
    router    = express.Router(),
    User      = require('../models/user'),
    passport  = require('passport');


router.get("/", function(req, res){
  res.redirect("/patients");
});

router.get("/register", function(req, res) {
  res.render("register");
});

router.post("/register", function(req, res) {
  User.register(new User({username: req.body.username}), req.body.password, function(err, user) {
    if(err) {
      console.log(err);
      res.render("login");
    }
    return res.redirect("/patients");
  });
});

router.get("/login", function(req, res) {
  res.render("login");
});

router.post("/login", passport.authenticate("local",
    {successRedirect: "/patients", failureRedirect:"/login"}),
    function(req, res) {
});

router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/patients");
});

function isLoggedIn(req, res, next) {
  if(req.isAuthenticated()) {
    return next();
  } else {
    res.redirect("/login");
  }
};

module.exports = router;
