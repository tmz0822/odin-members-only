const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

authRouter.get('/signup', authController.signUpGet);
authRouter.post('/signup', authController.signUpPost);

authRouter.get('/login', authController.loginGet);
authRouter.post('/login', authController.loginPost);

authRouter.post('/signout', authController.signOutPost);

module.exports = authRouter;
