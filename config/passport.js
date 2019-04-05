const localStategy = require('passport-local').Strategy;
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const User = mongoose.model('users')

module.exports = function(passport){
  passport.use(new localStategy({usernameField: 'email'}, (email, password, done) => {
    //User match
    User.findOne({
      email:email
    }).then(user => {
      if(!user){
        return done(null, false, {message: "nenhum usuário encontrado."});
      }
      //Mach password
      bcrypt.compare(password, user.password, (err , isMatch) => {
        if(err) throw err;
        if(isMatch){
          return done(null, user)
        }else{
          return done(null, false, {message: "Senha incorreta."})
        }
      })
    })
  }));

  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

}
