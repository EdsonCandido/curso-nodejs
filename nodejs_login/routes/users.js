const express = require('express');
const router = express.Router();
const User = require('../models/User');
const passport = require('passport');

//login page
router.get('/login', (req, res) => { res.render('login') });

//register page
router.get('/register', (req, res) => { res.render('register') });

//register handle
router.post('/register', (req, res) => {
    const { nome, email, password } = req.body;
    let erros = [];

    if (!nome || typeof nome == undefined || nome == null)
        erros.push({ msg_erro: 'Nome inválido' });
    if (!email || typeof email == undefined || email == null)
        erros.push({ msg_erro: 'Login inválido' });
    if (!password || typeof password == undefined || password == null)
        erros.push({ msg_erro: 'Password inválido' });

    if (erros.length > 0) {
        res.render('register', { erros });
    } else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    erros.push({ msg_erro: 'Este email já está cadastrado' });
                    return res.render('register');
                }
            })
    }
    User.create(req.body)
        .then(() => {
            req.flash('susses_msg', 'Cadastrado com Sucesso');
            res.redirect('/user/login');
        }).catch(err => console.log(err));

});

//login handle
router.post('/login', (req, res, next) => {
    passport.authenticate('local', {
        successRedirect: '/dashboard',
        failureRedirect: '/user/login',
        failureFlash: true,
    })(req, res, next);
});

router.get('/logout', (req, res) => {
    req.logout();
    req.flash('susses_msg', 'Deslogado com sucesso');
    res.redirect('/user/login');
});

module.exports = router;
