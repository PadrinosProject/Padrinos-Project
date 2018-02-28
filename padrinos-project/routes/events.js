const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const ensureLoggedIn = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload  = multer({dest: './public/uploads/event-image'});

const Event   = require ("../models/Event.js");
const User    = require("../models/User.js");

//Create Event

router.get('/new', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('./event/new', {user: req.user});
});

router.post('/new', ensureLoggedIn.ensureLoggedIn(), upload.single('photo'), (req,res,next) => {
  const newEvent = new Event({
    owner: req.user._id,
    name: req.body.eventTitle,
    category: req.body.eventCategory,
    date: req.body.startDate,
    location: req.body.location,
    photo: `/uploads/event-image/${req.file.filename}`,
    description: req.body.eventDescription
  });
  newEvent.save()
  .then(createdEvent => res.redirect(`/view-events`))
  .catch(err => res.render("error", {message:err}));
});

//View Event

router.get('/view-events', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  console.log(req.user)
    Event.find({owner: req.user._id})
      .then(result => {
        console.log(result)
        res.render('event/view-events', {user: req.user, event:result}) 
      })
 ;
});

//view event details

router.get('/view-events/:id', ensureLoggedIn.ensureLoggedIn(), (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err)       { return next(err) }
    if (!event) { return next(new Error("404")) }
    console.log(event)
    return res.render('event/event-details', { event: event })
  });
});


//second step - create list

router.get('/make-list', (req, res)=>{
res.render('event/make-list')
});

module.exports = router;