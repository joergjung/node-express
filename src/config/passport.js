var passport = require('passport');

module.exports = function(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    // store user in session (session will be maintained via browser cookie)
    passport.serializeUser(function(user, done) {
        done(null, user);
    });
    passport.deserializeUser(function(user, done) {
        done(null, user);
    });
    // everything handling local strategy is in this file
    require('./strategies/local.strategy')(); 
};
