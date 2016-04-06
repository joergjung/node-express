var passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    mongodb = require('mongodb').MongoClient;

module.exports = function() {
    passport.use(new LocalStrategy({
        // field names come from signUpForm in index.ejs
        usernameField: 'userName',
        passwordField: 'password'
    },
    function(username, password, done) {
        var url = 'mongodb://localhost:27017/libraryApp';
        mongodb.connect(url, function(err, db) {
            var collection = db.collection('users');
            collection.findOne({
                username: username
            },
            function(err, results) {
                if (results.password === password) {
                    var user = results;
                    done(null, user);
                } else {
                    // password wrong
                    // error null - but user is false, so authRouter for signIn will failureRedirect to '/'
                    done(null, false, {message: 'Bad password!'});
                }
            }
            );
        });
    }));
};
