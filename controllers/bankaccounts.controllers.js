const { BankAccounts, Admins } = require("../models");

exports.createBankAccount = async (req, res) => {
    try {
        const { name, accountNumber, adminId, paymentId } = req.body;

        if (!name) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill bank name",
                },
            });
        }

        if (!accountNumber) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill account number",
                },
            });
        }

        if (!adminId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the adminId",
                },
            });
        }

        if (!paymentId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the paymentId",
                },
            });
        }

        const bankAccountExists = await BankAccounts.findOne({
            where: {
                name,
                accountNumber,
            },
        });

        if (bankAccountExists) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "bank account is already exists!",
                },
            });
        }

        const bankAccount = await BankAccounts.create({
            name,
            accountNumber,
            adminId,
            paymentId,
        });

        res.status(201).json({
            status: "SUCCESS",
            message: "New Bank Account successfully created!",
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

exports.updateBankAccountById = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const bankAccount = await BankAccounts.findByPk(bankAccountId);

        if (!bankAccount) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "bank account doesnt exist",
                },
            });
        }

        const { name, accountNumber } = req.body;

        if (!name) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill bank name",
                },
            });
        }

        if (!accountNumber) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill account number",
                },
            });
        }

        await BankAccounts.update(
            {
                name,
                accountNumber,
            },
            {
                where: {
                    id: bankAccountId,
                },
            },
        );

        res.status(201).json({
            status: "SUCCESS",
            message: `Successfully update bank account with ${bankAccountId}`,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: err.name,
                message: err.message,
                stack: err.stack,
            },
        });
    }
};

exports.deleteBankAccountById = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const bankAccount = await BankAccounts.findByPk(bankAccountId);

        if (!bankAccount) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "bank account doesnt exist!",
                },
            });
        }

        const deletedBankAccount = await BankAccounts.destroy({
            where: {
                id: bankAccountId,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            message: `Successfully delete bank account ${bankAccountId}`,
        });
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: err.name,
                message: err.message,
                stack: err.stack,
            },
        });
    }
};

// halama menampilkan semua bank account
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
            bankAccounts,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");

        res.redirect("/bankaccounts");
    }
};
// halaman form menambahkan bank account
exports.viewCreateBankAccount = async (req, res) => {
    try {
        res.render("admin/bankAccount/add_bankAccount", {
            title: "Add Bank Account",
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/bankaccounts");
    }
};
// halaman form mengedit bank account -- dengan nilai-nilaninya sudah ada di input box
exports.viewEditBankAccount = async (req, res) => {
    try {
        const bankAccountId = req.params.id;
        const bankAccount = await BankAccounts.findOne({
            where: { id: bankAccountId },
            include: Admins,
        });

        res.render("admin/bankAccount/edit_bankAccount", {
            title: "Edit Bank Account",
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
