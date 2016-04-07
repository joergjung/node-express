var mongodb = require('mongodb').MongoClient;
// Database IDs are ObjectIDs
var objectId = require('mongodb').ObjectID;

var bookController = function(bookService, nav) {

    // if not logged in, go to '/'
    var middleware = function(req, res, next) {
        if (!req.user) {
            res.redirect('/');
        }
        next();
    };

    var getIndex = function(req, res) {
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
    };

    var getById = function(req, res) {
        var id = new objectId(req.params.id);
        var url = 'mongodb://localhost:27017/libraryApp';

        mongodb.connect(url, function(err, db) {
            var collection = db.collection('books');

            collection.findOne({
                _id: id
            },
            function(err, results) {
                // if there is a bookId, use bookService, otherwise render
                if (results.bookId) {
                    bookService.getBookById(results.bookId,
                    function(err, book) {
                        //results.book (bookService book description)
                        results.book = book;
                        res.render('bookView', {
                            title: 'Books',
                            // use the nav paramter which has been passed into the  bookController function
                            nav: nav,
                            // the whole books array
                            book: results
                        });
                    });
                } else {
                    res.render('bookView', {
                        title: 'Books',
                        // use the nav paramter which has been passed into the  bookController function
                        nav: nav,
                        // the whole books array
                        book: results
                    });
                }
            });
        });
    };

    return {
        getIndex: getIndex,
        getById: getById,
        middleware: middleware
    };
};

module.exports = bookController;
