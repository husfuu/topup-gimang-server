const router = require("express").Router();
const adminControllers = require("../controllers/admins.controllers");
const { isLoginAdmin } = require("../middlewares/auth");

router.get("/admins", isLoginAdmin, adminControllers.viewAllAdmins);

module.exports = router;
