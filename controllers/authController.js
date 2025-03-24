const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');

// TODO: handle signup / validate and sanitize / bcrypt the password

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
  res.render('signUpForm');
}

const signUpPost = [
  validateInputs,
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('signUpForm', {
        title: 'Sign Up',
        errors: errors.array(),
      });
    }

    const { firstName, lastName, username, password, confirmPassword } =
      req.body;
  },
];

module.exports = {
  signUpGet,
  signUpPost,
};
