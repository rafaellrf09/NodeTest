const localStategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = mongoose.model('users')

module.exports = function(passport){
  passport.use(new localStategy({usernameField: 'email'}, (email, password, done) => {
    console.log(email)
  }))
}
