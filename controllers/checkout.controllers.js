const { Transaction } = require("../models");
const {
    Vouchers,
    Nominals,
    Categories,
    BankAccounts,
    Admins,
} = require("../models");

exports.viewCheckOut = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const voucher = await Vouchers.findOne({
            where: { id: voucherId },
            include: [Categories, Nominals],
        });

        if (!voucher)
            return res.status(401).json({
                message: `voucher with id = ${voucherId} doesnt exists`,
            });

        const bankAccount = await BankAccounts.findAll({
            include: Admins,
        });

        if (!bankAccount)
            return res.status(401).json({
                message: `voucher with id = ${voucherId} doesnt exists`,
            });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                bankAccount,
                voucher,
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

exports.actionCheckOut = async (req, res) => {
    try {
        const {
            userId,
            verifyId,
            bankAccountId,
            voucherId,
            nominalId,
            categoryId,
            value,
        } = req.body;

        if (!userId)
            return res.status(401).json({
                message: `user with id = ${userId} is doesn't exists`,
            });
        if (!bankAccountId)
            return res.status(401).json({
                message: `bankAccount with id = ${bankAccountId} is doesn't exists`,
            });
        if (!verifyId)
            return res.status(401).json({
                message: `please fill the verifyId`,
            });
        if (!nominalId)
            return res.status(401).json({
                message: `nominal with id = ${nominalId} is doesn't exists`,
            });
        if (!voucherId)
            return res.status(401).json({
                message: `voucher with id = ${voucherId} is doesn't exists`,
            });
        if (!categoryId)
            return res.status(401).json({
                message: `category with id = ${categoryId} is doesn't exists`,
            });

        const bankAccount = await BankAccounts.findOne({
            where: { id: bankAccountId },
        });
        if (!bankAccount)
            return res.status(401).json({
                message: `bankAccount with id = ${bankAccountId} is doesn't exists`,
            });
        const nominal = await Nominals.findOne({
            where: { id: nominalId },
        });
        if (!nominal)
            return res.status(401).json({
                message: `nominal with id = ${nominalId} is doesn't exists`,
            });
        const voucher = await Vouchers.findOne({
            where: { id: voucherId },
        });
        if (!voucher)
            return res.status(401).json({
                message: `voucher with id = ${voucherId} is doesn't exists`,
            });

        const tax = "10%";
        const status = "pending";

        const newTransaction = await Transaction.create({
            userId,
            bankAccountId,
            voucherId,
            nominalId,
            categoryId,
            tax,
            value,
            status,
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "New transaction successfully created",
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
