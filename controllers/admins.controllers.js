const { Admins } = require("../models");

exports.createAdmin = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        console.log("kenaa");
        if (!fullName) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill email",
                },
            });
        }

        if (!email) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill email",
                },
            });
        }

        if (!password) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill password",
                },
            });
        }

        const adminExists = await Admins.findOne({
            where: {
                email,
            },
        });

        if (adminExists) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "The account is already registered!",
                },
            });
        }

        const admin = await Admins.create({
            fullName,
            email,
            password,
        });

        res.status(201).json({
            status: "SUCCESS",
            message: "new admin successfully added",
            data: {
                admin,
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

exports.deleteAdminById = async (req, res) => {
    try {
        const adminId = req.params.id;
        const admin = await Admins.findByPk(adminId);

        if (!admin) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "admin doesnt exist",
                },
            });
        }

        await Admins.destroy({
            where: {
                id: adminId,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            message: `Successfully delete bank account ${adminId}`,
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

exports.getAllAdmins = async (req, res) => {};
