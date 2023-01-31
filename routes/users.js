var express = require('express');
var router = express.Router();
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const Users = require("../models/User");
const Todos = require('../models/Todo');
const jwt = require("jsonwebtoken");
const { body, validationResult } = require('express-validator')
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({storage});

const authenticateToken = (req, res, next) =>
{
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (token == null) return res.status(401).send("Unauthorized");

  jwt.verify(token, 'apples', (err, user) =>
  {
    if (err) return res.status(401).send("Unauthorized");

    req.user = user;
    next();
  })
}

router.get('/user/register', (req, res) =>
{
  res.render('register');
})

router.post('/user/register',
  upload.none(),
  body('email').isEmail(),
  body('password').isStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }),
  (req, res, next) =>
{
  const errors = validationResult(req);

  if (!errors.isEmpty())
  {
    return res.json({message: "Password is not strong enough"});
  }

  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({email: email}, (err, user) =>
  {
    if(err) { throw err };
    if(user) { return res.status(403).json({message: "Email already in use."}); }
    else
    {
      bcrypt.genSalt(10, (err, salt) =>
      {
        bcrypt.hash(password, salt, (err, hash) =>
        {
          if(err) throw err;
          Users.create(
            {
              email: email,
              password: hash
            },
            (err, ok) =>
            {
              if(err) throw err;
              return res.json({});
            }
          );
        });
      });
    }
  });
});

router.get('/user/login', (req, res) =>
{
  res.render('login');
})

router.post('/user/login', upload.none(), (req, res, next) =>
{
  const email = req.body.email;
  const password = req.body.password;

  Users.findOne({email: email}, (err, user) =>
  {
    if(err) throw err;
    if(!user) { return res.status(403).json({message: "Invalid credentials"}); }
    else
    {
      bcrypt.compare(password, user.password, (err, isMatch) =>
      {
        if(err) throw err;
        if(isMatch)
        {
          const jwtPayload = {
            email: user.email
          }
          jwt.sign(
            jwtPayload,
            'apples',
            {
              expiresIn: 1000
            },
            (err, token) =>
            {
              if (err)
              {
                return res.json({message: "Invalid credentials"});
              }
              return res.json({token});
            }
          );
        }
        else { return res.status(403).json({message: "Invalid credentials"}); }
      })
    }
  });
});

router.post('/todos', authenticateToken, (req, res, next) =>
{
  const email = req.user.email;
  const items = req.body.items;

  Users
    .findOne({"email": email})
    .exec((err, user) =>
    {
      if (err) next(err);
      Todos
        .findOne({"user": user._id})
        .exec((error, result) =>
        {
          if (error) next(error);
          
          if (result === null)
          {
            Todos.create(
              {
                user: user,
                items: items
              },
              (err, ok) =>
              {
                if(err) throw err;
                return res.send("ok");
              }
            );
          }
          else
          {
            items.forEach(item => result.items.push(item));
            Todos.findOneAndUpdate({"user": result.user}, result, (er, doc) =>
            {
              if (er) throw er;
              res.send("ok");
            });
          }

        })
    })
});

router.get('/todos/list', authenticateToken, (req, res, next) =>
{
  const email = req.user.email;

  Users
    .findOne({"email": email})
    .exec((err, user) =>
    {
      if (err) next(err);
      Todos
        .findOne({"user": user._id})
        .exec((error, result) =>
        {
          if (error) next(error);
          
          if (result === null)
          {
            return res.render('items', {items: []});
          }
          else
          {
            return res.render('items', {items: result.items});
          }
        });
    });
});

router.get('/private', authenticateToken, (req, res, next) =>
{
  res
  .status(200)
  .send({"email": req.user.email});
});

module.exports = router;
