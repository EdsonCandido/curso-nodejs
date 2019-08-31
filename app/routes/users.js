const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../models/user.schema');

/* GET users listing. */
router.get('/', (req, res) => {
  if (!req.session.user) {
    res.render('login', { msg_erro: '[ERROR] Faça login para acessar!' });
  } else {
    User.find().then((listUser) => {
      res.status(200).render('listUser', { listUser: listUser, name_user: req.session.user.nome });
    }).catch((err) => {
      res.status(400).render('listUser', { msg_erro: '[ERROR] Algo de inesperado aconteceu' });

    });
  }

});

router.get('/add', (req, res) => {
  res.render('addUser');
});

router.get('/logout', (req, res) => {

  req.session.destroy((err) =>{
    req.session = null;
    res.redirect(302,'/');
  });

});

/* POST users */
router.post('/', async (req, res) => {

  const erros = [];

  let nome = req.body.nome;
  let login = req.body.login;
  let password = req.body.password;

  if (!nome || typeof nome == undefined || nome == null)
    erros.push({ msg_erro: 'Nome inválido' });
  if (!login || typeof login == undefined || login == null)
    erros.push({ msg_erro: 'Login inválido' });
  if (!password || typeof password == undefined || password == null)
    erros.push({ msg_erro: 'Password inválido' });

  if (erros.length > 0)
    res.render('addUser', { erros: erros });
  else {
    await User.create(req.body).then(() => {
      res.render('login');
    }).catch(err => {
      res.render('addUser', { msg_erro: '[ERROR] Algo de inesperado aconteceu' });
      console.log(err);
    });
  }
});

router.post('/authenticate', async (req, res) => {
  const { login, password } = req.body;

  const user = await User.findOne({ login: login });

  if (!user)
    return res.status(400).render('login', { msg_erro: '[ERROR] Usuário não existe' });

  if (! await bcrypt.compare(password, user.password))
    return res.status(403).render('login', { msg_erro: '[ERROR] Senha incorreta' });
  req.session.user = user;
  res.redirect(302, '/users');

});


module.exports = router;
