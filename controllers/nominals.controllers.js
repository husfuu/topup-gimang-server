const { Nominals } = require("../models");

exports.createNominal = async (req, res) => {
    try {
        const { coinName, coinQuantity, price } = req.body;

        if (!coinName) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the coin name",
                },
            });
        }

        if (!coinQuantity) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the coin quantity",
                },
            });
        }

        if (!price) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the price",
                },
            });
        }

        const nominalExist = await Nominals.findOne({
            where: {
                coinName,
                coinQuantity,
            },
        });

        if (nominalExist) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "the nominal is already exist",
                },
            });
        }

        const nominal = await Nominals.create({
            coinName,
            coinQuantity,
            price,
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully created nominal`,
                nominal,
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

exports.getAllNominal = async (req, res) => {
    try {
        const nominals = await Nominals.findAll();

        if (!nominals) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "the nominals is not found",
                },
            });
        }

        return res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get all nominals",
                nominals,
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

exports.getNominalById = async (req, res) => {
    try {
        const id = req.params.id;

        const nominal = await Nominals.findByPk(id);

        if (!nominal) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `nominal with id ${id} not found`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Succesfully get nominal with id ${id}`,
                nominal,
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

exports.updateNominalById = async (req, res) => {
    try {
        const nominalId = req.params.id;
        const nominal = await Nominals.findByPk(nominalId);

        if (!nominal) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `nominal with ${id} is not found`,
                },
            });
        }

        const { coinName, coinQuantity } = req.body;

        await Nominals.update(
            {
                coinName,
                coinQuantity,
            },
            {
                where: {
                    id: nominalId,
                },
            },
        );

        res.status(201).json({
            data: {
                message: `Succesfully update nominal with id ${nominalId}`,
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

exports.deleteNominalById = async (req, res) => {
    try {
        const nominalId = req.params.id;
        const nominal = await Nominals.findByPk(nominalId);

        if (!nominal) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `Nominal with id ${nominalId} is not found`,
                },
            });
        }

        await Nominals.destroy({
            where: {
                id: nominalId,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully delete nominal with id ${nominalId}`,
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

// ==================================

exports.viewAllNominals = async (req, res) => {
    try {
        const nominals = await Nominals.findAll();

        res.render("admin/nominal/view_nominal", {
            title: "Nominal Page",
            nominals,
        });
    } catch (error) {
        res.redirect("/nominals");
    }
};

exports.viewCreateNominals = async (req, res) => {
    try {
        res.render("admin/nominal/add_nominal", {
            title: "Add Nominal",
        });
    } catch (error) {
        res.redirect("/nominals");
    }
};

exports.viewEditNominals = async (req, res) => {
    try {
        const nominalId = req.params.id;
        const nominal = await Nominals.findByPk(nominalId);

        res.render("admin/nominal/edit_nominal", {
            nominal,
            title: "Edit Nominal",
        });
    } catch (error) {
        res.redirect("/nominals");
    }
};

exports.actionCreateNominals = async (req, res) => {
    try {
        const { coinName, coinQuantity, price } = req.body;
        console.log(coinName, coinQuantity, price);
        const nominal = await Nominals.create({
            coinName,
            coinQuantity,
            price,
        });

        res.redirect("/nominals");
    } catch (error) {}
};

exports.actionEditNominals = async (req, res) => {
    try {
        const nominalId = req.params.id;
        const { coinName, coinQuantity, price } = req.body;

        await Nominals.update(
            {
                coinName,
                coinQuantity,
                price,
            },
            {
                where: {
                    id: nominalId,
                },
            },
        );

        res.redirect("/nominals");
    } catch (error) {}
};

exports.actionDeleteNominals = async (req, res) => {
    try {
        const nominalId = req.params.id;

        await Nominals.destroy({
            where: {
                id: nominalId,
            },
        });
        res.redirect("/nominals");
    } catch (error) {}
};
