const db = require('../db/queries');

async function getMessages(req, res) {
  const messages = await db.getMessages();

  res.render('index', { messages });
}

module.exports = { getMessages };
