<<<<<<< HEAD
const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const { ensureLoggedIn }  = require('connect-ensure-login');
//Multer for event image upload
const multer  = require('multer');
const upload = multer({ dest: './public/uploads/user-image' });
const User = require ("../models/User.js");
=======
//View Profile
const express = require('express');
const router  = express.Router();
>>>>>>> ba72e303f1c81fb4ab58b06041038128bd4e621d

router.get('/view-profile', (req,res,next) => {
  res.render('/profile');
});

//View Guest Profile

router.get('/view-guest', (req,res,next) => {
  res.render('/guestProfile');
});
