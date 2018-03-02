const express = require('express');
const router  = express.Router();
//Ensure user is logged in
const ensureLoggedIn = require('connect-ensure-login');
const Event   = require ("../models/Event.js");
const User    = require("../models/User.js");
const Item    = require("../models/Item.js");

router.post('/:itemID', ensureLoggedIn.ensureLoggedIn(), (req,res,next) => {
  console.log(req.params.itemID)
  console.log(req.user)
  const update = {
    padrino:req.user.username
  }
    Item.findByIdAndUpdate(req.params.itemID, update, function (err,result) {
      console.log(result)
      res.redirect(`/view-events/${result.eventId}`)
    })
});

module.exports = router;