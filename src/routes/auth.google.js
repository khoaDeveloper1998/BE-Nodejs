const passport = require("passport")


module.exports = function (app) {
    app.get('/auth/google',
            passport.authenticate('google',{
                scope : ['openid','profile','email']
            })
    )
    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/stations');
    });        
}