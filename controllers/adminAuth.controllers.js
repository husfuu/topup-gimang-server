const { Admins } = require("../models");
const bcrypt = require("bcryptjs");

exports.viewSignIn = async (req, res) => {
    try {
        const alertMessage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMessage, status: alertStatus };

        if (req.session.user === null || req.session.user === undefined) {
            res.render("admin/user/view_signin", {
                alert,
                title: "Signin Page",
            });
        } else {
            res.redirect("/");
        }
    } catch (error) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/signin");
    }
};

exports.actionSignIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log(email);
        console.log(password);
        const admin = await Admins.findOne({
            where: {
                email,
            },
        });
        if (admin) {
            const checkPassword = await bcrypt.compare(
                password,
                admin.password,
            );

            if (checkPassword) {
                console.log("password benar");
                req.session.user = {
                    id: admin.id,
                    name: admin.fullName,
                    email: admin.email,
                };
                res.redirect("/");
            } else {
                req.flash("alertMessage", "Your password is not correct");
                req.flash("alertStatus", "danger");
                res.redirect("/signin");
            }
        } else {
            req.flash("alertMessage", `Your account is not registered`);
            req.flash("alertStatus", "danger");
            res.redirect("/signin");
        }
    } catch (error) {
        req.flash("alertMessage", `${err.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/");
    }
};

exports.actionSignOut = async (req, res) => {
    req.session.destroy();
    res.redirect("/signin");
};
