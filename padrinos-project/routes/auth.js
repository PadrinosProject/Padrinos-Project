const express = require('express');
const router  = express.Router();
const passport = require ("passport");
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");
const { ensureLoggedIn, ensureLoggedOut } = require('connect-ensure-login');

router.get('/login', ensureLoggedOut(), (req, res) => {
    res.render('authentication/login', {message: req.flash("error")});
});

router.post("/login", ensureLoggedOut(), passport.authenticate("local-login", {
    successRedirect: "/view-events",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {message: req.flash("error")});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
    successRedirect: "/view-events",
    failureRedirect: "/signup",
    failureFlash: true,
    passReqToCallback: true
  }));

//Facebook Auth
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
successRedirect: "/view-events", //CHECK THIS ROUTING
failureRedirect: "/"
}));

//Google Auth
router.get("/auth/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"]
  }));
  
router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/", //CHECK THIS ROUTING
    successRedirect: "/view-events"
  }));

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;