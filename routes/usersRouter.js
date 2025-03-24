const { Router } = require('express');

const usersRouter = Router();

const usersController = require('../controllers/usersController');
const { isAuthenticated } = require('../middleware/authMiddleware');

usersRouter.get('/membership', isAuthenticated, usersController.membershipGet);
usersRouter.post('/membership', usersController.membershipPost);

module.exports = usersRouter;
