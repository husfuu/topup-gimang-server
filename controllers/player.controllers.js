const {
    Transactions,
    Nominals,
    Vouchers,
    BankAccounts,
    Categories,
    sequelize,
} = require("../models");

exports.getSpentTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.findAll({
            where: { userId: req.player.id },
            attributes: [
                [sequelize.fn("sum", sequelize.col("value")), "total"],
            ],
            group: ["categoryId"],
        });

        if (!transactions) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "Transactions is not found!",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                transactions,
                message: "Succesfully get total spent each category",
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

exports.getLatestTransactions = async (req, res) => {
    try {
        const { status = "" } = req.query;

        if (status !== "") {
            const transactions = await Transactions.findAll({
                where: { userId: req.player.id, status },
                include: [Nominals, Vouchers],
                order: [["createdAt", "DESC"]],
            });

            if (!transactions) {
                return res.status(401).json({
                    status: "FAILED",
                    data: {
                        message: "Transactions is not found!",
                    },
                });
            }

            res.status(201).json({
                status: "SUCCESS",
                data: {
                    transactions,
                    message: "Succesfully get all transaction by status",
                },
            });
        } else {
            const transactions = await Transactions.findAll({
                where: { userId: req.player.id },
                include: [Nominals, Vouchers],
                order: [["createdAt", "DESC"]],
            });

            if (!transactions) {
                return res.status(401).json({
                    status: "FAILED",
                    data: {
                        message: "Transactions is not found!",
                    },
                });
            }

            res.status(201).json({
                status: "SUCCESS",
                data: {
                    transactions,
                    message: "Succesfully get all transaction by status",
                },
            });
        }
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

exports.getTransactionDetails = async (req, res) => {
    try {
        const id = req.params.id;

        const transaction = await Transactions.findOne({
            where: { id },
            include: [Vouchers, Nominals, BankAccounts, Categories],
        });

        if (!transaction) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "Transactions is not found!",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                transaction,
                message: "Succesfully get all transaction by status",
            },
        });
    } catch (error) {}
};
