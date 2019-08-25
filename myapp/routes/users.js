const express = require('express');
const router = express.Router();
const User = require('../models/user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/new', (req, res)=>{
  res.render('newUser');
});

router.post('/', async (req, res)=>{
  const user = await User.create(req.body);
  res.redirect('login');
});

module.exports = router;
