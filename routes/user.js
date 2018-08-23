const express = require('express');
const router  = express.Router();
const ensureLoggedIn = require('connect-ensure-login');
const multer  = require('multer');
const upload  = multer({ dest: './public/uploads' });
const Event   = require ("../models/Event.js");
const User    = require("../models/User.js");
const Item    = require("../models/Item.js");

router.get('/view-profile/', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('user/profile', {user: req.user});
});

router.get('/view-guest', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('user/guestProfile', {user: req.user});
});

module.exports = router;
