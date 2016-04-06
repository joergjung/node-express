var express = require('express');
var authRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var router = function() {
    authRouter.route('/signUp')
        .post(function(req, res) {

            var url = 'mongodb://localhost:27017/libraryApp';
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('users');
                var user = {
                    username: req.body.userName,
                    password: req.body.password
                };

                collection.insert(user, function(err, results) {
                   // the login information (req.login) has been provided by passport
                   // ops[0] is the part of the results object where username, password and id are stored
                   req.login(results.ops[0], function() {
                        res.redirect('/auth/profile');
                    });
               });
            });
        });

    authRouter.route('/signIn')
        // use local strategy (src/config/strategies/local.strategy.js)
        .post(passport.authenticate('local', {
            failureRedirect: '/'
        }), function(req, res) {
            res.redirect('/auth/profile');
        });

    authRouter.route('/profile')
        .all(function(req, res, next) {
            // if user not logged in, redirect to '/'
            if (!req.user) {
                res.redirect('/');
            }
            // you only can get to the get method below if you are logged in
            // next() let's you go there
            next();
        })
        .get(function(req, res) {
            res.json(req.user);
        });

    return authRouter;
};

module.exports = router;
