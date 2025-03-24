const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

const {
  redirectToHomepageIfAuthenticated,
} = require('../middleware/authMiddleware');

authRouter.get(
  '/signup',
  redirectToHomepageIfAuthenticated,
  authController.signUpGet
);

authRouter.post('/signup', authController.signUpPost);

authRouter.get(
  '/login',
  redirectToHomepageIfAuthenticated,
  authController.loginGet
);
authRouter.post('/login', authController.loginPost);

authRouter.get('/signout', authController.signOutGet);

module.exports = authRouter;
