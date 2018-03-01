const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const ensureLoggedIn = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const mongoose = require('mongoose');
const upload  = multer({dest: './public/uploads/event-image'});

const Event   = require("../models/Event.js");
const User    = require("../models/User.js");
const Item    = require("../models/Item.js");
const Guest    = require("../models/Guest.js");

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
  .then(createdEvent => res.redirect(`/make-list/${createdEvent._id}`))
  .catch(err => res.render('/new', {message:err}));
});

//Create List

router.get('/make-list/:id', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('./event/make-list', {user: req.user, event: req.params.id});
});
router.post('/make-list/:id', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  const listItem = [];
  for(i = 0; i < req.body.name.length; i++) {
    listItem.push({
      itemName: req.body.name[i], 
      quantity: req.body.quantity[i],
      eventId: req.params.id
    });
  }
  console.log(listItem)
  Item.create(listItem, (err, result) => {
    res.redirect(`/invite-guests/${listItem[0].eventId}`)
  })
});
//always put more than 1 item on the list for demo purposes


//Invite Guests

router.get('/invite-guests/:id', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  res.render('./event/invite-guests', {user: req.user, event: req.params.id});
});

router.post('/invite-guests/:id', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  const guestList = [];
  for(i = 0; i < req.body.name.length; i++){
    console.log(guestList);
    guestList.push({
      guestName: req.body.name[i],
      guestEmail: req.body.email[i],
      eventId: req.params.id,
      padrino: false
    });
  }
  Guest.create(guestList, (err, result) => {
    console.log(guestList);
    res.redirect('/view-events')
  })
});
//View Event

router.get('/view-events', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
    Event.find({owner: req.user._id})
      .then(result => {

        res.render('event/view-events', {user: req.user, event:result}) 
      })
 
});

//View event details

router.get('/view-events/:id', ensureLoggedIn.ensureLoggedIn(), (req, res, next) => {
  Event.findById(req.params.id, (err, event) => {
    if (err)       { return next(err) }
    if (!event) { return next(new Error("404")) }
    return res.render('event/event-details', { event: event, user : req.user })
  });
});

module.exports = router;