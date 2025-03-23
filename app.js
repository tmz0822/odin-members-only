const express = require('express');
const path = require('node:path');
const passport = require('passport');
const session = require('express-session');

const indexRouter = require('./routes/indexRouter');

const app = express();

// ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// basic middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// authentication
app.use(session({ secret: 'secret', resave: false, saveUninitialized: false }));
app.use(passport.session());

// routers
app.use('/', indexRouter);

// server
const PORT = 3000;
app.listen(PORT, () => {});
