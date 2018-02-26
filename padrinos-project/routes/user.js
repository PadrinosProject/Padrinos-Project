//View Profile

router.get('/view-profile', (req,res,next) => {
  res.render('/view-profile');
});

//View Guest Profile

router.get('/view-guest', (req,res,next) => {
  res.render('/view-guest');
});
