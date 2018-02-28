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
  res.render('./event/view-events');
  const newEvent = new Event({
    name: req.body.eventTitle,
    owner: user._id,
    category: req.body.eventCategory,
    date: req.body.usr_time,
    photo: req.body.photo,
  });
  newEvent.save((err) => {
      if (err){ next(err); }
      return next(null, newEvent);
  });
});
//View Event

router.get('/view-events', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('event/view-events', {user: req.user});
});


module.exports = router;