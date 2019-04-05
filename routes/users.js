const express = require('express')
const router = express.Router()
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');

//Model de User
require('../models/User')
const User = mongoose.model('users');


// User Login Route
router.get('/login',(req,res) => {
  res.render('users/login')
})
// User Register Route
router.get('/register',(req,res) => {
  res.render('users/register')
})

//Login form post
router.post('/login', (req, res, next) => {
  passport.authenticate('local',{
    successRedirect: '/',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);
});

//Register form Post
router.post('/register', (req,res) => {
  let errors = []
  if(req.body.password != req.body.password2){
    errors.push({text:"Senhas não são iguais."})
  }
  if(req.body.password.length < 4){
    errors.push({text:"Senhas precisa conter mais de 4 caracteres."})
  }

  if(errors.length > 0 ){
    res.render('users/register',{
      errors: errors,
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
      password2: req.body.password2,
    })
  }else{
    User.findOne({email: req.body.email}).then(user => {
      if(user){
        req.flash('error_msg',"Emaail ja cadastrado.").
        res.redirect('/users/register')
      }else{
        const newUser = new User({
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
        });

        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if(err) throw err;
            newUser.password = hash;
            newUser.save().then(user => {
              req.flash('success_msg',"Usuário criado com sucesso e já pode logar.");
              res.redirect('/users/login')
            }).catch(err => {
              console.log(err);
              return;
            })
          });
        });
      }
    })
  }
});

//Logout users
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', 'Você está deslogado.')
  res.redirect('/users/login')
})

module.exports = router;
