const { Router } = require('express');

const usersRouter = Router();

const usersController = require('../controllers/usersController');

usersRouter.get('/membership', usersController.membershipGet);
usersRouter.post('/membership', usersController.membershipPost);

module.exports = usersRouter;
