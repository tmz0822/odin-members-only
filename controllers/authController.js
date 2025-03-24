const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const db = require('../db/queries');
const passport = require('passport');

const validateInputs = [
  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('First name must only contain letters'),
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Last name must only contain letters'),
  body('username')
    .trim()
    .notEmpty()
    .withMessage('Username is required')
    .isLength({ min: 4 })
    .withMessage('Username must be at least 4 characters long'),
  body('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 16 })
    .withMessage(
      'Password must be at least 6 characters long and not exceed 16 characters.'
    ),
  body('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => value === req.body.password)
    .withMessage('Passwords must match'),
];

function signUpGet(req, res) {
  res.render('sign-up-form');
}

const signUpPost = [
  validateInputs,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('sign-up-form', {
        title: 'Sign Up',
        errors: errors.array(),
      });
    }

    const { firstName, lastName, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = {
      firstName,
      lastName,
      username,
      password: hashedPassword,
    };

    await db.signUpUser(user);

    res.redirect('/login');
  },
];

function loginGet(req, res) {
  const messages = req.session.messages || [];
  req.session.messages = [];
  res.render('login-form', { messages });
}

const loginPost = passport.authenticate('local', {
  failureRedirect: '/login',
  successRedirect: '/',
  failureMessage: true,
});

function signOutGet(req, res, next) {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect('/');
  });
}

module.exports = {
  signUpGet,
  signUpPost,
  loginGet,
  loginPost,
  signOutGet,
};
