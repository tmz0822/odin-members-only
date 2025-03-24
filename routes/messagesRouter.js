const { Router } = require('express');

const messagesRouter = Router();

const messagesController = require('../controllers/messagesController');

messagesRouter.get('/new-message', messagesController.newMessageGet);
messagesRouter.post('/new-message', messagesController.newMessagePost);

module.exports = messagesRouter;
