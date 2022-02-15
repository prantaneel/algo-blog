function checkAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect("/admin-login");
};

function checkNotAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
      return res.redirect("/admin-approve");
    }
    return next();
};

function checkOwner(req, res, next) {
    if (req.isAuthenticated()) {
      if (req.user.role === "_owner") {
        return next();
      }
    }
    res.redirect("/admin-login");
};

module.exports={
    checkAuthenticated,
    checkNotAuthenticated,
    checkOwner,
};