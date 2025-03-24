function isAuthenticated(req, res, next) {
  if (!req.isAuthenticated()) {
    return res.status(401).send('You are not authorized to view this resource');
  }

  next();
}

function isMember(req, res, next) {
  if (!req.isAuthenticated() && !req.user.is_member) {
    return res.status(401).send('You are not an member');
  }

  next();
}

function isAdmin(req, res, next) {
  if (!req.isAuthenticated() && !req.user.is_admin) {
    return res.status(401).send('You are not an admin');
  }

  next();
}

function redirectToHomepageIfAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/');
  }

  next();
}

module.exports = {
  isAuthenticated,
  isMember,
  isAdmin,
  redirectToHomepageIfAuthenticated,
};
