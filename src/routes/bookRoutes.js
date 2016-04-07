var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
// Database IDs are ObjectIDs
var objectId = require('mongodb').ObjectID;


var router = function(nav) {
    // naming it "bookService" because there might be another book-company (API provider) in the future
    var bookService = require('../services/goodreadsService')();
    var bookController = require('../controllers/bookController')(bookService, nav);

    // secure all book routes via middleware
    bookRouter.use(bookController.middleware);

    // define various routes, using bookController
    bookRouter.route('/')
        .get(bookController.getIndex);

    bookRouter.route('/:id')
        .get(bookController.getById);

    return bookRouter;
};
// export the router function
module.exports = router;