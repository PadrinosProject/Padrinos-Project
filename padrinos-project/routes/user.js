const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const ensureLoggedIn = require('connect-ensure-login');
//Multer for user/event image upload
const multer  = require('multer');
const upload  = multer({ dest: './public/uploads' });
const Event   = require ("../models/Event.js");
const User    = require("../models/User.js");
const Item    = require("../models/Item.js");


router.get('/view-profile/', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('user/profile', {user: req.user});
});

//View Guest Profile

router.get('/view-guest', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {

  res.render('user/guestProfile', {user: req.user});
});



module.exports = router;