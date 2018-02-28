const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const ensureLoggedIn = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload  = multer({ dest: './public/uploads/event-image' });
const Event   = require ("../models/Event.js");
const User    = require("../models/User.js");

//Create Event

router.get('/new', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('./event/new', {user: req.user});
});

router.post('/new', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  const newEvent = new Event({
    owner: req.user._id,
    name: req.body.eventTitle,
    category: req.body.eventCategory,
    date: req.body.usr_time,
    location: req.body.location,
    photo: req.body.photo,
  });
  newEvent.save()
  .then(createdEvent => res.send(`Successfuly saved`))
  .catch(err => res.render("error", {message:err}));
});

//View Event

router.get('/view-events', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('event/view-events', {user: req.user});
});


module.exports = router;