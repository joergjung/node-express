var http = require('http');
// goodreads returns XML, need to convert it to JSON
var xml2js = require('xml2js');
var parser = xml2js.Parser({explicitArray: false});

var goodreadsService = function() {

    // cb = callback
    var getBookById = function(id, cb) {
        var options = {
            host: 'www.goodreads.com',
            path: '/book/show/'+ id +'?format=xml&key=insert_goodreads_Key_here'
        };

        var callback = function(response) {
            var str = '';
            response.on('data', function(chunk) {
                str += chunk;
            });
            response.on('end', function() {
                parser.parseString(str, function(err, result) {
                    //GoodreadsResponse.book (this is the part of the XML response object from Goodreads where the book info is stored)
                    cb(null, result.GoodreadsResponse.book);
                });
            });
        };

        http.request(options, callback).end();
    };

    return {
        getBookById: getBookById
    };
};

module.exports = goodreadsService;
