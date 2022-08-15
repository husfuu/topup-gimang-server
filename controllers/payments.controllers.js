const { Payments, BankAccounts } = require("../models");

exports.createPayment = async (req, res) => {
    try {
        const { type, status } = req.body;

        // if (!bankAccountId) {
        //     return res.status(401).json({
        //         status: "FAILED",
        //         data: {
        //             message: "please fill the bankAccountId",
        //         },
        //     });
        // }

        if (!type) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the type",
                },
            });
        }

        if (!status) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the status",
                },
            });
        }

        const newPayment = await Payments.create({
            type,
            status,
        });

        if (!newPayment) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "payment fail to created",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "New Payment succesfully created!",
                newPayment,
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

exports.updatePaymentById = async (req, res) => {
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

        const { bankAccountId, type, status } = req.body;

        if (!bankAccountId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the bankAccountId",
                },
            });
        }

        if (!type) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the type",
                },
            });
        }

        if (!status) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the status",
                },
            });
        }

        await Payments.update(
            {
                bankAccountId,
                type,
                status,
            },
            {
                where: {
                    id: paymentId,
                },
            },
        );

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully update Payment with id = ${paymentId}`,
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

exports.deletePaymentById = async (req, res) => {
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

        await Payments.destroy({
            where: {
                id: paymentId,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully delete payment with id = ${paymentId}`,
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

// =================================================================================
exports.viewAllPayments = async (req, res) => {
    try {
        const payments = await Payments.findAll();
        res.render("admin/payment/view_payment", {
            title: "Payment Page",
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
