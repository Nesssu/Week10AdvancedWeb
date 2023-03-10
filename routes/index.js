const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/', (req, res) =>
{
  return res.render('index', {title: 'Express'});
});

router.post('/', (req, res) =>
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.render('loggedOut')

  jwt.verify(token, 'apples', (err, user) =>
  {
    if (err) return res.render('loggedOut');

    return res.render('loggedIn', {email: user.email});
  })
});

router.get('/register.html', (req, res, next) =>
{
  res.render('register', { title: 'Register' });
});

router.get('/login.html', (req, res, next) =>
{
  res.render('login', { title: "Login" });
});

module.exports = router;
