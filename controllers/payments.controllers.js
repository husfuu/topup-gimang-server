const { Payments } = require("../models");

exports.createPayment = async (req, res) => {
    try {
        const { bankAccountsId, type, status } = req.body;

        if (!bankAccountsId) {
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

        const newPayment = await Payments.create({
            bankAccountsId,
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

        const { bankAccountsId, type, status } = req.body;

        if (!bankAccountsId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the bankAccountsId",
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
                bankAccountsId,
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
