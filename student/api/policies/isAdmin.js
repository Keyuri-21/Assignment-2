module.exports = function(req, res, next) {
    if (req.session && req.session.isAdmin) {
      return next();
    } else {
      return res.status(403).send('Unauthorized');
    }
  };
  