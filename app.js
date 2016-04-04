var express = require('express');
var app = express();
var port = 5000;

app.use(express.static('public'));

app.get('/', function(req, res) {
    res.send('Hello world');
});

app.get('/books', function(req, res) {
    res.send('Hello from books');
});

app.listen(5000, function(err) {
    console.log('running server on port' + port);
    
});