const { Router } = require('express');

const authRouter = Router();

const authController = require('../controllers/authController');

authRouter.get('/signup', authController.signUpGet);
authRouter.post('/signup', authController.signUpPost);

module.exports = authRouter;
