const { Users, Userbiodatas } = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const { JWT_KEY } = process.env;

exports.signUp = async (req, res, next) => {
    try {
        const { email, password, fullName, phoneNumber } = req.body;

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

        if (!fullName) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "please fill fullName",
                },
            });
        }

        const playerExist = await Users.findOne({
            where: {
                email,
            },
        });

        if (playerExist) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "The account is already registered!",
                },
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hashedPassword = bcrypt.hashSync(password, salt);

        const player = await Users.create({
            email,
            password: hashedPassword,
        });

        const playerBiodata = await Userbiodatas.create({
            userId: player.id,
            fullName,
            phoneNumber,
        });

        res.status(201).json({
            status: "SUCCESS",
            message: "new player successfully created",
            data: {
                player,
                playerBiodata,
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
        next(error);
    }
};

exports.signIn = async (req, res, next) => {
    const { email, password } = req.body;

    try {
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

        const player = await Users.findOne({
            where: { email },
        });

        if (player) {
            const playerBiodata = await Userbiodatas.findOne({
                where: { userId: player.id },
            });

            const checkPassword = bcrypt.compareSync(password, player.password);
            if (checkPassword) {
                const token = jwt.sign(
                    {
                        player: {
                            id: player.id,
                            email: player.email,
                            name: playerBiodata.fullName,
                            username: playerBiodata.username,
                            avatar: playerBiodata.avatar,
                        },
                    },
                    JWT_KEY,
                );
                res.status(200).json({
                    status: "SUCCESS",
                    data: {
                        message: "your account is successfully logged in",
                        token,
                    },
                });
            } else {
                res.status(403).json({
                    status: "FAILED",
                    data: {
                        message: "your password is false",
                    },
                });
            }
        } else {
            res.status(403).json({
                status: "FAILED",
                data: {
                    message: "your email is not registered",
                },
            });
        }
    } catch (error) {
        res.status(500).json({
            status: "FAILED",
            data: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
        });
        next(error);
    }
};
