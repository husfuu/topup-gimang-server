const { Roles } = require("../models");

exports.createRole = async (req, res) => {
    try {
        const { roleName } = req.body;

        if (!roleName) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `please fill the role name`,
                },
            });
        }

        const roleExist = await Roles.findOne({
            where: {
                roleName,
            },
        });

        if (roleExist) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "the role is already exist",
                },
            });
        }

        const role = await Roles.create({
            roleName,
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully created new role!`,
                role,
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

exports.getAllRoles = async (req, res) => {
    try {
        const roles = await Roles.findAll();

        if (!roles) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "the roles is not found",
                },
            });
        }

        return res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get all roles",
                roles,
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

exports.getRoleById = async (req, res) => {
    try {
        const id = req.params.id;

        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `role with id ${id} not found`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully get role with id ${id}`,
                role,
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

exports.updateRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `role with id ${id} not found`,
                },
            });
        }

        const { roleName } = req.body;

        await Roles.update(
            {
                roleName,
            },
            {
                where: {
                    id,
                },
            },
        );

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Succesfully update role with id ${id}`,
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

exports.deleteRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const role = await Roles.findByPk(id);

        if (!role) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `Role with id ${id} is not found`,
                },
            });
        }

        await Roles.destroy({
            where: {
                id,
            },
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully delete role with id ${id}`,
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
