function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.status(401).send('You are not authorized to view this resource');
  }
}

function isMember(req, res, next) {
  if (req.isAuthenticated() && req.user.is_member) {
    next();
  } else {
    return res.status(401).send('You are not an member');
  }
}

function isAdmin(req, res, next) {
  if (req.isAuthenticated() && req.user.is_admin) {
    next();
  } else {
    return res.status(401).send('You are not an admin');
  }
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
