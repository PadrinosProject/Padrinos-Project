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
    callbackURL: "/auth/facebook/callback"
  }, (accessToken, refreshToken, profile, done) => {
    User.findOne({ facebookID: profile.id }, (err, user) => {
      if (err) {
        return done(err);
      }
      if (user) {
        //app.locals.user = user;
        return done(null, user);
      }
      const newUser = new User({
        username: profile.displayName,
        facebookID: profile.id,
        email: profile.email,
        photo: `https://graph.facebook.com/${profile.id}/picture?picture?type=large&width=720&height=720`
      });
  
      newUser.save((err) => {
        if (err) {
          return done(err);
        }
        //app.locals.user = newUser;
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
        username: profile.displayName,
        googleID: profile.id,
        email:    profile.emails[0].value,
        photo:    profile.photos[0].value
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

/* heroku --version
make sure to npm i
npm start
monitor server
git checkout master
git merge dev
check for errors
npm i to ensure things are working
test page
dashboard.heroku.com
heroku create
change databases in all parts of document to mlab database (this is mongo)
do a mlab db deployment
learn about sharding and replication sets. Less DBs = faster performance for sandbox.
select AWS for cloud provider, since it's free up to .5 gigs (in mlab)
select the closest DB 
naming convention of DB: keep in mind that these are just for administrators of the app for their use.
user must have access to the database, add users in mlab for DB administrators
connect using the mlab drive in UFI. Pegar the db address to compass DB to set up the connection. 
you can set up multiple projects to connect to the same DBs, this is useful for doing prototyping
go to mongoose connect in project app.js, substitute it with the string from mlab, username and 
password should go after the ://username:password@.........etc
npm i -S dotenv
what is this? file to save passwords importantes. save .env in the root dir. written in linux 
.env
DATABASE_URL=mongo sandbox url
then in app.js require('dotenv)

mongoose.connect(process.env.DATABASE_URL)

deploy to heroku is okay with the .env
not to git add .env to git ignore so that it's hidden
always use cloud DBs so that you can upload them whenever you like

upload
git add -A (starting from this point, absolutely everything down folder)
git commit -m ..."
git remote -v to check that heroku is that, if not, go to heroku create to make sure its there and if not to add 
the heroku repo in the terminal
git push heroku master
get heroku app address, paste it in the url path, then see it run!
make sure the server host is updated to the new DB as well for FB and google in the URL authorized.
it's fine to keep it local, but PRO to rock it on heroku

checking issues
heroku log
heorku open
troubleshoot as needed and be extra sure to change any DB routes within APIs or app methods for functionality










*/
