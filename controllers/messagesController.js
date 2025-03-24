const db = require('../db/queries');

function newMessageGet(req, res) {
  res.render('new-message-form');
}

async function newMessagePost(req, res) {
  const { title, text } = req.body;
  const message = { title, text };
  await db.addMessage(req.user.id, message);

  res.redirect('/');
}

module.exports = { newMessageGet, newMessagePost };
