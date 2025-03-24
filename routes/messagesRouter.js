const { Router } = require('express');

const messagesRouter = Router();

const messagesController = require('../controllers/messagesController');
const { isAdmin, isAuthenticated } = require('../middleware/authMiddleware');

messagesRouter.get(
  '/new-message',
  isAuthenticated,
  messagesController.newMessageGet
);
messagesRouter.post('/new-message', messagesController.newMessagePost);

messagesRouter.post(
  '/:id/delete',
  isAdmin,
  messagesController.deleteMessagePost
);

module.exports = messagesRouter;
