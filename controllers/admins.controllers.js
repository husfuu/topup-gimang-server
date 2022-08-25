const { Admins } = require("../models");

exports.viewAllAdmins = async (req, res) => {
    try {
        const admins = await Admins.findAll();

        const alertMesage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");
        const alert = { message: alertMesage, status: alertStatus };

        res.render("admin/user/view_admin", {
            title: "Admin Page",
            name: req.session.user.name,
            admins,
            alert,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/admins");
    }
};
