const db = require('../db/queries');

function membershipGet(req, res) {
  res.render('membership-form');
}

async function membershipPost(req, res) {
  const secretCode = req.body.secretCode;

  if (secretCode === 'secret') {
    await db.updateUserMembership(req.user.id);
    res.redirect('/');
  } else {
    res.render('membership-form', { error: 'Invalid code' });
  }
}

module.exports = { membershipGet, membershipPost };
