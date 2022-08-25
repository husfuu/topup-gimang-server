const { BankAccounts, Admins } = require("../models");

exports.getAllBankAccounts = async (req, res) => {
    try {
        const bankAccounts = await BankAccounts.findAll({
            include: [Admins, "payment"],
        });

        if (!bankAccounts) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "The bank accounts not found",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            messsage: "Successfully get all nominals",
            data: {
                bankAccounts,
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

exports.getBankAccountById = async (req, res) => {
    try {
        const bankAccountId = req.params.id;

        const bankAccount = await BankAccounts.findOne({
            where: { id: bankAccountId },
            include: [Admins, "payment"],
        });

        if (!bankAccount) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `bank account with id = ${bankAccountId} not found`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            message: "Successfully get bank account!",
            data: {
                bankAccount,
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

exports.viewAllBankAccounts = async (req, res) => {
    try {
        const bankAccounts = await BankAccounts.findAll({
            include: Admins,
        });

        const alertMesage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMesage, status: alertStatus };

        res.render("admin/bankAccount/view_bankAccount", {
            title: "Bank Account Page",
            name: req.session.user.name,
            bankAccounts,
            alert,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/bankaccounts");
    }
};

exports.viewCreateBankAccount = async (req, res) => {
    try {
        res.render("admin/bankAccount/add_bankAccount", {
            title: "Add Bank Account",
            name: req.session.user.name,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/bankaccounts");
    }
};

exports.viewEditBankAccount = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const bankAccount = await BankAccounts.findOne({
            where: { id: bankAccountId },
            include: Admins,
        });

        res.render("admin/bankAccount/edit_bankAccount", {
            title: "Edit Bank Account",
            name: req.session.user.name,
            bankAccount,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/bankaccounts");
    }
};

exports.actionCreateBankAccount = async (req, res) => {};

exports.actionEditBankAccount = async (req, res) => {};

exports.actionDeleteBankAccount = async (req, res) => {
    try {
        const bankAccountId = req.params.id;

        await BankAccounts.destroy({
            where: {
                id: bankAccountId,
            },
        });

        req.flash("alertMessage", "Successfully deleted Nominal");
        req.flash("alertStatus", "success");

        res.redirect("/bankaccounts");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/bankaccounts");
    }
};
