const express = require('express');
const router = express.Router();
const User = require('../models/user');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login',{title: 'Login'});
});

router.post('/', (req, res) => {
    const {login, senha} = req.body;


});

module.exports = router;
