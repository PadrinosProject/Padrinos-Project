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
    successRedirect: "/",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));

router.get('/signup', ensureLoggedOut(), (req, res) => {
    res.render('authentication/signup', {message: req.flash("error")});
});

router.post('/signup', ensureLoggedOut(), passport.authenticate('local-signup', {
    successRedirect: "/login",
    failureRedirect: "/signup",
    failureFlash: true,
    passReqToCallback: true
  }));

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});
/*
authRoutes.get("/private-page", ensureLogin.ensureLoggedIn(), (req, res) => {
    res.render("private", { user: req.user });
  });
*/

module.exports = router;