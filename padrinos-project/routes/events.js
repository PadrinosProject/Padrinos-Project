const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const { ensureLoggedIn }  = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/event-image' });
const User = require ("../models/Event.js");

//Create Event

router.get('/new', (req,res,next) => {
  res.render('/new');
});

//View Event

router.get('/listEvent', (req,res,next) => {
  res.render('/listEvent');
});

//View Event

router.get('/listEvent/:id', (req,res,next) => {
  res.render('/singleEvent');
});


module.exports = router;
