const express = require('express');
const path = require('node:path');
const passport = require('passport');
const session = require('express-session');

const authRouter = require('./routes/authRouter');
const usersRouter = require('./routes/usersRouter');
const messagesRouter = require('./routes/messagesRouter');

const pool = require('./db/pool');

const pgSession = require('connect-pg-simple')(session);

const app = express();

// ejs
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// basic middleware
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: false }));

// session setup
const sessionStore = new pgSession({
  pool: pool,
  tableName: 'sessions',
  createTableIfMissing: true,
});

app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    store: sessionStore,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

// authentication
require('./config/passport');
app.use(passport.session());

app.use((req, res, next) => {
  // console.log(req.session);
  // console.log(req.user);
  res.locals.user = req.user || null;
  next();
});

// routers
app.use('/', authRouter);
app.use('/user', usersRouter);
app.use('/messages', messagesRouter);
app.use('/', (req, res) => res.render('index'));

// server
const PORT = 3000;
app.listen(PORT, () => {});
