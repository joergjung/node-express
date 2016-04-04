var express = require('express');
var app = express();
// get port from process environment (gulpfile.js) or use 5000
var port = process.env.PORT || 5000;

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render('index', {title: 'Hello from render', list: ['a', 'b']});
});

app.get('/booksy', function(req, res) {
    res.send('Hello from books');
});

app.listen(5000, function(err) {
    console.log('running server on port' + port);
});
