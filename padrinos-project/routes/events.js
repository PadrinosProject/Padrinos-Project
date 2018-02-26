const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const { ensureLoggedIn }  = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/' });
const User = require ("../models/User.js");

//Create Event

router.get('/new', (req,res,next) => {
  res.render('/new');
});

//View Event

router.get('/view-events', (req,res,next) => {
  res.render('/view-events');
});


module.exports = router;
