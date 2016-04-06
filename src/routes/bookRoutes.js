var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// Database IDs are ObjectIDs
var objectId = require('mongodb').ObjectID;

var router = function(nav) {

    // secure all book routes. if you're not logged in, you got to '/'
    bookRouter.use(function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    });

    bookRouter.route('/')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books'); 

                collection.find({}).toArray(function(err, results) {
                    res.render('bookListView', {title: 'Books',
                        // use the nav paramter which has been passed into the function
                        nav: nav,
                        // the whole books array
                        books: results
                    });
                });
            });
        });

    bookRouter.route('/:id')
        .get(function(req, res) {
            var id = new objectId(req.params.id);
            var url = 'mongodb://localhost:27017/libraryApp';
            
            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                
                collection.findOne({_id: id}, function(err, results) {
                    res.render('bookView', {title: 'Books',
                        // use the nav paramter which has been passed into the function
                        nav: nav,
                        // the whole books array
                        book: results
                    });
                });
            });
        });

    return bookRouter;
};
// export the router function
module.exports = router;