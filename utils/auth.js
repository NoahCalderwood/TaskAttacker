const withAuth = (req, res, next) => {
  // Middleware which redirect the user to login if they are not logged in otherwise do the next thing.
  if (!req.session.logged_in) {
    res.redirect('/login');
  } else {
    next();
  }
};

module.exports = withAuth;
