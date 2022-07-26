// const Userbiodatas = require('../models/userbiodatas');
const { Userbiodatas } = require("../models");

exports.createUserbiodata = async (req, res) => {
    try {
        const {
            userId, // sementara
            username,
            fullName,
            phoneNumber,
            gender,
            address,
            avatar,
        } = req.body;

        if (!username) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the username",
                },
            });
        }

        if (!phoneNumber) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill the phone number",
                },
            });
        }

        const userbiodataExists = await Userbiodatas.findOne({
            where: {
                userId,
                username,
                phoneNumber,
            },
        });

        if (userbiodataExists) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "userbiodata is already exists",
                },
            });
        }

        const userbiodata = await Userbiodatas.create({
            userId,
            username,
            fullName,
            phoneNumber,
            gender,
            address,
            avatar,
        });

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Userbiodata successfully created",
                userbiodata,
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

exports.getUserbiodataByUserId = async (req, res) => {
    try {
        const userId = req.user?.id;

        const userbiodata = await Userbiodatas.findOne({
            where: {
                userId,
            },
        });

        if (!userbiodata) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: `userbiodata with ${userId} is not exists`,
                },
            });
        }

        res.status(201).json({
            status: "SUCCESS",
            data: {
                message: `Successfully get userbiodata with ${userId}`,
                userbiodata,
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

exports.getAllUserbiodatas = async (req, res) => {
    try {
        const userbiodatas = await Userbiodatas.findAll();

        if (!userbiodatas) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "userbiodatas is not found",
                },
            });
        }

        return res.status(201).json({
            status: "SUCCESS",
            data: {
                message: "Successfully get all userbiodatas",
                userbiodatas,
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

exports.updateUserbiodataByUserId = async (req, res) => {
    try {
        const userId = req.user?.id;

        const { username, fullName, phoneNumber, gender, address, avatar } =
            req.body;

        // update userbiodata
        const userbiodata = await Userbiodatas.update(
            {
                username,
                fullName,
                phoneNumber,
                gender,
                address,
                avatar,
            },
            {
                where: {
                    userId,
                },
            },
        );

        res.status(201).json({
            status: "SUCCESS",
            message: `userbiodata with ${userId} successfully updated`,
            userbiodata,
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
