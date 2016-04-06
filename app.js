var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');


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
var authRouter = require('./src/routes/authRoutes')(nav);

// define static directory
app.use(express.static('public'));
// bodyParser handles the request body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({secret: 'library'}));
// everything dealing with passport is in this file
require('./src/config/passport')(app);

app.set('views', './src/views');
app.set('view engine', 'ejs');

app.use('/Books', bookRouter);
app.use('/Admin', adminRouter);
app.use('/Auth', authRouter);

app.get('/', function(req, res) {
    res.render('index', {title: 'Library Demo App',
    nav: nav
    });
});

app.listen(5000, function(err) {
    console.log('running server on port' + port);
});
