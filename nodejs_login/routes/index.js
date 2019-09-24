const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
router.get('/', (req, res) => res.render('home'));

//dashboard get
router.get('/dashboard', ensureAuthenticated, (req, res) => {
    res.render('dashboard', { nome: req.user.nome });
});

module.exports = router;
