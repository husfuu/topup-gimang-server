const { Payments, BankAccounts } = require("../models");

exports.getAllPayments = async (req, res) => {
    try {
        const payments = await Payments.findAll();

        if (!payments) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "the category not found!",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get all payments",
                payments,
            },
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.getPaymentById = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payments.findByPk(paymentId);

        if (!payment) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `payment with id = ${paymentId} is not found!`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            payment,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
    }
};

exports.viewAllPayments = async (req, res) => {
    try {
        const payments = await Payments.findAll();
        res.render("admin/payment/view_payment", {
            title: "Payment Page",
            name: req.session.user.name,
            payments,
        });
    } catch (error) {
        res.redirect("/payments");
    }
};

exports.viewCreatePayments = async (req, res) => {
    try {
        res.render("admin/payment/add_payment", {
            title: "Add Payment",
            name: req.session.user.name,
        });
    } catch (error) {
        res.redirect("/payments/create");
    }
};

exports.viewEditPayments = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payments.findByPk(paymentId);

        res.render("admin/payment/edit_payment", {
            payment,
            title: "Edit Payment Method",
            name: req.session.user.name,
        });
    } catch (error) {
        res.redirect("/payments");
    }
};

exports.actionCreatePayments = async (req, res) => {
    try {
        const { type } = req.body;

        await Payments.create({
            type,
            status: "Y",
        });

        res.redirect("/payments");
    } catch (error) {}
};

exports.actionEditPayments = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const { type } = req.body;

        await Payments.update(
            {
                type,
            },
            {
                where: {
                    id: paymentId,
                },
            },
        );

        res.redirect("/payments");
    } catch (error) {}
};

exports.actionEditStatusPayments = async (req, res) => {
    try {
        const paymentId = req.params.id;
        const payment = await Payments.findOne({
            where: { id: paymentId },
        });
        let status = payment.status === "Y" ? "N" : "Y";

        await Payments.update(
            {
                status,
            },
            {
                where: { id: paymentId },
            },
        );

        req.flash("alertMessage", "Successfully edited Voucher");
        req.flash("alertStatus", "success");

        res.redirect("/payments");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/payments");
    }
};

exports.actionDeletePayments = async (req, res) => {
    try {
        const paymentId = req.params.id;

        await Payments.destroy({
            where: {
                id: paymentId,
            },
        });

        res.redirect("/payments");
    } catch (error) {}
};
