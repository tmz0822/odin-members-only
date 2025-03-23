const { Router } = require('express');

const usersRouter = Router();

usersRouter.get('/signup');
usersRouter.post('/signup');

module.exports = usersRouter;
