const db = require('../db/queries');

function newMessageGet(req, res) {
  console.log('run');
  res.render('new-message-form');
}

async function newMessagePost(req, res) {
  console.log('new message post');
  const { title, text } = req.body;
  const message = { title, text };
  await db.addMessage(req.user.id, message);

  res.redirect('/');
}

module.exports = { newMessageGet, newMessagePost };
