const { Transactions, Vouchers, Nominals, BankAccounts } = require("../models");

exports.createTransactionByUser = async (req, res) => {
    try {
        const { userId, bankAccountId, voucherId, nominalId } = req.body;

        if (!bankAccountId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the bankAccount id",
                },
            });
        }

        if (!voucherId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the voucher id",
                },
            });
        }

        // perhitungan value berdasarkan voucher yang dibeli
        // status -> pending
        // tax nilai default ajah

        const tax = 1;
        const value = 1;
        const status = "pending";

        const newTransaction = await Transactions.create({
            userId,
            bankAccountId,
            voucherId,
            nominalId,
            tax,
            value,
            status,
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "New Transaction successfully created!",
                newTransaction,
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

// oleh admin
exports.updateTransactionStatusByAdmin = async (req, res) => {
    try {
        const transactionId = req.params.id;
        const { status } = req.query;

        await Transactions.update(
            {
                status: status,
            },
            {
                where: {
                    id: transactionId,
                },
            },
        );

        req.flash("alertMessage", "Successfully edited Nominal");
        req.flash("alertStatus", "success");

        res.redirect("/transactions");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/transactions");
    }
};

// oleh user
exports.cancelTransactionByUser = async (req, res) => {};

// oleh user dan admin
exports.getAllTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.findAll({
            include: [Vouchers, Nominals, BankAccounts],
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                transactions,
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

exports.viewAllTransactions = async (req, res) => {
    try {
        const transactions = await Transactions.findAll({
            include: [Vouchers, Nominals, BankAccounts],
        });

        const alertMesage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMesage, status: alertStatus };

        res.render("admin/transactions/view_transaction", {
            title: "Transaction Page",
            transactions,
            alert,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/transactions");
    }
};

exports.viewTotalSpentByCategory = async (req, res) => {
    try {
        // const
    } catch (error) {}
};

// oleh user dan admin
exports.getTransactionById = async (req, res) => {};
