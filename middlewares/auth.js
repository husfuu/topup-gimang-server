const { Admins } = require("../models");

function isLoginAdmin(req, res, next) {
    if (req.session.user === null || req.session.user === undefined) {
        res.redirect("/signin");
    } else {
        next();
    }
}

module.exports = isLoginAdmin;
