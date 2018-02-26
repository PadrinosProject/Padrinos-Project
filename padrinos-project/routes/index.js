const express = require('express');
const router  = express.Router();

/* GET home page. */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.post('/', (req, res, next) => {
  res.render ('index');
});

//Signup

router.get('/signup', (req, res, next) => {
  res.render('/signup');
});

//Login

router.get('/login', (req, res, next) => {
  res.render('/login');
});

router.post('/login', (req, res, next) => {
  res.send('logged in!!');
})

//Logout

router.get('/logout', (req,res,next) => {
  res.render('/index');
});

//Create Event

router.get('/create', (req,res,next) => {
  res.render('/create');
});

//View Profile

router.get('/view-profile', (req,res,next) => {
  res.render('/view-profile');
});

//View Event

router.get('/view-events', (req,res,next) => {
  res.render('/view-events');
});

//View Guest Profile

router.get('/view-guest', (req,res,next) => {
  res.render('/view-guest');
});

module.exports = router;
