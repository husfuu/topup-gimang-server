const {
    Vouchers,
    Categories,
    Nominals,
    NominalVouchers,
    sequelize,
    Sequelize,
} = require("../models");

const Op = Sequelize.Op;

exports.createVoucher = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const { userId, name, categoryId, nominalIds, status, thumbnail } =
            req.body;

        if (!name) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the name",
                },
            });
        }

        if (!categoryId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the categoryId",
                },
            });
        }

        if (!nominalIds) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the nominalIds",
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

        if (!thumbnail) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the thumbnail",
                },
            });
        }

        // validate (find) the category that given by user based on categoryId in
        // Categories Table
        const selectedCategoryId = await Categories.findByPk(categoryId);

        if (!selectedCategoryId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `category with id = ${categoryId} is not found!`,
                },
            });
        }

        // find all nominals based on nominalIds in Nominals Table
        const selectedNominals = await Nominals.findAll(
            {
                where: {
                    id: {
                        [Op.in]: nominalIds,
                    },
                },
            },
            { transaction: t },
        );

        const newVoucher = await Vouchers.create({
            name,
            categoryId,
            userId,
            status,
            thumbnail,
        });

        if (!newVoucher) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "Voucher failed to created!",
                    newVoucher,
                },
            });
        }

        await newVoucher.addNominals(selectedNominals, {
            transaction: t,
            through: {
                voucherId: newVoucher.id,
            },
        });

        await t.commit();

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "New Voucher successfully created!",
            },
        });
    } catch (error) {
        await t.rollback();
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

exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Vouchers.findAll({
            include: Nominals,
        });

        if (!vouchers) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "Vouchers is not found!",
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get all vouchers",
                vouchers,
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

exports.getVoucherById = async (req, res) => {
    try {
        const voucherId = req.params.id;

        const voucher = await Vouchers.findOne({
            where: { id: voucherId },
            include: Nominals,
        });
        // const voucher = await Vouchers.findByPk(voucherId);

        if (!voucher) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `voucher with ${voucherId} is not found!`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Succesfully get voucher with id = ${voucherId}!`,
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

exports.updateVoucherById = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const voucherId = req.params.id;
        const voucher = await Vouchers.findByPk(voucherId);

        const { userId, name, categoryId, nominalIds, status, thumbnail } =
            req.body;

        if (!voucher) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `voucher with id = ${voucherId}! is not found!`,
                },
            });
        }

        if (!name) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the name",
                },
            });
        }

        if (!categoryId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the categoryId",
                },
            });
        }

        if (!nominalIds) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the nominalIds",
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

        if (!thumbnail) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the thumbnail",
                },
            });
        }

        const selectedCategoryId = await Categories.findByPk(categoryId);

        if (!selectedCategoryId) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `category with id = ${categoryId} is not found!`,
                },
            });
        }

        const selectedNominals = await Nominals.findAll(
            {
                where: {
                    id: {
                        [Op.in]: nominalIds,
                    },
                },
            },
            { transaction: t },
        );

        const updatedVoucher = await Vouchers.update(
            {
                name,
                categoryId,
                nominalIds,
                status,
                thumbnail,
            },
            {
                where: { id: voucherId },
            },
        );

        const updatedVoucher2 = Vouchers.findByPk(voucherId);

        console.log(updatedVoucher);

        await updatedVoucher2.setNominal(nominalIds);

        // await updatedVoucher.updateNominals(
        //     selectedNominals,
        //     {
        //         transaction: t,
        //         through: {
        //             voucherId: updatedVoucher.id
        //         }
        //     }
        // );

        await t.commit();

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "New Voucher successfully created!",
            },
        });
    } catch (error) {
        await t.rollback();
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

exports.deleteVoucherById = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const voucher = await Vouchers.findByPk(voucherId);

        if (!voucher) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `voucher with id = ${voucherId} is not found`,
                },
            });
        }

        // const nominalIds = await NominalVouchers.findAll({
        //     where: { voucherId: voucherId },
        //     attributes: ['nominalId']
        // })

        await NominalVouchers.destroy({
            where: {
                voucherId,
            },
        });

        await Vouchers.destroy({
            where: {
                id: voucherId,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Succesfully delete Voucher with id = ${voucherId}`,
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
