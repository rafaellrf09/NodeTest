module.exports = {
  estaAutenticado: function(req, res, next){
    if(req.isAuthenticated()){
      return next();
    }
    req.flash('error_msg','Sem autorização')
    res.redirect('/users/login')
  }
}
