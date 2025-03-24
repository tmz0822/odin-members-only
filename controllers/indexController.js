const db = require('../db/queries');

async function getMessages(req, res) {
  const messages = await db.getMessages();

  console.log(messages);

  res.render('index', { messages });
}

module.exports = { getMessages };
