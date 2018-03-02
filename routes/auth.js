const express = require('express');
const router  = express.Router();
const passport = require ("passport");
const LocalStrategy = require('passport-local').Strategy;
const flash = require("connect-flash");
const {ensureLoggedIn, ensureLoggedOut} = require('connect-ensure-login');
const app = require("../app.js");

//multer
var multer  = require('multer');
var upload = multer({ dest: './public/uploads/' });


router.get('/login', ensureLoggedOut(), (req, res) => {
    //if(!req.isAuthenticated()){res.redirect('/')};
    res.render('authentication/login', {message: req.flash("error")});
});

router.post("/login", ensureLoggedOut(), passport.authenticate("local-login", {
    successRedirect: "/view-events",
    failureRedirect: "/login",
    failureFlash: true,
    passReqToCallback: true
  }));
//photo
router.get('/signup', ensureLoggedOut(), (req, res) => {
    
    res.render('authentication/signup');
    
});

router.post('/signup', ensureLoggedOut(),upload.single("myPhoto"), passport.authenticate('local-signup', {
    successRedirect: "/view-events",
    failureRedirect: "/signup",
    failureFlash: true,
    passReqToCallback: true
  }));

//upload photo
  var upload = multer({ dest: './public/uploads/' });

  router.post('/upload', upload.single('photo'), function(req, res){
    const pic = new Picture({
      name: req.body.name,
      path: `/uploads/${req.file.filename}`,
      originalName: req.file.originalname
    });
  
    pic.save((err) => {
        res.redirect('/profile');
    });
  });
  


//Facebook Auth
router.get("/auth/facebook", passport.authenticate("facebook"));
router.get("/auth/facebook/callback", passport.authenticate("facebook", {
successRedirect: "/view-events",
failureRedirect: "/"
}));

//Google Auth
router.get("/auth/google", passport.authenticate("google", {
    scope: ["https://www.googleapis.com/auth/plus.login",
            "https://www.googleapis.com/auth/plus.profile.emails.read"]
  }));
  
router.get("/auth/google/callback", passport.authenticate("google", {
    failureRedirect: "/",
    successRedirect: "/view-events"
  }));

router.get('/logout', ensureLoggedIn('/login'), (req, res) => {
    req.logout();
    res.redirect('/');
});

module.exports = router;