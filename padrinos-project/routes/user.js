const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const { ensureLoggedIn }  = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/user-image' });
const User = require ("../models/User.js");

router.get('/view-profile', (req,res,next) => {
  res.render('user/profile');
});

//View Guest Profile

router.get('/view-guest', (req,res,next) => {
  res.render('user/guestProfile');
});
