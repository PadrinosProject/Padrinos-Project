//From Andrei's Funding Example
const LocalStrategy      = require('passport-local').Strategy;
const FbStrategy         = require('passport-facebook').Strategy;
const GoogleStrategy     = require("passport-google-oauth").OAuth2Strategy;
const User               = require('../models/User');
const bcrypt             = require('bcrypt');
const passport           = require("passport");
const passportSession    = require("passport-session");
const flash              = require("connect-flash");
const app                = require("../app.js")

module.exports = function (app) {
  // NEW
  passport.serializeUser((user, cb) => {
    cb(null, user.id);
  });
  
  passport.deserializeUser((id, cb) => {
    User.findById(id, (err, user) => {
      if (err) { return cb(err); }
      cb(null, user);
    });
  });

  //Use Flash

  app.use(flash());
  
  // Signing Up
  passport.use('local-signup', new LocalStrategy(
    { passReqToCallback: true },
    (req, username, password, next) => {
        console.log("entrando a local-signup");
        console.log(req.body)
      // To avoid race conditions
      process.nextTick(() => {
          User.findOne({
              'username': username
          }, (err, user) => {
              if (err){ return next(err); }
  
              if (user) {
                  return next(null, false);
              } else {
                  // Destructure the body
                  if (req.body.password !== req.body.confirmPassword) {
                    //missing error message "use Connect-Flash"
                    console.log("error with password");
                    return (next(err));
                  }
                  const { username, email, password, photo } = req.body;
                  const hashPass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
                  const newUser = new User({
                    username,
                    email,
                    password: hashPass,
                    photo,
                  });
                  newUser.save((err) => {
                      if (err){ next(err); }
                      return next(null, newUser);
                  });
              }
          });
      });
  }));

  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, next) => {
    User.findOne({ username }, (err, user) => {
      if (err) {
        return next(err);
        console.log(err);
      }
      if (!user) {
        return next(null, false, { message: "Incorrect username" });
        console.log(message);
      }
      if (!bcrypt.compareSync(password, user.password)) {
        return next(null, false, { message: "Incorrect password" });
        console.log(message);
      }
      return next(null, user);
    });
  }));

  //Sign in with Facebook
  passport.use(new FbStrategy({
    clientID: "343564306134625",
    clientSecret: "2657327f68385ea4aaf530245bf34624",
    callbackURL: "/auth/facebook/callback"//UPDATE THIS?
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
  
      const newUser = new User({
        facebookID: profile.id
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));
  //Sign in with Google
  passport.use(new GoogleStrategy({
    clientID: "536900773588-hsa9g3qsg18p5ri2hg4u77gvivl2t2a5.apps.googleusercontent.com",
    clientSecret: "WRtMDGw4z-wInK1bpwEtUVww",
    callbackURL: "/auth/google/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        return done(null, user);
      }
  
      const newUser = new User({
        googleID: profile.id
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        done(null, newUser);
      });
    });
  
  }));

  // NEW
  app.use(passport.initialize());
  app.use(passport.session());
}