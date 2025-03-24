function membershipGet(req, res) {
  res.render('membership-form');
}

function membershipPost(req, res) {
  const secretCode = req.body.secretCode;

  // Update user membership if valid secret code
  // req.user

  console.log(secretCode);
}

module.exports = { membershipGet, membershipPost };
