var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

module.exports = function() {
    passport.use(new LocalStrategy({
        // field names come from signUpForm in index.ejs
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        var user = {
            username: username,
            password: password
        };  
        done(null, user); 
    }));
};
