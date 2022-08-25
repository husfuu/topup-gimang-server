const {
    Vouchers,
    Categories,
    Nominals,
    NominalVouchers,
    sequelize,
    Sequelize,
} = require("../models");

const path = require("path");
const fs = require("fs");
const config = require("../config");

const Op = Sequelize.Op;

exports.getAllVouchers = async (req, res) => {
    try {
        const vouchers = await Vouchers.findAll({
            include: [Categories, Nominals],
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
            include: [Categories, Nominals],
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

exports.viewAllVouchers = async (req, res) => {
    try {
        const vouchers = await Vouchers.findAll({
            include: [Categories, Nominals],
        });

        const alertMesage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMesage, status: alertStatus };

        res.render("admin/voucher/view_voucher", {
            title: "Voucher Page",
            name: req.session.user.name,
            vouchers,
            alert,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouchers");
    }
};

exports.viewCreateVouchers = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        const nominals = await Nominals.findAll();

        res.render("admin/voucher/add_voucher", {
            title: "Add Voucher",
            name: req.session.user.name,
            categories,
            nominals,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouchers");
    }
};

exports.viewEditVouchers = async (req, res) => {
    try {
        const categories = await Categories.findAll();
        const nominals = await Nominals.findAll();
        const voucherId = req.params.id;

        const voucher = await Vouchers.findOne({
            where: { id: voucherId },
            include: Nominals,
        });

        res.render("admin/voucher/edit_voucher", {
            title: "Edit Voucher",
            name: req.session.user.name,
            voucher,
            categories,
            nominals,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouhcers");
    }
};

exports.actionCreateVouchers = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let { name, categoryId, nominalIds } = req.body;
        // find all nominals based on nominalIds in Nominals Table
        const lengthNominalIds = nominalIds.length;

        if (lengthNominalIds == 1) {
            nominalIds = Array.from(String(nominalIds), Number);
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

        if (req.file) {
            let tmp_path = req.file.path;
            let originaExt =
                req.file.originalname.split(".")[
                    req.file.originalname.split(".").length - 1
                ];
            let filename = req.file.filename + "." + originaExt;
            let target_path = path.resolve(
                config.rootPath,
                `public/uploads/${filename}`,
            );

            const src = fs.createReadStream(tmp_path);
            const dest = fs.createWriteStream(target_path);

            src.pipe(dest);

            src.on("end", async () => {
                try {
                    const newVoucher = await Vouchers.create({
                        name,
                        categoryId,
                        status: "Y",
                        thumbnail: filename,
                    });

                    await newVoucher.addNominals(selectedNominals, {
                        transaction: t,
                        through: {
                            voucherId: newVoucher.id,
                        },
                    });

                    await t.commit();
                    res.redirect("/vouchers");
                    req.flash("alertMessage", "Successfully added Voucher");
                    req.flash("alertStatus", "success");
                } catch (error) {
                    req.flash("alertMessage", `${error.message}`);
                    req.flash("alertStatus", "danger");
                    res.redirect("/vouchers");
                }
            });
        } else {
            const newVoucher = await Vouchers.create({
                name,
                categoryId,
                status: "Y",
            });

            await newVoucher.addNominals(selectedNominals, {
                transaction: t,
                through: {
                    voucherId: newVoucher.id,
                },
            });

            await t.commit();

            res.redirect("/vouchers");
            req.flash("alertMessage", "Successfully added Voucher");
            req.flash("alertStatus", "success");
        }
    } catch (error) {
        console.log(error);
        res.send(error);
        await t.rollback();

        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouchers");
    }
};

exports.actionEditVouchers = async (req, res) => {
    const t = await sequelize.transaction();

    try {
        const voucherId = req.params.id;

        const { name, categoryId, nominalIds, status, thumbnail } = req.body;
        // console.log(name, nominalIds, status, thumbnail);
        // console.log(`ini category ${categoryId}`);
        const selectedCategoryId = await Categories.findByPk(categoryId);

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

        const updatedVoucher2 = await Vouchers.findByPk(voucherId);

        await updatedVoucher2.setNominal(nominalIds);

        await t.commit();

        req.flash("alertMessage", "Successfully edited Voucher");
        req.flash("alertStatus", "success");

        res.redirect("/vouchers");
    } catch (error) {
        await t.rollback();
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouchers");
    }
};

exports.actionEditStatusVouchers = async (req, res) => {
    try {
        const voucherId = req.params.id;
        const voucher = await Vouchers.findOne({
            where: { id: voucherId },
        });
        let status = voucher.status === "Y" ? "N" : "Y";

        await Vouchers.update(
            {
                status,
            },
            {
                where: { id: voucherId },
            },
        );
        req.flash("alertMessage", "Successfully edited Voucher");
        req.flash("alertStatus", "success");

        res.redirect("/vouchers");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouchers");
    }
};

exports.actionDeleteVouchers = async (req, res) => {
    try {
        const voucherId = req.params.id;

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

        req.flash("alertMessage", "Successfully deleted Voucher");
        req.flash("alertStatus", "success");

        res.redirect("/vouchers");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/vouchers");
    }
};
