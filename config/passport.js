const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const verifyCallback = async (username, password, done) => {};

const strategy = new LocalStrategy(verifyCallback);

passport.use(strategy);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = {}; // grab user for db
    done(null, user);
  } catch (error) {
    done(error);
  }
});

module.exports = passport;
