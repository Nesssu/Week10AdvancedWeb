const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

router.get('/', (req, res) =>
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.render('error', {title: "Express"});

  jwt.verify(token, 'apples', (err, user) =>
  {
    if (err) return res.render('error', {title: "Express"});

    return res.render('index', {title: "Express", email: user.email});
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
