const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const db = require('../db/queries');

const verifyCallback = async (username, password, done) => {
  try {
    const user = await db.getUserByUsername(username);

    if (!user) {
      return done(null, false, { message: 'Incorrect username' });
    }

    const validPassword = bcrypt.compare(password, user.password);

    if (!validPassword) {
      return done(null, false, { message: 'Incorrect password' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getUserById(id); // grab user for db
    done(null, user);
  } catch (error) {
    done(error);
  }
});
