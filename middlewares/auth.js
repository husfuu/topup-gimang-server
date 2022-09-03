const jwt = require("jsonwebtoken");
const { JWT_KEY } = process.env;
const { Users } = require("../models");
const dotenv = require("dotenv");
dotenv.config();

function isLoginAdmin(req, res, next) {
    if (req.session.user === null || req.session.user === undefined) {
        res.redirect("/signin");
    } else {
        next();
    }
}

async function isLoginPlayer(req, res, next) {
    try {
        const token = req.headers.authorization
            ? req.headers.authorization.replace("Bearer ", "")
            : null;
        const data = jwt.verify(token, JWT_KEY);

        const player = await Users.findOne({
            where: {
                id: data.player.id,
            },
        });

        if (!player) {
            return res.status(401).json({
                status: "FAILED",
                data: {
                    message: "player doesn't exists",
                },
            });
        }

        req.player = { id: player.id };

        next();
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
}

module.exports = { isLoginAdmin, isLoginPlayer };
