const { getAuth } = require("firebase-admin/auth");
const admin = require("../config/firebase");

function getToken(authorizationHeader = "") {
    const splittedHeader = authorizationHeader.split("Bearer ");
    return splittedHeader[1];
}

async function authorize(req, res, next) {
    try {
        const token = getToken(req.headers.authorization);

        const { uid, email } = await admin.auth().verifyIdToken(token);

        req.user = { id: uid, email };

        next();
    } catch (err) {
        res.status(401).json({
            status: "FAIL",
            data: {
                name: "UnauthorizedError",
                message: err.message,
            },
        });
    }
}

module.exports = authorize;
