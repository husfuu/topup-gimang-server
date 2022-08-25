const { Nominals } = require("../models");

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

exports.viewAllNominals = async (req, res) => {
    try {
        const nominals = await Nominals.findAll();

        const alertMesage = req.flash("alertMessage");
        const alertStatus = req.flash("alertStatus");

        const alert = { message: alertMesage, status: alertStatus };

        res.render("admin/nominal/view_nominal", {
            title: "Nominal Page",
            name: req.session.user.name,
            nominals,
            alert,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominals");
    }
};

exports.viewCreateNominals = async (req, res) => {
    try {
        res.render("admin/nominal/add_nominal", {
            title: "Add Nominal",
            name: req.session.user.name,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
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
            name: req.session.user.name,
        });
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
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

        req.flash("alertMessage", "Successfully added Nominal");
        req.flash("alertStatus", "success");

        res.redirect("/nominals");
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
        console.log(error.name);
        console.log(error.message);
        console.log(error.stack);
        res.send(error);
        // req.flash("alertMessage", `${error.message}`);
        // req.flash("alertStatus", "danger");
        // res.redirect("/nominals");
    }
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
        req.flash("alertMessage", "Successfully edited Nominal");
        req.flash("alertStatus", "success");

        res.redirect("/nominals");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/categories");
    }
};

exports.actionDeleteNominals = async (req, res) => {
    try {
        const nominalId = req.params.id;

        await Nominals.destroy({
            where: {
                id: nominalId,
            },
        });

        req.flash("alertMessage", "Successfully deleted Nominal");
        req.flash("alertStatus", "success");

        res.redirect("/nominals");
    } catch (error) {
        req.flash("alertMessage", `${error.message}`);
        req.flash("alertStatus", "danger");
        res.redirect("/nominals");
    }
};
