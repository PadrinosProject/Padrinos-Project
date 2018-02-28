const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const ensureLoggedIn = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload  = multer({ dest: './public/uploads/event-image' });
const Event   = require ("../models/Event.js");
const User    = require("../models/User");

//Create Event

router.get('/new', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('./event/new', {user: req.user});
});

router.post('/new', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('./event/new');
});

//View Event

router.get('/view-events', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('event/view-events', {user: req.user});
});


module.exports = router;
