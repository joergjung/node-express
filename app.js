var express = require('express');
var app = express();
// get port from process environment (gulpfile.js) or use 5000
var port = process.env.PORT || 5000;
var nav = [{
    Link:'/Books',
    Text: 'Books'
    }, {
    Link: '/Authors',
    Text: 'Authors'
}];
// pass the nav as function parameter
var bookRouter = require('./src/routes/bookRoutes')(nav);
var adminRouter = require('./src/routes/adminRoutes')(nav);

app.use(express.static('public'));
app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);

app.get('/', function(req, res) {
    res.render('index', {title: 'Library Demo App',
    nav: nav
    });
});

app.listen(5000, function(err) {
    console.log('running server on port' + port);
});
