const express = require('express');
const router = express.Router();
const jwt = require("jsonwebtoken");

const authenticateToken = (req, res, next) =>
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  console.log(token);
  if (token == null) return res.render('index', { title: 'Express', signedIn: false});

  jwt.verify(token, 'apples', (err, user) =>
  {
    if (err) return res.render('index', { title: 'Express', signedIn: false});
    req.user = user;
    next();
  })
}

router.get('/', authenticateToken, (req, res, next) =>
{
  const email = req.user.email;
  console.log(email);
  return res.render('index', { title: 'Express', signedIn: true, email: email });
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
